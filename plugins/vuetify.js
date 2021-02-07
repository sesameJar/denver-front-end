import Vue from 'vue'
import Vuetify, { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VDatePicker } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VDatePicker }
})

const opts = {}

export default new Vuetify(opts)
