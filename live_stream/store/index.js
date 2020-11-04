import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket-io.js'


Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		user:null,
		token:null,
		socket:null
	},
	actions:{
		//连接socket
		connectSocket({
			state,
			dispatch
		}){
			const S=io($C.socketUrl,{
				query:{},
				transports:['websocket'],
				timeout:5000
			})
			
			//监听连接
			S.on('connect',()=>{
				console.log('已连接')
			})
			//监听失败
			S.on('error',()=>{
				console.log('连接失败')
			})
			//监听端口
			S.on('disconnect',()=>{
				console.log('已断开')
			})
		},
		
		
		
		logout({state}) {
			$H.post('/logout',{},{
				token:true,
				toast:false
			})
			console.log("-----------------"+2)
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
			console.log("index当前token"+state.token)
			console.log("index当前user"+state.user)
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
			console.log("index当前token"+state.token)
			console.log("index当前user"+state.user)
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
			console.log("验证是否登录"+state.token)
			if(!state.token){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				});
				return uni.navigateTo({
					url:'/pages/login1/login1'
				})
			}
			console.log("验证通过")
		}

	}
})