<template>
  <video controls><source :src="videoWithIpfsUrl" type="video/mp4"></video>
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
      if (!this.videoData?.includes('pfs.infura.io')) {
        return `https://ipfs.infura.io/ipfs/${this.videoData}`
      }
      return this.videoData
    }
  }

}
</script>

<style>

</style>
