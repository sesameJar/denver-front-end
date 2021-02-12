<template>
  <article>
    <section v-if="challengeById">
      <div class="Challenge__header">
        <div class="Challenge__header-left">
          <h2>Title</h2>

          <p>We Support: </p>
          <p>Started By: </p>
          <Account />
          <p>Description</p>
          <p>{{ challenge.description }}</p>
        </div>

        <div class="Challenge__stats">
          <span>total funds</span>
          <span># challenges</span>
          <br>
          <span>Time Left</span>
          <br>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
          >
            Jump In!
          </v-btn>
        </div>
      </div>

      <br><br>
      <v-timeline
        align-top
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(video, i) in challenge.videos"
          :key="i"
          fill-dot
        >
          <VideoPost :video="video" />
        </v-timeline-item>
      </v-timeline>
    </section>
  </article>
</template>
<script>
import { CHALLENGE_BY_ID } from '@/queries/challengeQuery.gql'
import VideoPost from '@/components/VideoPost'
import { getServerTime } from '@/utils/helpers'
import Account from '@/components/Account'

export default {
  components: { VideoPost, Account },

  // eslint-disable-next-line require-await
  // async asyncData ({ params }) {
  //   const challengeIdFromURL = params.id // When calling /abc the slug will be "abc"
  //   return { challengeIdFromURL }
  // },
  data () {
    return {
      pollingStarted: false
    }
  },
  computed: {
    challenge () {
      if (this.challengeQuery && this.challengeQuery.length > 0) {
        return this.challengeQuery[0]
      } else {
        return null
      }
    }
  },
  mounted () {
    // call once right away on mount
    getServerTime()
    window.setInterval(() => {
      getServerTime()
    }, 10000)
    if (!this.pollingStarted) {
      this.$apollo.queries.accountByIdQuery.startPolling(
        15000
      )
      this.pollingStarted = true
    }
  },
  apollo: {
    challengeByIdQuery: {
      query: CHALLENGE_BY_ID,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      skip () {
        return {
          id: !this.$route.params.id
        }
      }
    }
  }
}
</script>

<style scoped>
.Challenge__header {
  display: flex;
  justify-content: space-between;
}

</style>
<style>
.v-timeline:before {
margin-left: 50%;
}
</style>
<style>
.v-btn:not(.v-btn--round).v-size--default {
  margin-bottom: 5px;
}
</style>
