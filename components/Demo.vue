
<template>
  <div>
    <v-input v-model="challengeId" label="Challenge ID" />
    <v-btn elevation="12" @click="like">
      Like
    </v-btn>
  </div>
</template>
<script>
import { addLike } from '@/utils/api'

export default {
  data () {
    return {
      challengeId: 3
    }
  },
  methods: {
    like () {


      addLike(this.challengeId)
    }
  }
}
</script>
