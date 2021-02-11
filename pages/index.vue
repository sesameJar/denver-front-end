<template>
  <div class="container">
    <div class="Home_header">
      <div class="Home_header-container">
        <table>
          <tr>
            <th>
              {{ numChallenges }}
            </th>
            <th v-if="contractQuery">
              {{ totalFund }}
            </th>
            <th v-if="contractQuery">
              {{ numChallengers }}
            </th>
            <th v-if="contractQuery">
              {{ numVideos }}
            </th>
          </tr>
          <tr>
            <td>Open Challenges</td>
            <td>Total Funds</td>
            <td> # Challengers</td>
            <td> # Videos</td>
          </tr>
        </table>
        <!-- <div>{{ contractQuery.length }}</div> -->
      </div>
      <span>BRING IT ON</span>
    </div>
    <br><br><br>
    <div class="Home__browse">
      <v-row>
        <v-col
          v-for="challenge in challengesQuery"
          :key="challenge.id"
          cols="12"
          md="4"
        >
          <ChallengeCard :challenge="challenge" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import ChallengeCard from '@/components/ChallengeCard'
// import VideoPost from '@/components/VideoPost'
import { CONTRACT_QUERY } from '@/queries/contractQuery.gql'
import { CHALLENGES_QUERY } from '@/queries/challengeQuery.gql'
export default {
  components: { ChallengeCard },
  computed: {
    numChallenges () {
      if (this.contractQuery) {
        return this.contractQuery.length === 0 ? 0 : this.contractQuery[0].numChallenges
      }
      return null
    },
    totalFund () {
      if (this.contractQuery) {
        return this.contractQuery.length === 0 ? 0 : this.contractQuery[0].totalFund
      }
      return null
    },
    numChallengers () {
      if (this.contractQuery) {
        return this.contractQuery.length === 0 ? 0 : this.contractQuery[0].numChallengers
      }
      return null
    },
    numVideos () {
      if (this.contractQuery) {
        return this.contractQuery.length === 0 ? 0 : this.contractQuery[0].numVideos
      }
      return null
    }
  },
  mounted () {
    // call once right away on mount
    this.getServerTime()
    window.setInterval(() => {
      this.getServerTime()
    }, 10000)
    if (!this.pollingStarted) {
      this.$apollo.queries.challengesQuery.startPolling(
        15000
      )
      this.pollingStarted = true
    }
  },
  methods: {
    async getServerTime () {
      this.serverTime = await this.$getServerTime()
    }
  },
  apollo: {
    challengesQuery: {
      query: CHALLENGES_QUERY
    },
    contractQuery: {
      query: CONTRACT_QUERY
    }
  }
}
</script>

<style>
.Home_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
th, td {
  padding: 15px;
}
.Home_header span {
  font-size: 50px;
  font-weight: 500;
}

.Home_header-container span {
  padding: 20px;
}
</style>
