<template>
  <div>
    <div class="User__header">
      <Account />
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
  components: { Account, ChallengeCard }
}
</script>
<style scoped>
.User__header {
  display: flex;
  justify-content: space-between;
}
</style>
