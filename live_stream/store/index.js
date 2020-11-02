import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		user:null,
		token: null,
	},
	actions: {

		// logout({
		// 	state
		// }) {
		// 	$H.post('/logout', {}, {
		// 		token: true
		// 	})
		// 	state.user = null
		// 	state.token = null
		// 	uni.removeStorageSync('user')
		// 	uni.removeStorageSync('token')
		// 	uni.reLaunch({
		// 		url: '/pages/login/login'
		// 	})
		// },
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
	}
})
