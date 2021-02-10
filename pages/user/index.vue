<template>
  <div>
    <div class="User__header">
      <Account />
      <br><br>
      <p class="User__description">
        {{ description }}
        I am MUMU the Challenger. I win and I win and I win. I love green. I love cactus. I love WIN.
      </p>
      <table>
        <tr>
          <th>100</th>
          <th>11</th>
        </tr>
        <tr>
          <td>Total Funds</td>
          <td> # Challenges</td>
        </tr>
      </table>
    </div>
    <br><br><br>
    <div class="User__video-cards">
      <v-row>
        <v-col cols="12" md="4">
          <ChallengeCard />
          <v-btn>
            <v-icon>mdi-thumb-up</v-icon> WOW
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <ChallengeCard />
          <v-btn>
            <v-icon>mdi-thumb-up</v-icon> WOW
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <ChallengeCard />
          <v-btn>
            <v-icon>mdi-thumb-up</v-icon> WOW
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <ChallengeCard />
          <v-btn>
            <v-icon>mdi-thumb-up</v-icon> WOW
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Account from '@/components/Account'
import ChallengeCard from '@/components/ChallengeCard'
export default {
  components: { Account, ChallengeCard },
  props: {
    description: {
      type: String,
      default: 'Description'
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
