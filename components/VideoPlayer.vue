<template>
  <video class="VideoPlayer__video" controls><source :src="videoWithIpfsUrl" type="video/mp4"></video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    videoData: {
      type: String,
      default: null
    }
  },
  computed: {
    videoWithIpfsUrl () {
      if (this.videoData &&
       !this.videoData.includes('pfs.infura.io') &&
       !this.videoData.includes('blob:')) {
        return `https://ipfs.infura.io/ipfs/${this.videoData}`
      }
      return this.videoData
    }
  }
}
</script>

<style>
.VideoPlayer__video {
  /* display: block; */
  max-width: 100%;
  height: auto;
}
</style>
