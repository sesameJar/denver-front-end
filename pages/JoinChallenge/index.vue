<template>
  <div>
    <div class="JoinChallenge-upload-video">
      <div v-if="!videoUploaded" class="JoinChallenge-video-upload-container" style="margin-bottom:25px">
        <div style="justify-content:center">
          <p>test</p>
        </div>
      </div>
    </div>
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

</style>
