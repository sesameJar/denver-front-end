<template>
  <div>
    <v-avatar color="indigo">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <h2> {{ username }}</h2>
    <br>
    <p class="Account__description">
      {{ description }}
      I am MUMU the Challenger. I win and I win and I win. I love green. I love cactus. I love WIN.
    </p>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      default: 'Username'
    },
    description: {
      type: String,
      default: 'Description'
    }
  }
}
</script>
<style>
.Account__description {
  width: 30vw;
}
.v-avatar .v-icon {
  background-color: blue;
}
</style>
