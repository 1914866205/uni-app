<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="ml-3 mt-3" @click="back"><text class="iconfont icon-guanbi text-main"></text></view>

		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">
			{{ status ? '手机验证码登录' : '账号密码登录' }}
		</view>

		<view class="px-2">
			<template v-if="!status">


				<!-- 	<view class="mb-2">
					<input type="text" v-model="form.username" placeholder="请输入用户名" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="form.password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">
						忘记密码？
					</view>
				</view> -->

				<view class="mb-2">
					<input type="text" v-model="form.username" placeholder="请输入用户名" class="border-bottom p-2" />

					<view class="mb-2 flex align-stretch">
						<input type="text" v-model="form.password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
						<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">
							忘记密码？
						</view>
					</view>

					<input v-if="type!='login'" type="text" v-model="form.repassword" class="border-bottom p-2" placeholder="请输入确认密码" />
				</view>
				<view class="flex align-center justify-center">
					<text class="text-light-muteds font p-2" @click="changeType">{{type==='login'?'注册账号':'去登录'}}</text>
				</view>
			</template>

			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" v-model="form.phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="form.code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font-sm text-white" :class="this.sendcodeflag ? 'bg-main': 'bg-disabled'"
					 style="width: 180rpx;" @click="getCode">
						<!-- {{ codeTime > 0 ? codeTime + ' s' : '获取验证码' }} -->
						{{this.show}}
					</view>
				</view>
			</template>
		</view>

		<view class="py-2 px-3">
			<button class="text-white bg-main" style="border-radius: 50rpx;border: 0;outline: none;" :disabled="disabled" :class="disabled ? 'bg-disabled' : 'bg-main'"
			 @click="submit">
				{{type==='login'?'登录':'注册'}}
			</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-main font-sm" @click="changeStatus">{{ status ? '账号密码登录' : '验证码登陆' }}</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-main font-sm">登录遇到问题</view>
		</view>

		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-light-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>

		<view class="flex align-center px-5 py-3">
			<view v-for="(item, index) in otherLoginList" :key="index" style="width: 100rpx; height: 110rpx;" class="rounded-circle ml-5 mr-5"
			 :src="item" @click="otherLogin(index)">
				<view class="iconfont icon-weixin font-xlg text-white  flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;background-color: #65CD9F;">

					<image style="width:60%;height:60%;" :src="item"></image>
				</view>
			</view>

			<!-- 			<view class="flex-1 flex align-center justify-center">
				<view class="iconfont icon-weixin font-xlg text-white  flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;background-color: #65CD9F;">
					<image style="width:60%;height:60%;" src="../../static/weixin.png"></image>
				</view>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view class="iconfont icon-QQ font-xlg text-white flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;background-color: #55ACF5;">
					<image style="width:60%;height:60%;" src="../../static/qq_48px.png"></image>
				</view>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view class="iconfont icon-xinlangweibo font-xlg text-white  flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;background-color: #EC7E41;">
					<image style="width:60%;height:60%;" src="../../static/weibo_48px.png"></image>
				</view>
			</view> -->
		</view>

		<view class="flex align-center justify-center text-muted mt-3">
			注册即代表同意
			<text class="text-main">《社区直播协议》</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue";
	export default {
		components: {
			uniStatusBar,
		},
		data() {
			return {
				type: "login",
				status: false,
				form: {
					username: "",
					password: "",
					repassword: "",
					phone: "",
					code: "",
				},
				codeTime: 0,
				sendcodeflag: true,
				show: "点击发送验证码",
				/* 第三方登录 */
				otherLoginList: [
					'../../static/weixin.png',
					'../../static/qq_48px.png',
					'../../static/weibo_48px.png'
				],
				otherLoginType: '',
			};
		},
		onLoad() {},
		computed: {
			disabled() {
				if (
					(this.form.username === "" || this.form.password === "") &&
					(this.form.phone === "" || this.form.code === "")
				) {
					return true;
				}
				return false;
			},
		},
		methods: {
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			/* 第三方登录操作 */
			/**
			 * 登录方法
			 * @param {Object} i
			 */
			otherLogin(i) {
				switch (i) {
					case 0:
						this.otherLoginType = 'weixin';
						break;
					case 1:
						this.otherLoginType = 'qq';
						break;
					case 2:
						this.otherLoginType = 'sinaweibo';
						break;
				}
				//选择登录类型
				console.log('>>>>>>>>>>>' + this.otherLoginType + '登录' + '<<<<<<<<<<<<<');
				this.appLogin(this.otherLoginType);
			},
			/**
			 * 第三方登录
			 * @param {Object} type
			 */
			appLogin(type) {
				// 不同第三方登录，只需要更改 provider 的值即可
				uni.login({
					provider: type,
					success: loginRes => {
						uni.getUserInfo({
							provider: type,
							success: infoRes => {
								// 统一的登录请求参数
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>请求得到的数据：');
								console.log(infoRes);
								console.log(infoRes.userInfo.openId);
								let id = infoRes.userInfo.openId;
								//统一调用登录方法
								this.userLogin(id);
							},
							fail() {
								console.log('请求失败');
							}
						});
					}
				});
			},
			/**
			 * 统一登录的方法
			 * @param {Object} loginDTO
			 */
			async userLogin(id) {
				uni.showLoading({
					title: '登录中'
				});
				let wxid = id
				console.log("发送的id" + wxid)
				/**
				 * 此处调用第三方登录接口
				 */
				let body = {
					"wxid": wxid
				}
				this.$H.post('/otherlogin', body).then(res => {
					if (res.id) {
						this.$store.dispatch('login', res);
						uni.showToast({
							title: '登录成功'
						});
						setTimeout(() => {
							uni.switchTab({
								url: '../index/index'
							});
							uni.hideLoading();
						}, 2000);
					} else {
						uni.showToast({
							title: '登录失败'
						});
					}
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>接口返回得到的数据：');
					console.log(res);
				});
			},
			back() {
				uni.navigateBack({
					delta: 1,
				});
			},
			// 初始化表单
			initForm() {
				this.form.username = "";
				this.form.password = "";
				this.form.phone = "";
				this.form.code = "";
			},
			// 切换登录方式
			changeStatus() {
				// 初始化表单
				this.initForm();
				this.status = !this.status;
			},
			// 获取验证码
			getCode() {
				// // 防止重复获取
				// if (this.codeTime > 0) {
				// 	return;
				// }
				// // 验证手机号
				// if (!this.validate()) {
				// 	return;
				// }
				console.log("获取验证码")
				console.log("1-----" + this.sendcodeflag)
				console.log("2-----" + this.form.phone)
				if (this.sendcodeflag) {
					this.$H.post("/sendcode", {
						phone: this.form.phone
					})
				}

				this.sendcode = false
				if (!this.sencodeflag) {
					let i = 60
					setInterval(() => {
						if (i > 0) {
							i--
							this.show = i + ' s 后再次发送';
						} else {
							this.sendcodeflag === true
							this.show = "点击发送验证码"
						}
					}, 1000)
				}
				/**
				 * 验证码登录流程
				 * 前端：把手机号传给后端
				 * 后端：生成验证码，存储在redis里
				 * 阿里云：发送验证码给用户名
				 * 前端：把手机号和验证码一起发给后端
				 * 后端：登录判断
				 */
				// this.$H.post("/sendcode", {
				// 	phone: this.form.phone
				// }).then((res) => {
				// 	// 倒计时
				// 	// this.codeTime = 60;
				// 	// let timer = setInterval(() => {
				// 	// 	if (this.codeTime >= 1) {
				// 	// 		this.codeTime--;
				// 	// 	} else {
				// 	// 		this.codeTime = 0;
				// 	// 		clearInterval(timer);
				// 	// 	}
				// 	// }, 1000);
				// 	if (!this.sencodeflag) {
				// 		let i = 10
				// 		setInterval(() => {
				// 			if (i > 0) {
				// 				i--
				// 				this.show = i + ' s 后再次发送';
				// 			} else {
				// 				this.sendcodeflag === true
				// 				this.show = "点击发送验证码"
				// 			}
				// 		}, 1000)
				// 	}
				// });
			},
			// 表单验证
			validate() {
				//手机号正则
				var mPattern = /^1[34578]\d{9}$/;
				if (!mPattern.test(this.phone)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none",
					});
					return false;
				}
				// ...更多验证
				return true;
			},
			// 提交
			submit() {
				// 表单验证
				// if (!this.validate()) {
				// 	return;
				// }
				let type = this.type;
				if (this.status) {
					type = "phoneLogin";
				} 
				console.log(type);
				console.log(this.form);
				this.$H.post("/" + type, this.form).then((res) => {
					console.log(res);
					uni.showToast({
						title: "登录成功",
						icon: "none",
					});
					this.$store.dispatch("login", res);
					uni.navigateBack({
						delta: 1,
					});
				});
			},
		},
	};
</script>

<style></style>
