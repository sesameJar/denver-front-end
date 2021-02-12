<template>
  <v-card v-if="challenge && challenge.videos && challenge.videos.length" max-width="480" elevation="2">
    <n-link :to="`/challenge/${challenge.id}`">
      <v-card-text>
        <VideoPlayer
          :video-data="challenge.videos[0].id"
        />
      </v-card-text>
      <v-card-title>
        <h3> {{ challenge.title }} </h3>
      </v-card-title>
      <v-card-subtitle>
        <div
          v-if="challenge.endTimestamp > 0"
        >
          <p class="ChallengeCard__time">
            {{
              new Date(challenge.endTimestamp * 1000) | moment("from")
            }}
          </p>
        </div>
      </v-card-subtitle>
      <!-- TODO can add this in when user have usernames -->
      <!-- <v-card-actions>
        <Account :account="challenge.creator" />
      </v-card-actions> -->
    </n-link>
  </v-card>
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
