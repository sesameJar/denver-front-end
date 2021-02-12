<template>
  <v-card
    v-if="video"
    max-width="280"
    elevation="2"
  >
    <v-card-title>
      <Account :account="video.creator.id" />
    </v-card-title>
    <v-card-subtitle>
      {{
        new Date(video.uploadTimestamp * 1000) | moment("from")
      }}
    </v-card-subtitle>
    <v-card-text>
      <VideoPlayer
        :video-data="video.id"
      />
    </v-card-text>
    <v-card-actions class="VideoPost__actions">
      <div>
        <v-btn
          outlined
          color="indigo"
        >
          Share
        </v-btn>
        <v-btn
          outlined
          color="indigo"
        >
          <v-icon>mdi-thumb-up</v-icon> &nbsp; WOW
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import Account from '@/components/Account'
import VideoPlayer from '@/components/VideoPlayer'

export default {
  components: { Account, VideoPlayer },
  props: {
    challenge: {
      type: Object,
      default: null
    },
    video: {
      type: Object,
      default: null
    }
  }
}
</script>
<style>
.VideoPost__actions {
  display: flex;
  justify-content: space-evenly;
}
</style>
