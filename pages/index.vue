<template>
  <div class="container">
    <span>Open Challenges</span>
    <span>Total Funds</span>
    <span># Challenges</span>
    <p>BRING IT ON</p>
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
        </challengecard>
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

</style>
