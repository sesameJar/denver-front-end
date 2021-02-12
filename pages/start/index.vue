<template>
  <v-row class="pa-16">
    <v-col cols="12" sm="6">
      <v-row>
        <v-col cols="12" sm=12 v-if="!isUploadedVideo" class="ChallengeCreation-video-upload-container">
          <div>
            <v-file-input
              v-model="videoFile"
              accept="video/*"
              placeholder="Select A Video"
              prepend-icon="mdi-video"
            />
          </div>
        </v-col>
        <v-col v-else class="pa-4" style="border:1px dashed #999">
          <VideoPlayer
            :key="video"
            style="max-width:450px;max-height:450px;margin:0 auto"
            :video-data="video"
          />
        </v-col>
      </v-row>
    </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="ChallengeCreation-center-row-items"
          >
            <v-text-field
              v-model="challengeName"
              label="Challenge"
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >

            <!-- TODO: fix this dropdown -->
            <v-select
              v-model="selectedCharity"
              :hint="`${selectedCharity.charity}, ${selectedCharity.address}`"
              :items="charityList"
              item-text="charity"
              item-value="address"
              label="selectedCharity"
              persistent-hint
              return-object
              single-line
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="minEntryFeeInput"
              label="In ETH"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12">

            <v-textarea
              v-model="challengeDescription"
              name="challenge-description"
              label="Video Description"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="newInvitedAddress"
              label="Invite Others"
              append-icon="mdi-plus"
              @click:append="addInvitedAddress"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12" class="invitees" v-if="invitedAddresses.length">
            <v-chip
              pill
              v-for="address in invitedAddresses"
              :key="address"
              class="address_chip px-4"
            >
              <v-avatar left>
                <v-img
                  :src="`https://avatars.onflow.org/avatar/${address
                                .toString()
                                .toLowerCase()}.svg`">
                </v-img>
              </v-avatar>
              {{toShortAddress(address)}}
            </v-chip>
          </v-col>
          <v-col cols="12" sm="12" >
            <h4>Challenge End Date</h4>
          </v-col>
          <v-col cols="12" sm="12">
            <v-date-picker
              v-model="endDate"
              no-title
              elevation="15"
            />
          </v-col>

          <v-col cols="12" sm="12">
            <v-btn @click="pushToIpfs">
              Submit Challenge
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import VideoPlayer from '@/components/VideoPlayer'
import ipfsClient from 'ipfs-http-client'
import { CHARITY_LIST } from '@/utils/constants'
import { ethers } from 'ethers'

export default {
  name: 'Start',
  components: {
    VideoPlayer

  },
  data () {
    return {
      endDate: null,
      challengeName: '',
      challengeDescription: '',
      minEntryFeeInput: 0.1,
      isUploadedVideo: false,
      videoFile: null,
      video: null,
      selectedCharity: CHARITY_LIST[0],
      invitedAddresses: [],
      newInvitedAddress: null
    }
  },
  computed: {
    minEntryFee () {
      return parseFloat(this.minEntryFeeInput).toFixed(3)
    },
    isValidAddress () {
      if (!this.newInvitedAddress) {
        return false
      }
      try {
        ethers.utils.getAddress(this.newInvitedAddress)
        return true
      } catch (e) {
        return false
      }
    }
  },
  watch: {
    videoFile () {
      this.video = URL.createObjectURL(this.videoFile)
      this.isUploadedVideo = true
    }
  },
  created () {
    this.charityList = CHARITY_LIST
    console.log(this.charityList)
  },
  methods: {
    ...mapActions('web3', ['startChallenge']),
    async pushToIpfs () {
      const INFURA_DOMAIN = 'ipfs.infura.io'
      const INFURA_PORT = '5001'
      const infuraIpfsClient = ipfsClient({ host: INFURA_DOMAIN, port: INFURA_PORT, protocol: 'https' })
      try {
        const video = {
          content: this.videoFile,
          pin: true
        }
        const uploadedFile = await infuraIpfsClient.add(video)
        const metaData = {
          title: this.challengeName,
          description: this.challengeDescription,
          videoUri: `https://${INFURA_DOMAIN}/ipfs/${uploadedFile.cid.toString()}`
        }
        const dataBlobMeta = new Blob([JSON.stringify(metaData)], { type: 'application/json' })
        const fileStreamMeta = new File([dataBlobMeta], this.challengeName)
        const metaDataFileStream = {
          content: fileStreamMeta,
          pin: true
        }
        const uploadedMetadata = await infuraIpfsClient.add(metaDataFileStream)
        console.log(uploadedMetadata)
        console.log(await this.startChallenge({
          beneficiary: this.selectedCharity.address,
          invitedAddresses: [],
          endTimestamp: new Date(this.endDate).getTime() / 1000,
          minEntryFee: this.minEntryFee,
          ipfsHash: uploadedMetadata.path
        }))
        await this.startChallenge({
          beneficiary: this.selectedCharity.address,
          invitedAddresses: [],
          endTimestamp: new Date(this.endDate).getTime() / 1000,
          minEntryFee: this.minEntryFee,
          ipfsHash: uploadedMetadata.path
        })
      } catch (error) {
        console.error('Failed to save asset to IPFS', error)
        return {
          error: error.message
        }
      }
    },
    addInvitedAddress () {
      if (this.isValidAddress && !this.invitedAddresses.includes(this.newInvitedAddress)) {
        this.invitedAddresses.push(this.newInvitedAddress)
        this.newInvitedAddress = ''
      }
    },
    toShortAddress (val) {
      return val && val.startsWith('0x') ? val.substr(0, 6) + '...' + val.substr(val.length - 6, val.length) : val
    }
  }
}
</script>

<style scoped>

.ChallengeCreation-video-upload-container{
  border:2px dashed #888;

  padding:10%;
}
.ChallengeCreation-dotted-camera-circle {
  border: 1.5px dashed grey;
  border-radius: 100%;
  padding:5px;
  cursor: pointer;
}

/deep/ .invitees .address_chip {
  height: 45px;
  margin-right: 5px;
  border-radius: 100px;
}
</style>
