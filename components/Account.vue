<template>
  <div>
    <v-avatar color="indigo">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <h2> {{ username }}</h2>
    <br>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      default: 'Username'
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
