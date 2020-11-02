import Vue from 'vue'
import App from './App'

import $H from './common/request.js'
Vue.prototype.$H = $H
//引入Vuex并挂载在Vue原型e
import store from './store/index.js'
Vue.prototype.$store=store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
