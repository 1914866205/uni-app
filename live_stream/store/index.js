import Vue from 'vue'
import Vuex from 'vuex'
import $H from '../common/request.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		user: null,
		token: null,
	},
	actions: {
		//需要登录才能访问的方法，这个只能放在Vuex里才能生效
		authMethod({
			state
		}, callback) {
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login1/login1'
				})
			}
		}
		,
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
			// console.log(state.user===null?'user为空':state.user)
			// console.log(state.token===null?'token为空':state.token)
			uni.reLaunch({
				url: '/pages/login/login'
			})
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStart({
					key: "user",
					data: JSON.stringify(state.user)
				})
			})
		}
	}
})
