<template>
	<view>
		<!-- <video src="rtmp://39.98.143.134:1935/live/exp" style="width: 100vw;height: 400rpx;" :autoplay="true" controls></video> -->
		<video src="rtmp://120.26.177.51:1935/live/exp" style="width: 100vw;height: 400rpx;" :autoplay="true" controls></video>
	</view>
</template>

<script>
	export default {}
</script>
</template>

<script>
	import tab from '../../components/common/tab.vue'
	export default {
		components: {
			tab
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
