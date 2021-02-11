<template>
  <v-toolbar dark flat>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn
        href="/"
        text
        plain
      >
        Challenge Me!
      </v-btn>
      <v-btn
        text
        plain
        outlined
        href="/start"
      >
        Start a Challenge
      </v-btn>

      <v-btn
        tile
        plain

      >
        <connect-btn />
      </v-btn>

  </v-toolbar>
</template>
<script>
import ConnectBtn from '@/components/ConnectBtn'
// import bg from '../assets/photo-1586073055431-5b31161642f7.jpeg'
export default {
  name: 'Navbar',
  components: {
    ConnectBtn
  },
  data () {
    return {
      // bgImg: `${require('~/assets/photo-1533135091724-62cc5402aa20.jpeg')}`
    }
  }
}
</script>
<style scoped>

</style>
