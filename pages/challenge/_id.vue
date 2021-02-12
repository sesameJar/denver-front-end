<template>
  <section v-if="challengeByIdQuery">
    <div class="Challenge__header">
      <div class="Challenge__header-left">
        <h2>{{ challengeByIdQuery.title }}</h2>
        <p>We Support: {{ challengeByIdQuery.beneficiary }} </p>
        <p>Started By: {{ challengeByIdQuery.creator }} </p>
        <Account />
        <p>Description</p>
        <pre> {{ challengeByIdQuery.description }} </pre>
      </div>

      <div class="Challenge__stats">
        <span>total funds: {{ challengeByIdQuery.totalFund }} </span>
        <span># submissions: {{ challengeByIdQuery.videos.length }} </span>
        <br>
        <span>Time Left</span>
        <br>
        <v-btn

          class="ma-2"
          outlined
          color="indigo"
          style="background:#4edc0c"
        >
          Jump In!
        </v-btn>
        <v-btn
          v-if="challengeComplete"
          style="background:red"
          @click="endChallenge"
        >
          End Challenge
        </v-btn>
      </div>
    </div>

    <br><br>
    <v-timeline
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="(video, i) in challengeByIdQuery.videos"
        :key="i"
        fill-dot
      >
        <VideoPost :video="video" />
      </v-timeline-item>
    </v-timeline>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import VideoPost from '@/components/VideoPost'
import Account from '@/components/Account'
import { getServerTime } from '@/utils/helpers'
import { CHALLENGE_BY_ID } from '@/queries/challengeQuery.gql'
export default {
  components: { VideoPost, Account },
  data: () => ({
    pollingStarted: false
  }),
  computed: {
    challengeId () {
      return this.$route.params.id
    },
    challengeComplete () {
      return this.challengeByIdQuery.endTimestamp >= this.challengeByIdQuery.startTimestamp
    }
  },
  mounted () {
    // call once right away on mount
    getServerTime()
    window.setInterval(() => {
      getServerTime()
    }, 10000)
    if (!this.pollingStarted) {
      this.$apollo.queries.challengeByIdQuery.startPolling(
        15000
      )
      this.pollingStarted = true
    }
  },
  methods: {
    ...mapActions('web3', ['resolveChallenge']),
    async endChallenge () {
      try {
        await this.resolveChallenge({
          challengeId: this.challengeId
        })
        this.$router.push({
          path: '/'
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  apollo: {
    challengeByIdQuery: {
      query: CHALLENGE_BY_ID,
      variables () {
        return { id: this.challengeId }
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
