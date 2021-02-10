<template>
  <div>
    <v-img
      max-width="50%"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />
    <h3> {{ title }} </h3>
    <span> {{ timeLeft }} days left</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    timeLeft: {
      type: Number,
      default: 0
    }
  }

}
</script>
