<template>
  <div class="font-weight-medium">
      <!-- CHALLENGE FORM -->
      <div class="challenge_container">
        <h2 class="mb-3">Jump In Challenge {CHALLENGE_NAME}</h2>
        <v-divider class="divider" vertical></v-divider>
        <div class="challenge_info level">
            <div class="level_item">
              <div v-if="challengeCreator">
                <p class="heading">Started By</p>
                <Account :account="challengeCreator" />
              </div>

            </div>
            <div class="level_item">
              <div>
                <p class="heading">Number of participants</p>
                <p>{{numChallengers}}</p>
              </div>
            </div>
            <div class="level_item">
              <div>
                <p class="heading">Entry Fee</p>
                <p>{{minEntryFee}} Ξ</p>
              </div>
            </div>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- JOIN FORM -->
      <div class="join_form">

        <v-file-input
            v-model="videoFile"
            accept="video/*"
            class="file_input"
          >
          <div class="input_holder">

        </div>
        </v-file-input>
        <v-text-field
            v-if="!isPublic"
            v-model="newInvitedAddress"
            label="Invite Others"
            append-icon="mdi-plus"
            @click:append="addInvitedAddress"
          />
          <div class="invitees" v-if="!isPublic">
            <v-chip
              pill
              v-for="address in invitedAddresses"
              :key="address"
              class="address_chip"
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
          </div>
        <v-btn @click="jumpInTheChallenge" :disabled="!videoFile">
          Jump In Now!
        </v-btn>
      </div>
      <v-divider></v-divider>
      <!-- LATEST VIDEOS     -->
      <div class="latest_videos" v-if="challengeByIdQuery">
        <h3>Latest video in this challenge</h3>
      <v-row>
        <v-col :key="vid.id" v-for="vid in challengeByIdQuery.videos">
          <v-card flat>
            <VideoPlayer :key="vid.id" :video-data="vid.id" />
          </v-card>
        </v-col>
      </v-row>
      </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import Account from '@/components/Account'
import VideoPlayer from '@/components/VideoPlayer'
import { CHALLENGE_BY_ID } from '@/queries/challengeQuery'
import ipfsClient from 'ipfs-http-client'
import { ethers } from 'ethers'
export default {
  name: 'Join-Challenge',
  components: {
    Account,
    VideoPlayer
  },
  data () {
    return {
      videoFile: null,
      video: null,
      invitedAddresses: [],
      newInvitedAddress: null
    }
  },
  computed: {
    minEntryFee () {
      if (this.challengeByIdQuery) {
        return ethers.utils.formatEther(this.challengeByIdQuery.minEntryFee)
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return null
    },
    numChallengers () {
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.numChallengers
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return null
    },
    challengeCreator () {
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.creator
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
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
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.isPublic
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
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
        await this.jumpIn({
          challengeId: 1,
          invitedAddresses: this.invitedAddresses,
          ipfsHash: videoCID,
          donation: this.minEntryFee
        })
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
  },
  apollo: {
    challengeByIdQuery: {
      query: CHALLENGE_BY_ID,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      pollInterval: 5000
    }
  }
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
  height: 38px;
  margin-right: 5px;
  border-radius: 100px;
}

.latest_videos h3 {
  margin: 40px 0;
}

.JoinChallenge-upload-video {
  display: flex;
  justify-content: center;
}
.JoinChallenge-video-upload-container{
  border:1px solid black;
  margin:5%;
  padding:10%;
}
.JoinChallenge-dotted-camera-circle {
    border: 1.5px dashed grey;
    border-radius: 100%;
    padding:5px;
    cursor: pointer;
 }

 .JoinChallenge-center-row-items {
   margin-left:35%;
   margin-right:35%;
   justify-content: center;
   margin-top:3%;
 }
.JoinChallenge-space-between-row-items {
   margin-left:14%;
 }

</style>
