<template>
	<view>
		<view>
			<image src="../../static/tabbar/3.jpg" class="img" style="width: 750rpx;height: 180rpx;"></image>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200" style="width: 750rpx;height: 250rpx;">
			<swiper-item>
				<image src="../../static/tabbar/1.jpg" style="width: 750rpx;height: 250rpx;"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/tabbar/2.jpg" style="width: 750rpx;height: 250rpx;"></image>
			</swiper-item>
		</swiper>
		<!-- 列表 -->	
		<view class="flex flex-wrap">
			<view class="list-item" v-for="i in 10" :key='i' @click="openLive">
				<image src="../../static/bg.jpg" style="width: 365rpx;height: 365rpx;" class="rounded" mode="aspectFill"></image>
				<view class="rounded-circle px-2 flex align-center" style="position:absolute;
				 left: 15rpx;top:15rpx;background-color: rgba(0,0,0,0.4);">
					<!-- 观看人数 -->
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text class="text-white font">13597</text></view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;
				 top: 15rpx;background-color: rgba(0,0,0,0.4);">
					<text class="font-sm text-white">人气：
						<text class="text-white font-sm">999kg</text>
					</text>
				</view>
				<!-- 直播状态 -->
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,0.4);">
					<text style="width: 20rpx;height: 20rpx;" class="rounded-circle bg-danger mr-1"></text>
					<text class="text-white font-sm">直播中</text>
				</view>
			</view>a
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			openLive() {
				console.log("跳转页面")
				uni.navigateTo({
					url: '../live/live'
				})
			}
		}
	}
</script>

<style>
	.list-item {
		width: 375rpx;
		heith: 375rpx;
		padding: 5rpx;
		box-sizing: border-box;
		position: relative;
	}
</style>
