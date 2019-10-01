# Nuxt service module

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/SparingSoftware/nuxt-service-module/blob/master/LICENSE)
[![Downloads number](https://img.shields.io/npm/dt/@sparing-software/nuxt-service-module.svg)](https://www.npmjs.com/package/@sparing-software/nuxt-service-module)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Services integration with Nuxt.js

## Installation
Install package in your project 
```bash
$ npm install @sparing-software/nuxt-service-module
```
 
## Configuration
Add module to `nuxt.config.js`
```js
modules: [
  '@sparing-software/nuxt-service-module'
  // or
  ['@sparing-software/nuxt-service-module', {
  // ... options
  }]
]
```

## Options

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `httpClient`                   | Relative path to your favourite httpClient  | `null` (httpClient received in service will be set to [$axios](https://github.com/nuxt-community/axios-module). Caveat: `@sparing-software/nuxt-service-module` must be set before `@nuxtjs/axios` module) |

## Example
```js
['@sparing-software/nuxt-service-module', {
  httpClient: 'plugins/axios'
}]
```

And in `@/plugins/axios.js`
```js
const axios = require('axios')
export default axios // or module.exports = axios
```

## Usage
1. Create `service` folder in your root directory
2. Add service by creating js file - for example: `@/service/books.js` will create `books` service
```js
export default httpClient => ({
  getAll () {
    return httpClient.get('/books')
  },
  getById (id) {
    return httpClient.get('/books?id=' + id)
  }
})
```
3. `books` service is now accessible all over the app:
 - Components: `this.$service.books.getAll()`
 - Vuex actions: `this.app.$service.books.getAll()`
 - The Context: `ctx.$service.books.getAll()`


## Contributing
Want to help improve this module? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
