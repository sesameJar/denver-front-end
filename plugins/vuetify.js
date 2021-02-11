import Vue from 'vue'
import Vuetify, { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VFileInput } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VFileInput }
})

const opts = {
  // theme: { dark: true }
}

export default new Vuetify(opts)
