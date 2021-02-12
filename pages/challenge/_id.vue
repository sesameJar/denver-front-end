<template>
  <section v-if="challengeByIdQuery">
      <div class="challenge_container">
        <h2 class="mb-3">{{challengeByIdQuery && challengeByIdQuery.title}}</h2>
        <v-divider class="divider" vertical></v-divider>
        <div class="challenge_info level">
            <div class="level_item">
              <div v-if="challengeCreator">
                <p class="heading">Started By</p>
                <Account :account="challengeCreator" />
              </div>

            </div>
            <div class="level_item">
              <div>
                <p class="heading">Number of participants</p>
                <p>{{numChallengers}}</p>
              </div>
            </div>
            <div class="level_item">
              <div>
                <p class="heading">Entry Fee</p>
                <p>{{minEntryFee}} Ξ</p>
              </div>
            </div>
        </div>
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
          :stroke-width="2"
          :seconds-stroke-color="'darkblue'"
          :minutes-stroke-color="'darkblue'"
          :hours-stroke-color="'darkblue'"
          :underneath-stroke-color="'lightgrey'"
          :seconds-fill-color="'#efecec'"
          :minutes-fill-color="'#efecec'"
          :hours-fill-color="'#efecec'"
          :size="70"
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
import { ethers } from 'ethers'
import CircularCountDownTimer from 'vue-circular-count-down-timer'

import VideoPost from '@/components/VideoPost'
import Account from '@/components/Account'
import Join from '@/components/Join'

import { getServerTime } from '@/utils/helpers'
import { CHALLENGE_BY_ID } from '@/queries/challengeQuery.gql'

import Vue from 'vue'
Vue.use(CircularCountDownTimer)

export default {
  name: 'Challenge-Page',
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
    },
    minEntryFee () {
      if (this.challengeByIdQuery) {
        return ethers.utils.formatEther(this.challengeByIdQuery.minEntryFee)
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return null
    },
    numChallengers () {
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.numChallengers
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return null
    },
    challengeCreator () {
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.creator
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return null
    },
    isValidAddress () {
      if (!this.newInvitedAddress) {
        return false
      }
      try {
        ethers.utils.getAddress(this.newInvitedAddress)
        return true
      } catch (e) {
        return false
      }
    },
    isPublic () {
      if (this.challengeByIdQuery) {
        return this.challengeByIdQuery.isPublic
      }
      // return ethers.utils.parseEther(this.challengeByIdQuery?.minEntryFee.toString())
      return false
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
.challenge_container {
  padding : 30px 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
}

.challenge_container h2 {
  display: flex;
}

.challenge_container.divider {
  display: flex;
}

.challenge_container .challenge_info.level {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.challenge_container .challenge_info.level > .level_item {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  justify-items: center;
  margin-right: 25px;
}

.challenge_container .challenge_info.level > .level_item p {
  text-align: center;
  display: block;
  font-weight: bolder;
}

.challenge_container .challenge_info.level > .level_item p.heading {
  display: block;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-family: Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #999;
}
</style>
