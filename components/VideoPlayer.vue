<template>
  <video height="300" width="300" controls><source :src="videoWithIpfsUrl" type="video/mp4"></video>
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
       !this.videoData.includes('localhost')) {
        return `https://ipfs.infura.io/ipfs/${this.videoData}`
      }
      return this.videoData
    }
  }
}
</script>

<style scoped>
  video {
    display: block;
  }
</style>
