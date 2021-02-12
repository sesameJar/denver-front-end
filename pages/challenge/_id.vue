<template>
  <section>
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
          style="background:#4edc0c"
        >
          Jump In!
        </v-btn>
        <v-btn
          v-if="challengeComplete"
          style="background:red"
          @click="endChallenge"
        >
          End Challenge
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
        <VideoPost :video="video" />
      </v-timeline-item>
    </v-timeline>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import VideoPost from '@/components/VideoPost'
import Account from '@/components/Account'
import { SINGLE_CHALLENGE_QUERY } from '@/queries/challengeQuery.gql'
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
  }),
  computed: {
    challenge () {
      if (this.challengeQuery && this.challengeQuery.length > 0) {
        return this.challengeQuery[0]
      } else {
        return null
      }
    },
    challengeId () {
      return this.$route.params.id
    },
    challengeComplete () {
      return this.challenge.endTimestamp >= this.challenge.startTimestamp
    }
  },
  methods: {
    ...mapActions('web3', ['resolveChallenge']),
    async endChallenge () {
      try {
        await this.resolveChallenge({
          challengeId: this.challengeId
        })
        this.$router.push({
          path: '/'
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  apollo: {
    challengeQuery: {
      query: SINGLE_CHALLENGE_QUERY,
      variables () {
        return { id: this.challengeId }
      }
    }
  }
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
<style>
.v-btn:not(.v-btn--round).v-size--default {
  margin-bottom: 5px;
}
</style>
