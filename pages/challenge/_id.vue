<template>
  <section v-if="challengeByIdQuery">
    <div class="Challenge__header">
      <div class="Challenge__header-left">
        <h1 class="Challenge__title">
          Title: {{ challengeByIdQuery.title }}
        </h1>
        <br>
        <p> <strong>We Support:</strong>  {{ challengeByIdQuery.beneficiary }} </p>
        <br>
        <p><strong>Started By:</strong> <Account :account="challengeByIdQuery.creator" /> </p>
        <br>
        <p><strong>Description: </strong></p>
        <pre> {{ challengeByIdQuery.description }} </pre>
      </div>

      <div class="Challenge__stats">
        <span><strong>Total Funds:</strong> {{ challengeByIdQuery.totalFund }} </span>
        <br>
        <br>
        <span><strong># Submissions:</strong> {{ challengeByIdQuery.videos.length }} </span>
        <br>
        <br>
        <span><strong>Time Left:</strong><circular-count-down-timer
          :initial-value="timeRemaining"
          :stroke-width="5"
          :seconds-stroke-color="'darkblue'"
          :minutes-stroke-color="'darkblue'"
          :hours-stroke-color="'darkblue'"
          :underneath-stroke-color="'lightgrey'"
          :seconds-fill-color="'#efecec'"
          :minutes-fill-color="'#efecec'"
          :hours-fill-color="'#efecec'"
          :size="150"
          :padding="4"
          :hour-label="'hours'"
          :minute-label="'minutes'"
          :second-label="'seconds'"
          :show-second="true"
          :show-minute="true"
          :show-hour="true"
          style="text-align:center; color:black"
        /></span>
        <br>
        <br>
        <Join :challengeById="challengeByIdQuery" />
        <v-btn
          v-if="challengeComplete"
          style="background:red"
          @click="endChallenge"
        >
          End Challenge
        </v-btn>
      </div>
    </div>
    <br>
    <br>

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
import Join from '@/components/Join'
import { getServerTime } from '@/utils/helpers'
import { CHALLENGE_BY_ID } from '@/queries/challengeQuery.gql'
import CircularCountDownTimer from 'vue-circular-count-down-timer'
import Vue from 'vue'
Vue.use(CircularCountDownTimer)
export default {
  components: { VideoPost, Account, Join },
  data: () => ({
    pollingStarted: false
  }),
  computed: {
    challengeId () {
      return this.$route.params.id
    },
    challengeComplete () {
      return this.challengeByIdQuery && this.challengeByIdQuery.endTimestamp >= this.challengeByIdQuery.startTimestamp
    },
    timeRemaining () {
      if (this.challengeByIdQuery.endTimestamp - this.challengeByIdQuery.startTimestamp < 0) {
        return 0
      } else {
        return this.challengeByIdQuery.endTimestamp - this.challengeByIdQuery.startTimestamp
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
.Challenge__title {
  font-size: 50px;
}
.v-timeline:before {
margin-left: 50%;
}
</style>
<style>
.v-btn:not(.v-btn--round).v-size--default {
  margin-bottom: 5px;
}
</style>
