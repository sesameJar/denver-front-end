<template>
  <video class="VideoPlayer__video" controls><source :src="videoData" type="video/mp4"></video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    videoData: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
.VideoPlayer__video {
  max-width: 100%;
  height: auto;
}
</style>
