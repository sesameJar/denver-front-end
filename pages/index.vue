<template>
  <div class="container">
    <div class="Home_header">
      <div class="Home_header-container">
        <table style="width:100%">
          <tr>
            <th>12</th>
            <th>100</th>
            <th>11</th>
          </tr>
          <tr>
            <td>Open Challenges</td>
            <td>Total Funds</td>
            <td> # Challenges</td>
          </tr>
        </table>
      </div>
      <span>BRING IT ON</span>
    </div>
    <br><br><br>
    <div class="Home__browse">
      <v-row>
        <v-col cols="12" md="4">
          <ChallengeCard />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
        <v-col cols="12" md="4">
          <v-img height="300px" src="https://picsum.photos/seed/1/200/100" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard'
export default {
  components: { ChallengeCard }
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
