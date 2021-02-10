<template>
  <div>
    <div class="ChallengeCreation-upload-video">
      <div v-if="!videoUploaded" class="ChallengeCreation-video-upload-container" style="margin-bottom:25px">
        <div style="justify-content:center">
          <v-file-input
            v-model="videoUpload"
            accept="video/*"
            placeholder="Select A Video"
            prepend-icon="mdi-video"
          />
        </div>
      </div>
      <VideoPlayer
        :key="video"
        :video-data="video"
      />
    </div>
    <v-container class="ChallengeCreation-upload-video">
      <v-col>
        <v-row
          style="align-items: center;"
          class="ChallengeCreation-center-row-items"
        >
          <h3>Challenge:</h3>
          <v-text-field
            v-model="challengeName"
            class="ChallengeCreation-space-between-row-items"
            label="Challenge"
          />
        </v-row>
        <v-row class="ChallengeCreation-center-row-items">
          <h3 style="margin-top:2%">
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
          <h1>Challenge Dates</h1>
        </v-row>
        <br>
        <br>
        <v-row style="justify-content:center">
          <v-date-picker v-model="picker" />
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
import ipfsClient from 'ipfs-http-client'

export default {
  name: 'ChallengeCreation',
  components: {
    VideoPlayer
  },
  data () {
    return {
      date: {
        time: 0,
        day: ''
      },
      challengeName: '',
      challengeDescription: '',
      videoUploaded: false,
      videoUpload: null,
      video: null

    }
  },
  watch: {
    videoUpload () {
      this.video = URL.createObjectURL(this.videoUpload)
    }
  },
  methods: {
    async pushToIpfs () {
      const infuraIpfsClient = ipfsClient({ host: process.env.INFURA_DOMAIN, port: process.env.INFURA_PORT, protocol: 'https' })
      try {
        this.video.lastModifiedDate = new Date()
        this.video.name = this.challengeName
        const options = {
          content: this.video,
          pin: true
        }
        const pinningResult = []
        for await (const cid of infuraIpfsClient.add(options)) {
          pinningResult.push(cid)
        }
        console.log('Saved to IPFS', pinningResult)
        const value = pinningResult[1]
        return {
          cid: value.cid,
          cidFullPath: `${value.cid}/${this.challengeName}`,
          infuraIpfsUrl: `https://${process.env.INFURA_DOMAIN}/ipfs/${value.cid}/${this.challengeName}`
        }
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

</style>
