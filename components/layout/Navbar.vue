<template>
  <v-toolbar>
    <div class="Navbar__container">
      <n-link
        class="Navbar__link"
        to="/"
      >
        Challenge Me!
      </n-link>
      <v-spacer />
      <n-link
        class="Navbar__link"
        to="/"
      >
        Start a Challenge
      </n-link>
      <v-spacer />
      <n-link
        class="Navbar__link"
        to="/"
      >
        Sign In
      </n-link>
    </div>
  </v-toolbar>
</template>
<style scoped>
.Navbar__container {
  margin-left: 65%;
  display: flex;
  flex-direction: row;
  flex-grow: 5;
}
.Navbar__link {
  color: black;
  text-decoration: none;
  flex-grow: 2;
}
</style>
