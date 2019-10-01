const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const httpClient = moduleOptions.httpClient
    ? resolve(process.cwd(), moduleOptions.httpClient)
    : null

  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    options: {
      httpClient,
      servicesDir: resolve(process.cwd(), './service')
    }
  })

  this.options.build.transpile.push('@sparing-software/nuxt-service-module')
}
