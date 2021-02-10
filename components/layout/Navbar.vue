<template>
  <v-toolbar>
    <v-toolbar
      dense
      floating
    >
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      />
    </v-toolbar>
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
        to="/ChallengeCreation"
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
  margin-left: 50%;
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
