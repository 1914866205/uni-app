import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js'
export default new Vuex.Store({
	state: {
		user: {
			"id": 3,
			"username": "ntt123",
			"nickname": "",
			"email": "",
			"avatar": "",
			"phone": "",
			"sex": "男",
			"desc": "",
			"total_size": 10485780,
			"used_size": 4497,
			"created_time": "2020-10-23T09:26:36.000Z",
			"updated_time": "2020-10-24T17:14:51.000Z",
		},
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJudHQxMjMiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwicGFzc3dvcmQiOiJiY2IxNWY4MjE0NzliNGQ1NzcyYmQwY2E4NjZjMDBhZDVmOTI2ZTM1ODA3MjA2NTljYzgwZDM5YzlkMDk4MDJhIiwiYXZhdGFyIjoiIiwicGhvbmUiOiIiLCJzZXgiOiLnlLciLCJkZXNjIjoiIiwidG90YWxfc2l6ZSI6MTA0ODU3NjAsInVzZWRfc2l6ZSI6NDQ5MywiY3JlYXRlZF90aW1lIjoiMjAyMC0xMC0yM1QwOToyNjozNi4wMDBaIiwidXBkYXRlZF90aW1lIjoiMjAyMC0xMC0yNFQxNzoxNDo1MS4wMDBaIiwiaWF0IjoxNjAzNjM2MjAyfQ.DNWki-LRnZm4dRSesQ-SoxIG6-guWKzbiQhtl7xIXNQ",
	},
	actions: {
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
		initUser({
			state
		}) {
			let user = uni.getStorageSync('user')
			if (user) {
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},
		updateSize({
			state
		}, e) {
			state.user.total_size = e.total_size
			state.user.used_size = e.used_size
		}
	}
})
