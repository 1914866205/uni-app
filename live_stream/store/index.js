import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $H from '../common/request.js'
export default new Vuex.Store({
	state: {
		user:null,
		token:null,
	},
	actions:{
		logout({state}) {
			$H.post('/logout',{},{
				token:true,
				toast:false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		initUser({state}){
			let user = uni.getStorageSync('user')
			let token = uni.getStorageSync('token')
			if(user){
				state.user = JSON.parse(user)
				state.token = token
			}
		},
		login({state},user){
			state.user = user
			state.token = user.token
			
			uni.setStorageSync('user',JSON.stringify(user))
			uni.setStorageSync('token',user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info',{
				token:true,
				noJump:true,
				toast:false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key:"user",
					data:JSON.stringify(state.user)
				})
			})
		},
		authMethod({
			state
		},callback){
			if(!state.token){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				});
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}

	}
})