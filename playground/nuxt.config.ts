export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {
    plugins() {
      console.log('0 -> plugin options defineNuxtConfig')
    },
  },
  devtools: { enabled: true }
})
