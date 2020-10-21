<template>
	<view>
		<view class="flex align-center justify-between m-2" style="height: 160rpx;">
			<!-- 头像 -->
			<view style="width: 160rpx;height: 160rpx;">
				<image src="../../static/default.jpg" style="width: 160rpx;height: 160rpx;"></image>
			</view>
			<!-- 昵称等信息 -->
			<view class="flex-column flex-5 m-2">
				<view class="flex-column flex-5 m-2">
					<view><text class="font-md font-weight-bold">昵称</text></view>
				</view>
				<view class="flex">
					<text class="text-secondary font-sm mr-2">总帖子10</text>
					<text class="text-secondary font-sm">今日发帖0</text>
				</view>
			</view>
			<view><text class="font-sm"></text></view>
		</view>
		<!-- 四个标签 -->
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in list" :key=index>
				<text class="font-lg font-weight-bold">{{item.value}}</text>
				<text class="font text-muted">{{item.key}}</text>
			</view>
		</view>
		<!-- 图片 -->
		<view class="m-3" style="height:160rpx">
			<image src="../../static/image/banner3.jpg" style="height: 160rpx;width: 98%;"></image>
		</view>
		<!-- 标签页 -->
		<view class="flex flex-column" style="height: 360rpx;">
			<listItem title="浏览历史" showExtraIcon>
				<text slot="icon" class="iconfont icon-liulan"></text>
			</listItem>
			<listItem title="社区认证" showExtraIcon>
				<text slot="icon" class="iconfont icon-huiyuanvip"></text>
			</listItem>
			<listItem title="审核帖子" showExtraIcon>
				<text slot="icon" class="iconfont icon-keyboard1"></text>
			</listItem>
		</view>
	</view>
</template>
<script>
	import listItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	const list = [{
			key: '帖子',
			value: '5'
		},
		{
			key: '动态',
			value: '3'
		},
		{
			key: '评论',
			value: '7'
		}, {
			key: '粉丝',
			value: '0'
		}
	]
	export default {
		data() {
			return {
				list: []
			}
		},
		components: {
			listItem
		},
		onLoad() {
			this.list = list
		}
	}
</script>
