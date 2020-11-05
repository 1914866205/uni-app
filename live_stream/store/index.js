import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket-io.js'


Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
	},
	actions: {
		//连接socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl, {
				query: {},
				transports: ['websocket'],
				timeout: 5000
			})
			//全局事件，用来监听在线人数
			let onlineEvent = (e) => {
				uni.$emit('live', {
					type: "online",
					data: e
				})
			}
			//全局事件，用来监听发送弹幕
			let commentEvent = (e) => {
				uni.$emit('live', {
					type: "comment",
					data: e
				})
				console.log("收到后端弹幕消息" + e.data)
			}

			//全局事件，用来监听发送礼物
			let giftEvent = (e) => {
				uni.$emit('live', {
					type: "gift",
					data: e
				})
				console.log("收到后端礼物消息"+JSON.stringify(e))
			}

			//监听连接
			S.on('connect', () => {
				console.log('socket已连接')
				state.socket = S
				//测试推送一条消息到后端
				// S.emit('test', '测试socket连接')
				//scoket.io唯一链接id，可以监控这个id实现点对点通讯
				const {
					id
				} = S

				//监听来自服务器端的消息
				S.on(S.id, (e) => {
					let d = e.data
					if (d.action === 'error') {
						let msg = d.payload
						return uni.showToast({
							title: msg,
							icon: 'none'
						})
					}
				})
				//监听在线用户信息
				S.on('online', onlineEvent)
				//监听弹幕信息
				S.on('comment', commentEvent)
				//监听礼物接收
				S.on('gift', giftEvent)



			})
			//移除监听事件
			const removeListener = () => {
				if (S) {
					S.removeListener('online', onlineEvent)
					S.removeListener('comment', commentEvent)
					S.removeListener('gift', giftEvent)
				}
			}
			//监听失败
			S.on('error', () => {
				console.log('连接失败')
			})
			//监听端口
			S.on('disconnect', () => {
				console.log('已断开')
			})
		},



		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			console.log("-----------------" + 2)
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
			console.log("index当前token" + state.token)
			console.log("index当前user" + state.user)
		},
		initUser({
			state
		}) {
			let user = uni.getStorageSync('user')
			let token = uni.getStorageSync('token')
			if (user) {
				state.user = JSON.parse(user)
				state.token = token
			}
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
			console.log("index当前token" + state.token)
			console.log("index当前user" + state.user)
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
				uni.setStorage({
					key: "user",
					data: JSON.stringify(state.user)
				})
			})
		},
		authMethod({
			state
		}, callback) {
			console.log("验证是否登录" + state.token)
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login1/login1'
				})
			}
			console.log("验证通过")
		}

	}
})
