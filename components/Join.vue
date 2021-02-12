<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Jump In!
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Jump In Challenge <span style="text-decoration:underline">{{challengeById && challengeById.title}}</span></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-if="!isUploadedVideo"
              cols="12"
              sm="12"
            >
              <v-file-input
                v-model="videoFile"
                accept="video/*"
                class="file_input"
                placeholder="Choose a video"
              />
            </v-col>
            <v-col
              v-else
              cols="12"
              sm="12"
            >
              <VideoPlayer
                :key="video"
                style="max-height:450px;max-width:550px; margin:0 auto"
                :video-data="video"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-if="!isPublic"
                v-model="newInvitedAddress"
                label="Invite Others"
                append-icon="mdi-plus"
                @click:append="addInvitedAddress"
              />
            </v-col>
            <v-col v-if="!isPublic && invitedAddresses.length" cols="12" class="invitees">
              <v-chip
                v-for="address in invitedAddresses"
                :key="address"
                pill
                class="address_chip px-4"
              >
                <v-avatar left>
                  <v-img
                    :src="`https://avatars.onflow.org/avatar/${address
                      .toString()
                      .toLowerCase()}.svg`"
                  />
                </v-avatar>
                {{ toShortAddress(address) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          large
          dark
          v-bind="attrs"
          v-on="on"
          style="display:block;margin: 0 auto 20px"
        >
          Jump In
        </v-btn>
        <v-btn
          color="blue-grey darken-4 white--text"
          flat
          @click="jumpInTheChallenge();"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import VideoPlayer from '@/components/VideoPlayer'
import ipfsClient from 'ipfs-http-client'
import { ethers } from 'ethers'
export default {
  name: 'JoinChallenge',
  components: {
    VideoPlayer
  },
  props: {
    challengeById: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      videoFile: null,
      video: null,
      isUploadedVideo: false,
      invitedAddresses: [],
      newInvitedAddress: null,
      dialog: false
    }
  },
  computed: {
    minEntryFee () {
      if (this.challengeById) {
        return ethers.utils.formatEther(this.challengeById.minEntryFee)
      }
      // return ethers.utils.parseEther(this.challengeById?.minEntryFee.toString())
      return null
    },
    numChallengers () {
      if (this.challengeById) {
        return this.challengeById.numChallengers
      }
      // return ethers.utils.parseEther(this.challengeById?.minEntryFee.toString())
      return null
    },
    challengeCreator () {
      if (this.challengeById) {
        return this.challengeById.creator
      }
      // return ethers.utils.parseEther(this.challengeById?.minEntryFee.toString())
      return null
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
    },
    isPublic () {
      if (this.challengeById) {
        return this.challengeById.isPublic
      }
      // return ethers.utils.parseEther(this.challengeById?.minEntryFee.toString())
      return false
    }
  },
  watch: {
    videoFile () {
      this.video = URL.createObjectURL(this.videoFile)
      this.isUploadedVideo = true
    }
  },
  methods: {
    ...mapActions('web3', ['jumpIn']),
    async pinToIPFS () {
      const INFURA_DOMAIN = 'ipfs.infura.io'
      const INFURA_PORT = '5001'
      const infuraIpfsClient = ipfsClient({ host: INFURA_DOMAIN, port: INFURA_PORT, protocol: 'https' })
      try {
        const video = {
          content: this.videoFile,
          pin: true
        }
        const uploadedFile = await infuraIpfsClient.add(video)

        return `https://${INFURA_DOMAIN}/ipfs/${uploadedFile.cid.toString()}`
      } catch (e) {
        console.error('Failed to save asset to IPFS', e)
      }
    },
    async jumpInTheChallenge () {
      try {
        const videoCID = await this.pinToIPFS()
        const result = await this.jumpIn({
          challengeId: 1,
          invitedAddresses: this.invitedAddresses,
          ipfsHash: videoCID,
          donation: this.minEntryFee
        })
        if (result.status === 'SUCCESS') {
          this.dialog = false
        }
      } catch (e) {
        console.error('ERROR IN JOIN', e)
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
  // apollo: {
  //   challengeById: {
  //     query: CHALLENGE_BY_ID,
  //     variables () {
  //       return {
  //         id: this.$route.params.id
  //       }
  //     },
  //     pollInterval: 5000
  //   }
  // }
}
</script>

<style scoped>
.challenge_container {
  padding : 30px 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
}

.challenge_container h2 {
  display: flex;
}

.challenge_container.divider {
  display: flex;
}

.challenge_container .challenge_info.level {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.challenge_container .challenge_info.level > .level_item {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  justify-items: center;
  margin-right: 25px;
}

.challenge_container .challenge_info.level > .level_item p {
  text-align: center;
  display: block;
  font-weight: bolder;
}

.challenge_container .challenge_info.level > .level_item p.heading {
  display: block;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-family: Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #999;
}

.join_form {
  position: relative;
  width: 450px;
  height: 450px;
}

.input_holder {
  width: 450px;
  height: 450px;

  background-color: #444;
}

.file_input input {
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  top:0;
  z-index: 0;
  opacity: 0;
  display: block;
}

.invitees {
  margin-bottom: 20px;
}

/deep/ .invitees .address_chip {
  height: 45px;
  margin-right: 5px;
  border-radius: 100px;
}

.latest_videos h3 {
  margin: 40px 0;
}

</style>
