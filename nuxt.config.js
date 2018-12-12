const pkg = require('./package')

module.exports = {
  srcDir: 'app',
  mode: 'spa',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  plugins: [
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/auth.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/axios',
    [
      'nuxt-sass-resources-loader',
      ['./assets/styles/variables.scss', './assets/styles/default.scss']
    ]
  ],

  axios: {},

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
