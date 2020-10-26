<template>
	<view style="height: 100vh;" class="flex flex-column">
		<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in tabBars" :key="index"
			 :class="index===tabIndex?'text-main':''" @click="changeTab(index)">
				<!-- 标签页名称 -->
				<text class="font-md">{{item.name}}</text>
				<!-- 标签页下划线 -->
				<text style="height: 8rpx;width: 140rpx;" class="rounded" :class="tabIndex===index?'bg-main':'bg-white'"></text>
			</view>
		</view>

		<!-- swiper内容随着上面tab的切换联动 -->
		<swiper :duration="250" class="flex-1 flex" :current="tabIndex" @change="changeTab($event.detail.current)">
			<swiper-item class="flex-1 flex" v-for="(item,index) in tabBars" :key="index">
				<scroll-view scroll-y="true" class="flex-1">
					<!-- 下载列表 -->
					<template v-if="index===0">
						<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">
							文件下载至: storage/xxxx/xxxx
						</view>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							下载中{{downing.length}}
						</view>
						<!-- 因为下面同级还有f-list中绑定了key和index，会冲突，所以要给他们加上不同的后缀区分，否则报错 -->
						<f-list v-for="(item,index) in downing" :key="'i'+index" :item="item" :index="index">
							<view style="height: 70rpx;" class="flex align-center text-main">
								<text class="iconfont icon-zanting"></text>
								<text class="ml-1">{{item.progress}}%</text>
							</view>
							<!-- 进度条组件,uniapp自带的无需引入，percent属性绑定下载百分比数值 -->
							<progress slot="bottom" :percent="item.progress" activeColor="#009CFF" :stroke-width="4" />
						</f-list>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							下载完成({{downed.length}})
						</view>
						<f-list v-for="(item,index) in downed" :key="'d'+index" :item="item" :index="index" :showRight="false"></f-list>
					</template>

					<!-- 上传列表 -->


					<template v-else>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							上传中{{uploading.length}}
						</view>
						<f-list v-for="(item,index) in uploading" :key="'i'+index" :item="item" :index="index">
							<view style="height: 70rpx;" class="flex align-center text-main">
								<text class="iconfont icon-zanting"></text>
								<text class="ml-1">{{item.progress}}%</text>
							</view>
							<progress slot="bottom" :percent="item.download" activeColor="#009CFF" :stroke-width="4" />
						</f-list>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							上传完成({{uploaded.length}})
						</view>
						<f-list v-for="(item,index) in uploaded" :key="'d'+index" :item="item" :index="index" :showRight="false"></f-list>
					</template>



				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import fList from '@/components/common/f-list.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			fList
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '下载列表'
					},
					{
						name: '上传列表'
					}
				],
				title: 'my',
				list: [{
						type: 'dir',
						name: '我的笔记',
						create_time: '2020-10-21 08:00',
						checked: false,
						download: 100
					},
					{
						type: 'image',
						name: '小姐姐.jpg',
						create_time: '2020-10-21 08:00',
						data: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3724743039,3668514198&fm=26&gp=0.jpg',
						checked: false,
						download: 50
					}
				]
			}
		},
		onLoad() {

		},
		computed: {
			...mapState({
				uploadList: state => state.uploadList,
				downlist: state => state.downlist
			}),
			uploading() {
				return this.uploadList.filter(item => {
					return item.progress < 100;
				})
			},
			uploaded() {
				return this.uploadList.filter(item => {
					return item.progress === 100;
				})
			},
			downing() {
				return this.downlist.filter(item => {
					return item.progress < 100;
				})
			},
			downed() {
				return this.downlist.filter(item => {
					return item.progress = 100;
				})
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			},
			onNavigationBarButtonTab(){
				uni.showModel({
					content:'是否要清除传输记录？',
					success:res=>{
						if(res.confirm){
							this.$store.dispatch('clearList');
							uni.showToast({
								title:'清除成功',
								icon:'none'
							})
						}
					}
				})
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
