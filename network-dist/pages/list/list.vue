<template>
	<view style="height: 100vh;"class="flex flex-column">
		<view class="flex border-bottom border-light-secondary"
		style="height: 100rpx;">
		<view class="flex-1 flex flex-column align-center justify-center"
		v-for="(item,index) in tabBars" 
		:key="index" 
		:class="index===tabIndex?'text-main':''"
		@click="changeTab(index)"
		>
		<text class="font-md">{{item.name}}</text>
		<text style="height: 8rpx;width: 140rpx;"
		class="rounded"
		:class="tabIndex===index?'bg-main':'bg-white'"
		></text>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabBars:[
					{
						name:'下载列表'
					},
					{
						name:'上传列表'
					}
				],
				title: 'my'
			}
		},
		onLoad() {

		},
		methods: {
			changeTab(index){
				this.tabIndex=index;
			}
		}
	}
</script>

<style>
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
