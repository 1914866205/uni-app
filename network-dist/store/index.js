import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js'
export default new Vuex.Store({
	state: {
		//记录上传任务和下载任务
		uploadList: [],
		downlist: [],
		user: {
			"id": 3,
			"username": "ntt123",
			"nickname": "",
			"email": "",
			"avatar": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=261409204,1345114629&fm=26&gp=0.jpg",
			"phone": "",
			"sex": "男",
			"desc": "",
			"total_size": 10485780,
			"used_size": 4497,
			"created_time": "2020-10-23T09:26:36.000Z",
			"updated_time": "2020-10-24T17:14:51.000Z",
		},
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJudHQxMjMiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwicGFzc3dvcmQiOiJiY2IxNWY4MjE0NzliNGQ1NzcyYmQwY2E4NjZjMDBhZDVmOTI2ZTM1ODA3MjA2NTljYzgwZDM5YzlkMDk4MDJhIiwiYXZhdGFyIjoiaHR0cHM6Ly9zczEuYmRzdGF0aWMuY29tLzcwY0Z2WFNoX1ExWW54R2twb1dLMUhGNmhoeS9pdC91PTI2MTQwOTIwNCwxMzQ1MTE0NjI5JmZtPTI2JmdwPTAuanBnIiwicGhvbmUiOiIiLCJzZXgiOiLnlLciLCJkZXNjIjoiIiwidG90YWxfc2l6ZSI6MTA0ODU3NjAsInVzZWRfc2l6ZSI6NDQ5MywiY3JlYXRlZF90aW1lIjoiMjAyMC0xMC0yM1QwOToyNjozNi4wMDBaIiwidXBkYXRlZF90aW1lIjoiMjAyMC0xMC0yNFQxNzoxNDo1MS4wMDBaIiwiaWF0IjoxNjAzNjgxMzM3fQ.uq-mXBi6HFN0xEwiGwtqqpRe4jAhZJyxxMYdCNiLu8A",
	},
	actions: {
		initList({state}) {
			if (state.user) {
				// 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
				let d = uni.getStorageSync("downlist_" + state.user.id)
				let u = uni.getStorageSync("uploadList_" + state.user.id)
					state.downlist = d ? JSON.parse(d) : []
					state.uploadList = u ? JSON.parse(u) : []
			}
		},
		//创建一个上传任务
		createUploadJob({state},obj){
			//添加到上传队列的最前面
			state.uploadList.unshift(obj)
			//异步设置本地存储，记录键值对为 上传者和上传内容
			uni.setStorage({
				key:"uploadList_"+state.user.id,
				data:JSON.stringify(state.uploadList)
			})
		},
		//更新上传任务
		updateUploadJob({state},obj){
			//在上传队列中查找该用户的上传任务
			let i =state.uploadList.findIndex(item=>item.key===obj.key)
			//如果存在
			if(i!==-1){
				//更新proress属性的值和上传状态的值
				state.uploadList[i].progress=obj.progress
				state.uploadList[i].status=obj.status
				//异步更新本地存储
				uni.setStorage({
					key:"uploadList_"+state.user.id,
					date:JSON.stringify(state.uploadList)
				})
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
