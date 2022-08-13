const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  /* devServer api prefix */
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081'
      },
      '/auth': {
        target: 'http://localhost:8081'
      }
    }
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
		}
  }
})
