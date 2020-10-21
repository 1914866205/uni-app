<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar>
			<text slot="left" class="font-md ml-3">首页</text>
			<template slot="right">
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
					<text class="iconfont icon-zengjia"></text>
				</view>
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</template>
		</nav-bar>	
		<view class="pt-2" style="height: 1000px;background-color: #d7ebfd;">
				<view class=" flex m-auto rounded-circle bg-hover-light" style="width: 90%;">
					<text class="ml-4 iconfont icon-sousuo pr-2"></text>
					<input placeholder="搜索网盘文件" />
				</view>
		</view>
	</view>
</template>


<script>
	// import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import navBar from '@/components/common/nav-bar.vue'
	export default {
		components: {
			// uniStatusBar
			navBar
		},
		data() {
			return {

			}
		},
		onLoad() {}
	}

	/*
	<template>
		<view>
			<!--  自定义导航栏 -->
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
	
	*/
</script>

<style>

</style>
