import Vue from 'vue'
import App from './App'

import $H from './common/request.js'
Vue.prototype.$H = $H
//引入Vuex并挂载在Vue原型e
import store from './store/index.js'
Vue.prototype.$store=store

//权限验证，必须是登录后才能进入的页面
Vue.prototype.authJump=(options)=>{
	if(!store.state.token){
		uni.showToast({
			title:'请先登录',
			icon:'none'
		});
		return uni.navigateTo({
			url:'/pages/login/login.vue'
		})
	}
	uni.navigateTo(options)
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
