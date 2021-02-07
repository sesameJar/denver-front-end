<template>
  <div>
    <div class="ChallengeCreation-upload-video">
      <div class="ChallengeCreation-video-upload-container" style="margin-bottom:25px">
        <div style="justify-content:center">
          <img class="ChallengeCreation-dotted-camera-circle" src="https://cdn.iconscout.com/icon/free/png-256/video-842-475041.png" height="50px" width="50px">
        </div>
      </div>
    </div>
    <v-container class="ChallengeCreation-upload-video">
      <v-col>
        <v-row
          style="align-items: center;"
          class="ChallengeCreation-center-row-items"
        >
          <h3>Challenge:</h3>
          <v-text-field
            class="ChallengeCreation-space-between-row-items"
            label="Challenge"
          />
        </v-row>
        <v-row class="ChallengeCreation-center-row-items">
          <h3 style="margin-top:2%">
            Description:
          </h3>
          <v-textarea
            class="ChallengeCreation-space-between-row-items"
            name="challenge-description"
            label="Video Description"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          />
        </v-row>
        <v-row style="justify-content:center">
          <h1>Challenge Dates</h1>
        </v-row>
        <br>
        <br>
        <v-row style="justify-content:center">
          <Datepicker :inline="true" />
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      videoUploaded: false,
      date: {
        time: 0,
        day: ''
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
