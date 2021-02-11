<template>
  <div>
    <VideoPlayer
      :video-data="challenge.videos[0].id"
    />
    <h3> {{ challenge.title }} </h3>
    <div
      v-if="challenge.endTimestamp > 0"
    >
      <p class="ChallengeCard__time">
        {{
          new Date(challenge.endTimestamp * 1000) | moment("from")
        }}
      </p>
    </div>
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
<style scoped>
.ChallengeCard__time {
  color: grey;
  margin-top: 5px;
  font-size: 20px;
}
</style>
