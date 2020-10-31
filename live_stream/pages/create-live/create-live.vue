<template>
	<view>
		<live-pusher id='livePusher' ref="livePusher" :url="url" :mode="mode" :enable-camera="enableCamera" :auto-focus="true"
		 :device-position="position" :beauty="beauty" :whiteness:"whiteness" aspecet="9:16" @statechange="statechange"
		 @netstatus="netstatus" @error="error" :style="'height:'+windowHeight+'px;'" style="width:750rpx;">
		</live-pusher>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '', //直播服务器地址 ，暂空
				mode: 'SD', //标清模式
				enableCamera: 'back', //默认摄像头
				beauty: 0, //美颜度
				whiteness: 0, //美白度
				windowHeight: 0, //窗体高度
				context: null / 上下文
			}
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			this.windowHeight = res.windowHeight
		},
		//监听页面初次渲染完成，注意如果渲染速度快，会在页面直接进入动画前触发
		onReady() {
			this.context = uni.createLivePusherContext('livePusher', this)
			this.startPreview()
		},
		methods: {
			//开启预览
			startPreview() {
				this.context.startPreview({
					success: (e) => {
						console.log(e);
					}
				})
			},
			//直播状态的变化
			statechange(e) {
				console.log(e)
			},
			//直播网络的变化
			netstatus(e) {
				console.log(e)
			},
			//直播出错
			error(e) {
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
