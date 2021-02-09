
<template>
  <div>
    <input v-model="challengeId" label="Challenge ID">
    <v-btn elevation="12" @click="like">
      Like
    </v-btn>
    <v-btn elevation="12" @click="unlike">
      Unlike
    </v-btn>
  </div>
</template>
<script>
import { addLike, removeLike } from '@/utils/api'

export default {
  data () {
    return {
      challengeId: 3
    }
  },
  methods: {
    like () {
      addLike(Number(this.challengeId))
    },
    unlike () {
      removeLike(Number(this.challengeId))
    }
  }
}
</script>
