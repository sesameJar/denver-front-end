<template>
  <v-btn tile plain to="user" class="active Account__container">
    <v-avatar color="indigo">
      <img
        :src="`https://avatars.onflow.org/avatar/${account
          .toString()
          .toLowerCase()}.svg`"
        alt=""
      >
    </v-avatar>
  </v-btn>
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
<style scoped>
.Account__container {
  display: block;
  opacity: 1;
}

/deep/ .Account__container > .v-btn__content {
  opacity: 1;
}
.Account__description {
  width: 30vw;
}
.v-avatar .v-icon {
  background-color: blue;
}
</style>
