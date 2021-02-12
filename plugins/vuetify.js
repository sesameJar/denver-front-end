import Vue from 'vue'
import Vuetify, { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VFileInput } from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify, {
  components: { VBtn, VCol, VRow, VContainer, VTextField, VTextarea, VFileInput }
})

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      },
      dark: {
        primary: colors.blueGrey.darken4,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    },
    dark: true
  }
}

export default new Vuetify(opts)
