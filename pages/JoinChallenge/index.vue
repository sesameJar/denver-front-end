<template>
  <div>
    <div class="JoinChallenge-upload-video">
      <div class="JoinChallenge-video-upload-container" style="margin-bottom:25px">
        <div style="justify-content:center">
          <img class="JoinChallenge-dotted-camera-circle" src="https://cdn.iconscout.com/icon/free/png-256/video-842-475041.png" height="50px" width="50px">
        </div>
      </div>
    </div>
    <v-container class="JoinChallenge-upload-video">
      <v-col>
        <v-row style="justify-content:center">
          <h2>Title Of The Challenge</h2>
        </v-row>
        <v-row class="JoinChallenge-center-row-items " style="justify-content: space-between;">
          <h3>Started By:</h3>
          <strong>Username</strong>
        </v-row>
        <v-row class="JoinChallenge-center-row-items ">
          <h3>
            I Challenge You:
          </h3>
        </v-row>
        <v-row class="JoinChallenge-center-row-items ">
          <v-input
            class="JoinChallenge-center-row-items"
            name="challenge-description"
            label="Video Description"
          />
        </v-row>
        <v-row class="JoinChallenge-center-row-items ">
          <v-chip
            class="ma-2"
          >
            Closable
          </v-chip>
          <v-chip
            class="ma-2"
          >
            Closable
          </v-chip>
          <v-chip
            class="ma-2"
          >
            Closable
          </v-chip>
        </v-row>
        <v-row class="JoinChallenge-center-row-items">
          <v-checkbox
            v-model="checkbox"
            :label="'I Agree To Everything'"
          />
        </v-row>
        <v-row class="JoinChallenge-center-row-items">
          <v-btn>
            Block Button
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'JoinChallenge'
}
</script>

<style scoped>
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
