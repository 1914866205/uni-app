<template>
	<view style="color:#0056B3">
		<!-- 自定义导航栏 -->
		<nav-bar>
			<template v-if="checkCount===0">
				<text slot="left" class="font-md ml-3">首页</text>
				<template slot="right">
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
						<text class="iconfont icon-gengduo"></text>
					</view>
				</template>
			</template>
			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkCount}}个</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
			</template>
		</nav-bar>
		<view class="pt-2" style="height: 1000px;">
			<view class=" flex m-auto rounded-circle bg-hover-light" style="width: 90%;">
				<text class="ml-4 iconfont icon-sousuo pr-2"></text>
				<input placeholder="搜索网盘文件" />
			</view>
			<!-- 	<block v-for="(item,index) in list" :key="index">
				<file-folder-list :item="item" :index="index"></file-folder-list>
			</block> -->
			<!-- 列表 -->
			<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @select="select"></f-list>
		</view>
		<!-- 底部操作条 -->
		<!-- 选择更个数大于0才会出现这个操作条 -->
		<view v-if="checkCount>0">
			<!-- 这里要留一定的高度，因为底部操作条需要被固定在底部，并空出底部tabbar高度的地方 -->
			<view style="height: 115rpx;"></view>
			<!-- 操作条容器的样式，高度，颜色，固定在底部，垂直方向拉升效果 -->
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<!-- 根据元素个数等分容器，所以要么四等分，要么二等分，
			行高的修改可以让图标和文字之间的距离变的合理，点击还会变色 :hover-class-->
				<view class="flex-1 flex flex-column align-center justify-center" style="line-height: 1.5;" v-for="(item,index) in actions"
				 :key="index" hover-class="bg-hover-primary">
					<text class="iconfont" :class="item.icon"></text>
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	// import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import navBar from '@/components/common/nav-bar.vue'
	import fileFolderList from '@/components/list/flieFolderList.vue'
	import fList from '@/components/common/f-list.vue'
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
	const list = [{
			type: 'dir',
			name: '我的笔记',
			create_time: '2020-10-21 08:00',
			checked: false
		},
		{
			type: 'image',
			name: '风景.jpg',
			create_time: '2020-10-21 08:00',
			checked: false
		},
		{
			type: 'video',
			name: 'uniapp实战教程.mp4',
			create_time: '2020-10-21 08:00',
			checked: false
		},
		{
			type: 'text',
			name: '记事本.txt',
			create_time: '2020-10-21 08:00',
			checked: false
		},
		{
			type: 'none',
			name: '压缩包.rar',
			create_time: '2020-10-21 08:00',
			checked: false
		}
	]

	export default {
		components: {
			// uniStatusBar
			navBar,
			fileFolderList,
			fList
		},
		data() {
			return {
				list: []
			}
		},
		props: {
			item: Object,
			index: [Number, String]
		},
		onLoad() {
			// this.list = files;
			this.list = list;
		},
		methods: {
			select(e) {
				//接收到子组件传递过来的索引选中状态，将对应的list中的数据更新
				this.list[e.index].checked = e.value
			},
			// 全选/取消全选
			handleCheckAll(checked) {
				this.list.forEach(item => {
					item.checked = checked;
				})
			}
		},
		computed: {
			//选中列表
			checkList() {
				return this.list.filter(item => item.checked);
			},
			//选中数量
			checkCount() {
				return this.checkList.length;
			},
			//操作菜单
			actions() {
				if (this.checkCount > 1) {
					return [{
						icon: "icon-xiazai",
						name: "下载"
					}, {
						icon: "icon-shanchu",
						name: "删除",
					}]
				}
				return [{
					icon: "icon-xiazai",
					name: "下载"
				}, {
					icon: "icon-fenxiang-1",
					name: "分享"
				}, {
					icon: "icon-shanchu",
					name: "删除",
				}, {
					icon: "icon-chongmingming",
					name: "重命名",
				}]
			}
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
