const { resolve } = require('path')
const util = require('util')

module.exports = function (moduleOptions) {
  const httpClient = moduleOptions.httpClient
    ? util.format('%O', resolve(process.cwd(), moduleOptions.httpClient))
    : null

  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    options: {
      httpClient,
      servicesDir: util.format('%O', resolve(process.cwd(), './service'))
    }
  })

  this.options.build.transpile.push('@sparing-software/nuxt-service-module')
}
