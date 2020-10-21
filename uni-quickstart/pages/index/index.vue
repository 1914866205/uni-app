<template>
	<view class="uni-column">
		<!-- <view class="box1">
			<text>hello</text>
		</view>
		<view class="box2">
			<text class="iconfont icon-history" style="font-size: 27rpx;">hello</text>
		</view> -->
		<view class="uni-flex">
			<view style="margin:auto">
				<text style="padding-right: 20rpx;color:rgb(150,150,150);">关注</text>
				<text style="font-size:35rpx;color: #FF3333;font-weight: 600;">话题</text>
			</view>
			<text class="iconfont icon-bianji1" style="float: right;,width: 100rpx"></text>
		</view>
		<view>
			<text style="padding: 10rpx;">热门分类</text>
			<text style="float: right; color: #BBBBBB;">更多></text>
		</view>
		<view class="uni-row uni-flex" style="justify-content: space-around;">
			<view v-for="item,index in buttonList" style="margin-left: 1rpx;">
				<button size="mini">{{item}}</button>
			</view>
		</view>
		<hr />
		<view>
			<button style="border-radius: 10rpx;margin: 10rpx; background-color:rgb(245,244,242);"><text class="iconfont icon-sousuo"
				 style="color: rgb(150,150,150);">搜索话题</text></button>
		</view>
		<view>
			<image src="../../static/image/banner3.jpg" style="width:98%;height:300rpx;margin:1%;border-radius: 10rpx;"></image>
		</view>
		<view style="width: 100%; height: 20rpx;background-color: rgb(247,247,247);">
		</view>
		<!-- 最外层 -->
		<view>
			<text style="padding: 10rpx;">最近更新</text>
			<!-- 每个话题 -->
			<view v-for="item,index in talkList">
				<view class="uni-flex">
					<image :src="item.image" style="width: 150rpx;height:150rpx;border-radius: 15rpx;margin: 20rpx;"></image>
					<view>
						<text style="padding-top: 20rpx; font-weight: 600;">{{item.title}}</text>
						<view style="color: rgb(150,150,150); font-size: 24rpx;">
							<view>
								<text>{{item.decoration}}</text>
							</view>
							<text style="padding-right: 10rpx;">动态 {{item.duna}}</text>
							<text>今日 {{item.today}}</text>
						</view>
					</view>
				</view>
			</view>
			<hr />
			<!-- 		<view class="uni-row uni-flex" style="justify-content: space-around;">
				<text class="iconfont icon-shouye">社区</text>
				<text class="iconfont icon-faxian">动态</text>
				<text class="iconfont icon-xiaoxi">消息</text>
				<text class="iconfont icon-wode">我的</text>
			</view> -->
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				buttonList: ["关注", "推荐", "体育", "热点", "财经", "娱乐"],
				talkList: [{
						image: "../../static/image/1.jpeg",
						title: "#话题名称哈哈哈",
						decoration: "话题描述",
						duna: 42,
						today: 0
					},
					{
						image: "../../static/image/1.jpeg",
						title: "#话题名称",
						decoration: "话题描述",
						duna: 12,
						today: 0
					},
				]

			}
		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style scoped>
	.box1 {
		width: 375rpx;
		height: 80rpx;
		background-color: #0A98D5;
		color: #FFFFFF;
	}

	.box2 {
		width: 375rpx;
		height: 80rpx;
		background-color: #aaff7f;
		color: #FFFFFF;
	}

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
