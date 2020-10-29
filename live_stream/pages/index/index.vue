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
			<show-list class="list-item" v-for="(item,index) in showlists" :key='index' :item="item" @click="openLive()">
			</show-list>
		</view>


	</view>
</template>

<script>
	import showList from '@/components/list/showlist.vue'
	export default {
		data() {
			return {
				showlists: [
					
					{
					bg: 'https://i0.hdslb.com/bfs/archive/734ebccdc06023ea6a41a5aa8a5334fba6229c31.jpg@336w_190h.webp',
					shower: 9124,
					hot: 999,
					isLive: true
				}, 
				{
					bg: 'https://i2.hdslb.com/bfs/archive/496dca5fb2714fd47ea607a68b66f428192495a3.jpg@321w_201h_1c.webp',
					shower: 24,
					hot: 9,
					isLive: false
				}, 
				{
					bg: 'https://i1.hdslb.com/bfs/archive/6dd0e762ebc964e3a1677f27ee7fde1daa0f7f63.jpg@200w_125h_1c.webp',
					shower: 124,
					hot: 45,
					isLive: true
				}, 		
				{
					bg: 'https://i1.hdslb.com/bfs/archive/09756d56996c13b5f140a1808fd74f1cc8fc8b77.jpg@200w_125h_1c.webp',
					shower: 12452,
					hot: 999,
					isLive: true
				}, 
				{
					bg: 'https://i0.hdslb.com/bfs/archive/76664e36a8a4621bceadac087101e3f55af7d877.jpg@412w_232h_1c',
					shower: 74,
					hot: 12,
					isLive: true
				}, 
				{
					bg: 'https://i0.hdslb.com/bfs/bangumi/image/0d5843ee93728eebeed99b2a9fe69e1e349465e7.png@87w_88h_1c_100q.webp',
					shower: 7524,
					hot: 999,
					isLive: true
				}, 
				]
			}
		},
		props: {
			item:Object,
		},
		components: {
			showList
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

</style>
