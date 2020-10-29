<template>
	<view @click="$emit('click')" style="width: auto;">
		<image :src="item.bg" style="width: 365rpx;height: 365rpx;" class="rounded" mode="aspectFill"></image>
		<view class="rounded-circle px-2 flex align-center" style="position:absolute;
				 left: 15rpx;top:15rpx;background-color: rgba(0,0,0,0.4);">
			<!-- 观看人数 -->
			<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
			<text class="text-white font">{{item.shower}}</text></view>
		<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;
				 top: 15rpx;background-color: rgba(0,0,0,0.4);">
			<text class="font-sm text-white">人气：
				<text class="text-white font-sm">{{item.hot}}</text>
			</text>
		</view>
		<!-- 直播状态 -->
		<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,0.4);">
			<text style="width: 20rpx;height: 20rpx;" class="rounded-circle  mr-1" :class="item.isLive?'bg-success':'bg-danger'"></text>
			<text class="text-white font-sm">{{item.isLive?"直播中":"已下播"}}</text>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			item:Object
		},
	}
</script>

<style>
</style>
