<template>
  <div

    class="VideoPost__container"
    max-width="280"
  >
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
  </div>
</template>
<script>
import Account from '@/components/Account'

export default {
  components: { Account },
  props: {
    video: {
      type: Object,
      default: null
    }
  },

  methods: {
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
