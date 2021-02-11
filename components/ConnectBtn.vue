<template>
  <div>
    <button v-if="!account" @click="connectWallet">Connect</button>
    <Account v-else :account="account" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Account from '@/components/Account'
export default {
  name: 'Connect-Button',
  components: {
    Account
  },
  computed: {
    ...mapState('web3', ['account'])
  },
  async mounted () {

  },
  methods: {
    ...mapActions('web3', ['bootstrap']),
    async connectWallet () {
      if (typeof window.ethereum === 'undefined') {
        alert('Use a web3 browser')
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      await this.bootstrap(window.web3)
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
