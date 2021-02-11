<template>
  <div>
    <VideoPlayer
      :video-data="challenge.videos[0].id"
    />
    <h3> {{ challenge.title }} </h3>
    <span> {{ challenge.endTimestamp }} days left</span>
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer'
export default {
  components: { VideoPlayer },
  props: {
    challenge: {
      type: Object,
      default: null
    }
  }
}
</script>
