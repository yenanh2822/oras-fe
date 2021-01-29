import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export const maxLength = {
  postMax: 100,
  jdLength: 5000,
  priceLength: 16,
  emailLength: 100,
  nameLength: 100,
  passwordLength: 20,
  phoneLength: 13,
  compNameLength: 200,
  compDesLength: 1000,
  locationLength: 200,
  taxCodeLength: 13,
  titleLength: 200,
  pkgNameLength: 50,
  pkgDesLength: 500,
  pkgTagLength: 50,
  cmtLength: 500
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
