<template>
	<view class="container">
		<view class="flex align-center justify-center" style="height: 70rpx;">
			<text style="font-size: 40rpx;" class="text-light">{{this.account===true?'验证码登录':'账号密码登录'}}</text>
		</view>

		<view v-if="!account">
			<view class="px-3">
				<input type="text" v-model="form.username" class="bg-light px-3 mb-4 font rounded" placeholder="请输入昵称/手机号/邮箱" style="height: 100rpx;" />
				<input type="text" v-model="form.password" class="bg-light px-3 mb-4 font rounded" placeholder="请输入密码" style="height: 100rpx;" />
				<input v-if="type!='login'" type="text" v-model="form.repassword" class="bg-light px-3 mb-4 font rounded"
				 placeholder="请输入确认密码" style="height: 100rpx;" />
			</view>
			<view class="p-3 flex align-center justify-center" @click="submit">
				<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover">
					<text class="text-white font-md">{{type==='login'?'登录':'注册'}}</text>
				</view>
			</view>

		</view>
		<view v-else>
			<view class="px-3">
				<input type="text" v-model="this.phone" class="bg-light px-3 mb-4 font rounded" placeholder="手机号" style="height: 100rpx;" />
				<input type="text" v-model="this.code" class="bg-light px-3 mb-4 font rounded" placeholder="请输入验证码" style="height: 100rpx;" />
			</view>
			<view class="p-3 flex align-center justify-center" @click="submit">
				<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover">
					<text class="text-white font-md">{{type==='login'?'登录':'注册'}}</text>
				</view>
			</view>
		</view>

		<view class="flex align-center justify-center">
			<text class="text-light-muteds font p-2" @click="change">{{this.account===false?'验证码登录':'手机号登录'}}</text>
			<text class="text-light-muteds font p-2">|</text>
			<text class="text-light-muteds font p-2">登录遇到问题</text>
		</view>

		<view class="flex align-center justify-center">
			<text class="text-light-muteds font p-2" @click="changeType">{{type==='login'?'注册账号':'去登录'}}</text>
		</view>
		<text class="justify-center flex" style="color: #d4d4d4;font-size: small;">———社交账号登录———</text>
		<view class="justify-center flex">
			<image src="../../static/weixin.png" />
			<image src="../../static/qq_48px.png">
				<image src="../../static/weibo_48px.png" />

		</view>
		<text class="justify-center flex" style="color: #d4d4d4;font-size: smaller;">注册即代表同意<text style="color: #249df8">
				《XXX社区协议》</text></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				account: true,
				type: "login",
				form: {
					username: "",
					password: "",
					repassword: ""
				}
			}
		},
		methods: {
			change() {
				this.account = !this.account
				console.log(this.account)
			},
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			submit() {
				let msg = this.type === 'login' ? '去登录' : '注册'
				console.log(msg)
				console.log(this.form)
				this.$H.post('/' + this.type, this.form).then(res => {
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					if (this.type === 'reg') {
						this.changeType()
						this.form = {
							username: "",
							password: "",
							repassword: ""
						}
					} else {
						this.$store.dispatch('login', res)
						uni.navigateBack({
							delta: 1
						});
					}
				})
				uni.switchTab({
					url: '../index/index'
				})

			}
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		height: 100vh;
		margin: 0;
		padding: 100rpx 0 0 0;
		background-size: cover;
		background-image: linear-gradient(to bottom, #BA7ACE 0%, #8745FF 100%);
	}
</style>
