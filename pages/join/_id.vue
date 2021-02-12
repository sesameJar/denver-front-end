<template>
  <div class="font-weight-medium">
      <!-- CHALLENGE FORM -->
      <div class="challenge_container">
        <h2 class="mb-3">Jump In Challenge {CHALLENGE_NAME}</h2>
        <v-divider class="divider" vertical></v-divider>
        <div class="challenge_info level">
            <div class="level_item">
              <div>
                <p class="heading">Started By</p>
                <Account :accoun="`STARTER ACCOUNT`" />
              </div>

            </div>
            <div class="level_item">
              <div>
                <p class="heading">Number of participants</p>
                <p>3</p>
              </div>
            </div>
            <div class="level_item">
              <div>
                <p class="heading">Entry Fee</p>
                <p>0.1 Ξ</p>
              </div>
            </div>
        </div>
      </div>
      <!-- JOIN FORM -->
      <div class="join_form">

        <v-file-input
            v-model="videoFile"
            accept="video/*"
            class="file_input"
          >
          <div class="input_holder">

        </div></v-file-input>
        <v-btn>
          JumpIn!
        </v-btn>
      </div>
      <v-divider></v-divider>
      <!-- LATEST VIDEOS     -->
      <div class="latest_videos">
        <h3>Latest video in this challenge</h3>
      <v-row>
        <v-col>
          <v-card flat>
            <img width="350" src="https://cdn.vuetifyjs.com/images/backgrounds/md.jpg" alt="">
          </v-card>
        </v-col>
        <v-col>
          <v-card flat>
            <img width="350" src="https://cdn.vuetifyjs.com/images/backgrounds/md.jpg" alt="">
          </v-card>
        </v-col>
        <v-col>
          <v-card flat>
            <img width="350" src="https://cdn.vuetifyjs.com/images/backgrounds/md.jpg" alt="">
          </v-card>
        </v-col>
      </v-row>
      </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import Account from '@/components/Account'
export default {
  name: 'Join-Challenge',
  components: {
    Account
  },
  data () {
    return {
      videoFile: null
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

    },
    async jumpInTheChallenge () {
      try {
        await this.jumpIn({
          challengeId: 1,
          invitedAddresses: [],
          ipfsHash: 'QmQmNYYmc9yUJCR7pTb5zJtQ1mbjPe4jnZzGzimWmKiRCT',
          donation: 0.1
        })
      } catch (e) {
        console.error('ERROR IN JOIN', e)
      }
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

.latest_videos {
  margin-top: 40px;
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
