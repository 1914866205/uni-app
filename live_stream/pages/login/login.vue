<!-- <template>
	<view class="container">
		<view class="flex align-center justify-center" style="height: 70rpx;">
			<text style="font-size: 40rpx;" class="text-light">{{this.account===true?'验证码登录':'账号密码登录'}}</text>
		</view>

		<view v-if="!account">
			<view class="px-3">
				<input type="text" v-model="form.username" class="bg-light px-3 mb-4 font rounded" placeholder="请输入昵称/手机号/邮箱" style="height: 100rpx;" />
				<view class="flex border-bottom">
					<input type="text" v-model="form.password" class="bg-light px-3 mb-4 font " placeholder="请输入密码" style="height: 100rpx;width: 70%;" />
					<text class="bg-light border-right p-3 " style="height: 40rpx;font-size: small;width: 35%;color: #494F54;">忘记密码</text>
				</view>
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
				<view class="flex border-bottom">
					<text class="bg-light border-right p-3 " style="height: 40rpx;font-size: small;">+86</text>
					<input type="text" v-model="this.phone" class="bg-light px-3 mb-4 font " placeholder="手机号" style="height: 100rpx;width: 80%;" />
				</view>


				<view class="flex border-bottom">
					<input type="text" v-model="this.code" class="bg-light px-3 mb-4 font " placeholder="请输入验证码" style="height: 100rpx;" />
					<text class="bg-light border-right p-3 " style="height: 40rpx;font-size: small;width: 35%;color: #494F54;"@click="sendcode">{{this.show}}</text>
				</view>
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
				sendcodeflag: true,
				show: "点击发送验证码",
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
			changeFlag() {
				if (!this.sencodeflag) {
					let i = 10
					setInterval(() => {
						if (i > 0) {
							i--
							this.show = i + ' s 后再次发送';
						} else {
							this.sendcodeflag=== true
							this.show = "点击发送验证码"
						}
					}, 1000)
				}
			},
			sendcode() {
				this.sendcode = !this.sendcode
				this.changeFlag()
				/**
				 * 验证码登录流程
				 * 前端：把手机号传给后端
				 * 后端：生成验证码，存储在redis里
				 * 阿里云：发送验证码给用户名
				 * 前端：把手机号和验证码一起发给后端
				 * 后端：登录判断
				 */
				this.$H.post('/sendcode',this.phone).then(res=>{
					uni.showToast({
						title: '请注意查收验证码',
						icon: 'none'
					});
				})
			},
			change() {
				this.account = !this.account
			},
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			submit() {
				let msg = this.type === 'login' ? '去登录' : '注册'
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
 -->