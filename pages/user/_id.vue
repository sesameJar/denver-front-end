<template>
  <div v-if="accountByIdQuery">
    <div class="User__header">
      <Account :account="accountId" /><br>
      <p>{{ accountId }}</p>
      <br><br>
      <p v-if="accountByIdQuery" class="User__description">
        {{ accountByIdQuery.description }}
      </p>
      <table>
        <tr>
          <th>{{ accountByIdQuery.totalFund }}</th>
          <th>{{ accountByIdQuery.numChallenges }}</th>
        </tr>
        <tr>
          <td>Total Funds</td>
          <td> # Challenges</td>
        </tr>
      </table>
    </div>
    <br><br><br>
    <div v-if="accountByIdQuery" class="User__video-cards">
      <v-row>
        <v-col v-for="challenge in accountByIdQuery.challenges" :key="challenge.id" cols="12" md="4">
          <ChallengeCard :challenge="challenge" />
          <!-- TODO pass prop to select this user; doesn't make sense to have "like" otherwise -->
          <!-- <v-btn>
            <v-icon>mdi-thumb-up</v-icon> &nbsp; WOW
          </v-btn> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Account from '@/components/Account'
import ChallengeCard from '@/components/ChallengeCard'
import { getServerTime } from '@/utils/helpers'
import { ACCOUNT_BY_ID } from '@/queries/accountQuery.gql'
export default {
  components: { Account, ChallengeCard },
  props: {
    description: {
      type: String,
      default: 'Description'
    }
  },
  data () {
    return {
      pollingStarted: false
    }
  },
  computed: {
    accountId () {
      return this.$route.params.id.toLowerCase()
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
    accountByIdQuery: {
      query: ACCOUNT_BY_ID,
      variables () {
        return {
          id: this.accountId
        }
      }
      // skip () {
      //   return {
      //     id: !this.$route.params.id
      //   }
      // }
    }
  }
}
</script>
<style scoped>
.User__header {
  display: flex;
  justify-content: space-between;
}
.User__description {
  width: 30vw;
}
</style>
