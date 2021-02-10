<template>
  <section>
    <!-- <v-timeline>
    <v-timeline-item>timeline item</v-timeline-item>
    <v-timeline-item class="text-right">
      timeline item
    </v-timeline-item>
    <v-timeline-item>timeline item</v-timeline-item>
  </v-timeline> -->
    <div class="Challenge__header">
      <div class="Challenge__header-left">
        <h2>Title</h2>
        <p>We Support: </p>
        <p>Started By: </p>
        <Account />
        <p>Description</p>
      </div>

      <div class="Challenge__stats">
        <span>total funds</span>
        <span># challenges</span>
        <br>
        <span>Time Left</span>
        <br>
        <v-btn
          class="ma-2"
          outlined
          color="indigo"
        >
          Jump In!
        </v-btn>
      </div>
    </div>

    <br><br>
    <v-timeline
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        :color="item.color"
        :icon="item.icon"
        fill-dot
      >
        <!-- <v-card-title class="title">
            Lorem Ipsum Dolor
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
            <v-btn
              :color="item.color"
              class="mx-0"
              outlined
            >
              Button
            </v-btn>
          </v-card-text> -->
        <video-post />
      </v-timeline-item>
    </v-timeline>
  </section>
</template>
<script>
import VideoPost from '@/components/VideoPost'
import Account from '@/components/Account'

export default {
  components: { VideoPost, Account },
  data: () => ({
    items: [
      {
        color: 'red lighten-2',
        icon: 'mdi-star'
      },
      {
        color: 'purple darken-1',
        icon: 'mdi-book-variant'
      },
      {
        color: 'green lighten-1',
        icon: 'mdi-airballoon'
      },
      {
        color: 'indigo',
        icon: 'mdi-buffer'
      }
    ]
  })
}
</script>

<style scoped>
.Challenge__header {
  display: flex;
  justify-content: space-between;
}

</style>
<style>
.v-timeline:before {
margin-left: 50%;
}
</style>
