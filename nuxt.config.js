/* eslint-disable-next-line */
module.exports = {
  mode: 'universal',
  head: {
    title: 'Nuxt-TS-STARTER',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt-TS-STARTER',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/styles/mytheme.less'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/help', { src: '@/plugins/iview', ssr: true }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    /* eslint-disable-next-line */
    extend(config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      // }
    },
  },
  // this middleware will be called for every route change.
  router: {
    middleware: 'test',
  },
  server: {
    port: 3001,
  },
};
