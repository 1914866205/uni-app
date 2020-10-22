<template>
	<view style="color:#0056B3">
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
		<view class="pt-2" style="height: 1000px;">
			<view class=" flex m-auto rounded-circle bg-hover-light" style="width: 90%;">
				<text class="ml-4 iconfont icon-sousuo pr-2"></text>
				<input placeholder="搜索网盘文件" />
			</view>
			<block v-for="(item,index) in list" :key="index">
				<file-folder-list :item="item" :index="index"></file-folder-list>
			</block>
		</view>
	</view>
</template>


<script>
	// import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import navBar from '@/components/common/nav-bar.vue'
	import fileFolderList from '@/components/list/flieFolderList.vue'
	const files = [{
			image: '/static/icons/folder_48px.png',
			filename: '我的笔记',
			time: 1603333049,
			checked: false
		},
		{
			image: '/static/icons/image_48px.png',
			filename: '风景.jpg',
			time: 160333049,
			checked: false
		},
		{
			image: '/static/icons/video_file_48px.png',
			filename: 'uniapp实战教程.mp4',
			time: 15976927,
			checked: false
		},
		{
			image: '/static/icons/notepad_48px.png',
			filename: '记事本.txt',
			time: 1540176927,
			checked: false
		},
		{
			image: '/static/icons/zip_48px.png',
			filename: '压缩包.rar',
			time: 1403373639,
			checked: false
		}
	]
	export default {
		components: {
			// uniStatusBar
			navBar,
			fileFolderList,
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = files;
		}
	}

	/*
	<template>
		<view>
		<!-- 	uni.request({
				url: 'http://localhost:7001/list',
				method: 'GET',
				success: res => {
					console.log(res.data.data)
				}
			}) -->
			
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
