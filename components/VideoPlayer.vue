<template>
  <video height="300" width="300" controls><source :src="videoData" type="video/mp4"></video>
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
