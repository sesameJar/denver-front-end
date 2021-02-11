<template>
  <div>
    <div class="ChallengeCreation-upload-video">
      <div v-if="!isUploadedVideo" class="ChallengeCreation-video-upload-container" style="margin-bottom:25px">
        <div style="justify-content:center">
          <v-file-input
            v-model="videoFile"
            accept="video/*"
            placeholder="Select A Video"
            prepend-icon="mdi-video"
          />
        </div>
      </div>
      <div v-else style="margin-top:5%">
        <VideoPlayer
          :key="video"
          style="max-height:450px"
          :video-data="video"
        />
      </div>
    </div>
    <v-container class="ChallengeCreation-upload-video">
      <v-col>
        <v-row
          style="align-items: center;"
          class="ChallengeCreation-center-row-items"
        >
          <h3>Challenge Name:</h3>
          <v-text-field
            v-model="challengeName"
            class="ChallengeCreation-space-between-row-items"
            label="Challenge"
          />
        </v-row>
        <v-row
          style="align-items: center;"
          class="ChallengeCreation-center-row-items"
        >
          <h3>Charity Address:</h3>
          <v-text-field
            v-model="charityAddress"
            class="ChallengeCreation-space-between-row-items"
            label="Charity"
          />
        </v-row>
        <v-row class="ChallengeCreation-center-row-items">
          <h3 style="margin-top:3%">
            Description:
          </h3>
          <v-textarea
            v-model="challengeDescription"
            class="ChallengeCreation-space-between-row-items"
            name="challenge-description"
            label="Video Description"
          />
        </v-row>
        <v-row style="justify-content:center">
          <h2>Challenge End Date</h2>
        </v-row>
        <v-row style="justify-content:center;" class="ChallengeCreation-calendar-spacing">
          <v-date-picker
            v-model="endDate"
            no-title
            elevation="15"
          />
        </v-row>
        <br>
        <v-row style="justify-content:center">
          <v-btn @click="pushToIpfs">
            Submit Challenge
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
import ipfsClient from 'ipfs-http-client'

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
      charityAddress: '',
      isUploadedVideo: false,
      videoFile: null,
      video: null

    }
  },

  watch: {
    videoFile () {
      this.video = URL.createObjectURL(this.videoFile)
      this.isUploadedVideo = true
    }
  },
  methods: {
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
        this.$store.dispatch('web3ethers/startChallenge', {
          beneficiary: this.charityAddress,
          // invitedAddresses: ,
          endTimestamp: new Date(this.endDate).getTime() / 1000,
          minEntryFee: 100, // revise this<<<
          ipfsHash: uploadedMetadata
        })
      } catch (error) {
        console.error('Failed to save asset to IPFS', error)
        return {
          error: error.message
        }
      }
    }
  }
}
</script>

<style scoped>
.ChallengeCreation-upload-video {
  display: flex;
  justify-content: center;
}
.ChallengeCreation-selected-date-range {
  display: inline;
}
.ChallengeCreation-video-upload-container{
  border:1px solid black;
  margin:5%;
  padding:10%;
}
.ChallengeCreation-dotted-camera-circle {
    border: 1.5px dashed grey;
    border-radius: 100%;
    padding:5px;
    cursor: pointer;
 }
.ChallengeCreation-center-row-items {
   margin-left:35%;
   margin-right:35%;
 }
.ChallengeCreation-space-between-row-items {
   margin-left:4%;
 }
.ChallengeCreation-calendar-spacing {
   margin-top:4%;
   height:450px;
 }

</style>
