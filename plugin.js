export default function (ctx, inject) {
  // Require all services in the service directory
  const requireServices = require.context('<%= options.servicesDir %>', false, /\.(js|ts)$/)
  const servicesModules = requireServices.keys().map(fileName => {
    const builder = requireServices(fileName).default
    const name = fileName.replace(/^\.\//, '')
      .replace(/.[^.]*$/, '')
      .replace(/(-\w)/g, m => m[1].toUpperCase())

    return { name, builder }
  })

  function createService (httpClient) {
    const services = servicesModules.map(serviceModule => {
      const service = serviceModule.builder(httpClient)
      const name = service.name && typeof service.name === 'string'
        ? service.name
        : serviceModule.name

      return { service, name }
    })

    const serviceHashTable = services.reduce((hashTable, service) => {
      hashTable[service.name] = service.service
      return hashTable
    }, {})

    return serviceHashTable
  }

  // Find and setup client
  <% if (options.httpClient) { %>
    let client
    let httpClient
    try {
      const importedClient = require('<%= options.httpClient %>')
      client = importedClient.default || importedClient
    } catch (e) {
      client = null
    } finally {
      httpClient = client || ctx.$axios
    }
    const service = createService(httpClient)
  <% } else { %>
    const service = createService(ctx.$axios)
  <% } %>

  // Inject service to the context as $service
  ctx.$service = service
  inject('service', service)
}
