<template>
	<!-- 根据nightStatus的值切换白天和黑夜模式 -->
	<view style="height: 100vm;" :class="nightStatus?'nightTheme':''">
		<!-- 歌曲信息 -->
		<view class="d-inline-block w-100 text-center py-4">
			<view>
				<text class="font">歌曲：</text>
				<text class="font-weight-bold">{{audioName}}</text>
			</view>
			<view>
				<text class="font">歌手：</text>
				<text class="font-weight-bold">{{singerName}}</text>
			</view>
		</view>
		<!-- 歌曲图片 -->
		<view class="flex align-center justify-center" style="height: 420rpx;">
			<image src="../../static/img/20201031.jpg" lazy-load mode="widthFix" style="border-radius: 35rpx;box-shadow: 0 2rpx 6rpx 0;;">
			</image>
		</view>

		<!-- 进度部分 -->
		<view class="flex align-center justify-center font" style="color: #7a8388;height: 65rpx;">
			<!-- 播放时刻 -->
			<view>{{ currentTime | formatTime }}</view>
			<!-- 进度条部分 -->
			<view style="width: 500rpx;">
				<slider @change="sliderToPlay" @changing="sliderToPlay" block-size="16" activeColor="#e48267" backgroundColor="#eef2f3"
				 :max="durationTime" :value="currentTime" style="width: 350rpx;" />
			</view>
			<!-- 总时长 -->
			<view>{{ durationTime | formatTime }}</view>
		</view>
		<view>
			<!-- 按钮部分 -->
			<view class="flex align-center justify-center" style="padding-top: 60rpx;">
				<view class="mr-3">
					<my-icon iconId="icon-shangyixiang" iconSize="85"  @my-click="PreOrNext('pre')"></my-icon>
				</view>
				<view class="mx-5">
					<my-icon :iconId="playStatus ? 'icon-bofang' : 'icon-ziyuan'" iconSize="80"  @my-click="PlayOrPause"></my-icon>
				</view>
				<view class="mr-2">
					<my-icon iconId="icon-xiayixiang" iconSize="85" @my-click="PreOrNext('next')"></my-icon>
				</view>
			</view>

			<view class="flex align-center justify-center font text-light-black" style="padding-top: 100rpx;">
				<view class="flex flex-column align-center" @tap="chageStatus('listStatus')">
					<my-icon :iconId="!listStatus?'icon-icon--':'icon-liebiao'" iconSize="60"></my-icon>
					<text class="pt-1">播放列表</text>
				</view>
				<view class="flex flex-column align-center" style="padding: 0 80rpx;">
					<my-icon :iconId="!collectStatus?'icon-aixinfengxian':'icon-xihuan2'" iconSize="60"></my-icon>
					<text class="pt-1">收藏</text>
				</view>
				<view class="flex flex-column align-center" @tap="chageStatus('nightStatus')">
					<my-icon :iconId="!nightStatus?'icon-yejianmoshi':'icon-yueliang'" iconSize="60"></my-icon>
					<text class="pt-1">夜间模式</text>
				</view>
			</view>
		</view>

		<!-- 歌手具体信息 -->

		<view class="flex-bottom shadow p-4" style="height: 260rpx;border-radius: 3rpx;" v-if="!listStatus">
			<view class="flex justify-between" v-if="!listStatus">
				<view>
					<view>
						<text class="font">歌曲：</text>
						<text class="font-weight-bold">{{audioName}}</text>
					</view>
					<view>
						<text class="font">歌手：</text>
						<text class="font-weight-bold">{{singerName}}</text>
					</view>
				</view>
				<my-icon iconId="icon-jieshao" iconSize="65"></my-icon>
			</view>
			<view>
				<view class="font-md pt-2">歌手简介：</view>
				<view class="text-secondary w-100">{{singerSynopsis}}</view>
			</view>
		</view>
		<!-- 播放列表部分 -->
		<view class=" shadow mt-2 animated fadeInUp p-4" style="height: 550rpx;border-radius: 30rpx;" v-else>
			<scroll-view scroll-y style="height: 550rpx;">
				<block v-for="(item,index) in audioList" :key="item.id">
					<view class="align-center flex font px-2" style="height: 85rpx;" hover-class="bg-light" @tap="selectPlay(item.id)">
						<text class="flex-1 text-ellipsis">{{item.audioName}}</text>
						<text class="flex-1 text-ellipsis">{{item.singerName}}</text>
						<view class="flex-1 ml-3 flex align-center">
							<text class="mr-2">播放</text>
							<my-icon iconId="icon-bofangsanjiaoxing" style="margin-left: auto;" iconSize="40"></my-icon>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- 歌手简介弹层 -->
		<uni-popup ref="popup">
			<view class="px-2 shadow" style="width: 600rpx;height: 850rpx;border-radius: 40rpx;" :class="nightStatus?'nightTheme':'bg-white'"></view>
			<text class="font">{{singerSynopsis}}</text>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import unit from '@/common/unit.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				listStatus: false,
				collectStatus: false,
				nightStatus: false
			}
		},
		filters: {
			formatTime(num) {
				return unit.formatTime(num)
			}
		},
		computed: {
			//辅助函数
			//... 解构
			...mapState({
				durationTime: ({
					audio
				}) => audio.durationTime,
				currentTime: ({
					audio
				}) => audio.currentTime,
				audioList: ({
					audio
				}) => audio.audioList,
				playStatus: ({
					audio
				}) => audio.playStatus
			}),
			...mapGetters([
				'audioName',
				'singerName',
				'singerSynopsis'
			])
		},
		methods: {
			...mapMutations([
				'destruction'
			]),
			...mapActions([
				'init',
				'PlayOrPause',
				'PreOrNext',
				'sliderToPlay'
			]),
			//改变状态
			chageStatus(statusType) {
				this[statusType] = !this[statusType]
			},
			//展示歌手简介详情
			showSingerSynopsis() {
				this.$refs.popup.open()

			}
		},

		mounted() {
			this.init()
		},
		destroyed() {
			this.destruction()
		}
	}
</script>

<style>

</style>
