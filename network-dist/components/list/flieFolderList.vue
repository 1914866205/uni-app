<template>
	<!-- 外边框 -->
	<!-- flex 行内块，不独占一行 align-center 垂直居中-->
	<!-- p-2 padding 2  border-bottom 下边框线-->
	<view class="flex m-1  p-2 border-bottom">
		<!-- 左侧图片 -->
		<view class="p-1 pr-2">
			<image :src="item.image" style="width: 80rpx;height: 80rpx;"></image>
		</view>
		<!-- 中部 -->
		<view>
			<!-- 名称 -->
			<view><text class="font-weight-bold">
					{{item.filename}}
				</text>
			</view>
			<!-- 时间 -->
			<view>{{item.time | formatTime}}</view>
		</view>
		<!-- 右侧 -->
		<view class="ml-auto flex align-center justify-center" style="width: 50rpx;height: 50rpx;" v-on:click="item.checked=!item.checked">
			<text v-if="!item.checked" class="rounded-circle border" style="height: 25rpx;width: 25rpx;"></text>
			<text v-else class="iconfont icon-xuanze-yixuan text-primary" style="font-size: 40rpx;"></text>
		</view>
	</view>
</template>

<script>
	import $T from '@/common/time.js'
	export default {
		props: {
			item: Object,
			index: Number
		},
		//过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		}
	}
</script>

<style>
</style>
