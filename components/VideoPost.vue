<template>
  <div
    v-if="video"
    class="VideoPost__container"
    max-width="280"
  >
    <div class="VideoPost__description">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <VideoPlayer
          :video-data="video.id"
        />
        <Account /><br>
        <div class="VideoPost__btns">
          <v-btn
            outlined
            color="indigo"
          >
            Share
          </v-btn><br>
          <v-btn
            outlined
            color="indigo"
          >
            <v-icon>mdi-thumb-up</v-icon> WOW
          </v-btn>
        </div>
      </v-card>
      <!--
      <Account />
      <v-btn
        outlined
        color="indigo"
      >
        Share
      </v-btn><br>
      <v-btn
        outlined
        color="indigo"
      >
        <v-icon>mdi-thumb-up</v-icon> WOW
      </v-btn>
      <VideoPlayer
        :video-data="video.id"
      /> -->
    </div>
  </div>
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
  },

  methods: {
  }
}
</script>
<style>
.VideoPost__container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.VideoPost__btns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>
