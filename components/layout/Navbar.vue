<template>
  <v-toolbar dark flat>
    <v-spacer />
    <v-btn to="/" text plain nuxt>
      Challenge Me!
    </v-btn>
    <v-btn text plain outlined nuxt to="/start">
      Start a Challenge
    </v-btn>
    <v-btn tile plain nuxt>
      <connect-btn />
    </v-btn>
  </v-toolbar>
</template>
<script>
import ConnectBtn from '@/components/ConnectBtn'

export default {
  name: 'Navbar',
  components: {
    ConnectBtn
  }
}
</script>
