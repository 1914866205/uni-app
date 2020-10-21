<template>
	<view>
		<!-- 自定义导航栏 -->
		<view>
			<!-- 驼峰式自动转换为中划线式 -->
			<!-- 顶部 -->
			<uni-status-bar>
				<!-- 此处不为rpx -->
				<view style="height: 44px;" class="flex border-bottom align-center">
					<view class="flex-1 flex">
						<!-- ml  margin left 32 -->
						<text class="font-md ml-3">首页</text>
					</view>
					<view class="flex-1 flex justify-center"></view>
					<view class="flex-1 flex justify-end">
						<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
							<text class="iconfont icon-zengjia"></text>
						</view>
						<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
							<text class="iconfont icon-gengduo"></text>
						</view>
					</view>
				</view>
			</uni-status-bar>
		</view>
	</view>

</template>


<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {

			}
		},
		onLoad() {}
	}
</script>

<style>

</style>
