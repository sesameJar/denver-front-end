<template>
  <div>
    <v-avatar color="indigo">
      <img
      :src="`https://avatars.onflow.org/avatar/${account
                                .toString()
                                .toLowerCase()}.svg`"
                    alt="">
    </v-avatar>
    <br>
  </div>
</template>
<script>
export default {
  props: {
    account: {
      type: String,
      default: ''
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
