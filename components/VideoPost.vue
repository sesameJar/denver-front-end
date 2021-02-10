<template>
  <div

    class="VideoPost__container"
    max-width="280"
  >
    <!-- <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template> -->
    <div class="VideoPost__description">
      <Account />
      <v-btn
        outlined
        color="indigo"
      >
        Share
      </v-btn><br>
      <v-btn
        outlined
        color="indigo"
      >
        <v-icon>mdi-thumb-up</v-icon> WOW
      </v-btn>
    </div>
    <v-img
      max-width="50%"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />
  </div>
</template>
<script>
// import Account from '@components/Account'
export default {
  // components: { Account },
  // data: () => ({
  //   loading: false,
  //   selection: 1
  // }),

  methods: {
    // reserve () {
    //   this.loading = true

    //   setTimeout(() => (this.loading = false), 2000)
    // }
  }
}
</script>
<style>
.VideoPost__container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
