<template>
	<view class="flex bg-dark fixed-bottom content-around align-streth text-light bg-hover-light" style="height: 70px;">
		<navigator open-type="switchTab" url="/pages/index/index" style="width: 250rpx;" class=" flex align-center jusify-center bg-dark">
			发现
		</navigator>
		<view style="250rpx;" class="flex align-center jusify-center bg-dabger">
			<image src="../../static/logo.png" style="width: 60px;height: 60px;"></image>
		</view>
		<navigator open-type="switchTab" url="/pages/my/my" style="width: 250rpx;" class="flex align-center jusify-center bg-primary">
			我的
		</navigator>
	</view>
</template>

<script>
	export default{
		data(){
			return{};
		}
	}
</script>

<style>
</style>
