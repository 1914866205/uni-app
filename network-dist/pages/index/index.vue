<template>
	<view style="color:#0056B3">
		<!-- 自定义导航栏 -->
		<nav-bar>
			<template v-if="checkCount===0">
				<!-- 进入子目录，左边将变成返回检讨，导航栏变成子目录名称 -->
				<template slot="left">
					<view class="flex align-center justify-center bg-light rounded-circle ml-3" style="width: 60rpx;height: 60rpx;"
					 hover-class="bg-hover-light" @tap="backUp" v-if="current">
						<text class="iconfont icon-fanhui"></text>
					</view>
					<text class="font-md ml-3">{{current?current.name:'首页'}}</text>
				</template>
				<template slot="right">
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3"
					 hover-class="bg-hover-light" @tap="openAddDialog">
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3"
					 @click="openSortDialog">
						<text class="iconfont icon-gengduo"></text>
					</view>
				</template>
			</template>
			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkCount}}个</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
			</template>
		</nav-bar>
		<view class="pt-2" style="height: 1000px;">
			<view class=" flex m-auto rounded-circle bg-hover-light" style="width: 90%;">
				<text class="ml-4 iconfont icon-sousuo pr-2"></text>
				<input placeholder="搜索网盘文件" @input="search" />
			</view>
			<!-- 		<block v-for="(item,index) in list" :key="index">
					<file-folder-list :item="item" :index="index"></file-folder-list>
				</block> -->
			<!-- 列表 -->
			<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @select="select" @click="doEvent(item)"></f-list>

		</view>
		<!-- 底部操作条 -->
		<!-- 选择更个数大于0才会出现这个操作条 -->
		<view v-if="checkCount>0">
			<!-- 这里要留一定的高度，因为底部操作条需要被固定在底部，并空出底部tabbar高度的地方 -->
			<view style="height: 115rpx;"></view>
			<!-- 操作条容器的样式，高度，颜色，固定在底部，垂直方向拉升效果 -->
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<!-- 根据元素个数等分容器，所以要么四等分，要么二等分，
				行高的修改可以让图标和文字之间的距离变的合理，点击还会变色 :hover-class-->
				<view class="flex-1 flex flex-column align-center justify-center" style="line-height: 1.5;" v-for="(item,index) in actions"
				 :key="index" hover-class="bg-hover-primary" @click="handleBottomEvent(item)">
					<text class="iconfont" :class="item.icon"></text>
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 是否要删除 -->
		<f-dialog ref="delete">是否删除选中的文件？</f-dialog>
		<!-- 重命名，通过ref定义不同的对话框对象，不同操作弹出的dialog是不同的对象 -->
		<f-dialog ref="rename">
			<input type="text" v-model="renameValue" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="重命名" />
		</f-dialog>

		<!-- 新建文件夹，使用自定义弹出层，使用input作为插槽，绑定data中的bewdirname变量 -->
		<f-dialog ref="newdir">
			<input type="text" v-model="newdirname" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="新建文件夹名称" />
		</f-dialog>


		<!-- 添加操作条，type表示弹出的位置类型，具体取值都在popup子组件中 -->
		<uni-popup ref="add" type="bottom" style="height: 200rpx;">
			<!-- 这里要留一定的高度，因为底部操作条需要被固定在底部，并空出底部tabbar高度的地方 -->
			<view class="bg-white flex" style="height: 200rpx;">

				<!-- 遍历addList数组，纵向 flex，为每个操作分配等高的空间，每个操作有图标和名称组成 -->
				<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light" v-for="(item,index) in addList"
				 :key="index" @tap="handleAddEvent(item)">
					<!-- 每个操作的图标，可以传入图标的名称和颜色 -->
					<text style="width: 110rpx;height: 110rpx;" class="rounded-circle bg-light iconfont flex align-center justify-center"
					 :class="item.icon+' '+item.color"></text>
					<!-- 每个操作的名称 -->
					<text class="font text-muted">{{item.name}}</text>
				</view>
			</view>
		</uni-popup>

		<!-- 排序框，底部弹出，遍历排序操作数组，为当前索引项绑定文字蓝色样式 -->
		<uni-popup ref="sort" type="bottom">
			<view class="bg-white">
				<view v-for="(item,index) in sortOptions" :key="index" class="flex align-center justify-center py-3 font border-bottom border-light-secondary"
				 :class="index===sortIndex?'text-main':'text-dart'" hover-class="bg-light" @click="changeSort(index)">
					{{item.name}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>





<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import navBar from '@/components/common/nav-bar.vue'
	import fileFolderList from '@/components/list/flieFolderList.vue'
	import fList from '@/components/common/f-list.vue'
	import fDialog from '@/components/common/f-dialog.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	const files = [{
			image: '/static/icons/folder_48px.png',
			filename: '我的笔记',
			time: 1603333049,
			checked: false
		},
		{
			image: '/static/icons/image_48px.png',
			filename: '风景.jpg',
			time: 160333049,
			checked: false
		},
		{
			image: '/static/icons/video_file_48px.png',
			filename: 'uniapp实战教程.mp4',
			time: 15976927,
			checked: false
		},
		{
			image: '/static/icons/notepad_48px.png',
			filename: '记事本.txt',
			time: 1540176927,
			checked: false
		},
		{
			image: '/static/icons/zip_48px.png',
			filename: '压缩包.rar',
			time: 1403373639,
			checked: false
		}
	]
	// const list = [{
	// 		type: 'dir',
	// 		name: '我的笔记',
	// 		create_time: '2020-10-21 08:00',
	// 		checked: false,
	// 		download:100
	// 	},
	// 	{
	// 		type: 'image',
	// 		name: '风景.jpg',
	// 		create_time: '2020-10-21 08:00',
	// 		data: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3475013809,3762734540&fm=26&gp=0.jpg',
	// 		checked: false,
	// 	},
	// 	{
	// 		type: 'image',
	// 		name: '小姐姐.jpg',
	// 		create_time: '2020-10-21 08:00',
	// 		data: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3724743039,3668514198&fm=26&gp=0.jpg',
	// 		checked: false,
	// 		download:50
	// 	},
	// 	{
	// 		type: 'image',
	// 		name: '头像.jpg',
	// 		create_time: '2020-10-21 08:00',
	// 		data: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1136475906,366246332&fm=15&gp=0.jpg',
	// 		checked: false
	// 	},
	// 	{
	// 		type: 'video',
	// 		name: 'Esc服务器配置mp4',
	// 		create_time: '2020-10-21 08:00',
	// 		checked: false,
	// 		data: 'https://niit-soft.oss-cn-hangzhou.aliyuncs.com/soft1851/share/ECS%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AEJava%E7%8E%AF%E5%A2%83.mp4?spm=5176.8466032.0.dopenurl.22c71450lDK996&file=ECS%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AEJava%E7%8E%AF%E5%A2%83.mp4'
	// 	},
	// 	{
	// 		type: 'text',
	// 		name: '记事本.txt',
	// 		create_time: '2020-10-21 08:00',
	// 		checked: false
	// 	},
	// 	{
	// 		type: 'none',
	// 		name: '压缩包.rar',
	// 		create_time: '2020-10-21 08:00',
	// 		checked: false
	// 	}
	// ]

	export default {
		components: {
			uniStatusBar,
			navBar,
			fileFolderList,
			fList,
			fDialog,
			uniPopup
		},
		data() {
			return {
				dirs: [],
				sortIndex: 0,
				sortOptions: [{
						name: '按名称排序',
						key: 'name'
					},
					{
						name: '按时间排序',
						key: 'created_time'
					}
				],
				newdirname: '',
				renameValue: '',
				list: [],
				addList: [{
					icon: "icon-file-b-6",
					color: "text-success",
					name: "上传图片"
				}, {
					icon: "icon-file-b-9",
					color: "text-primary",
					name: "上传视频"
				}, {
					icon: "icon-file-b-8",
					color: "text-muted",
					name: "上传文件"
				}, {
					icon: "icon-file-b-2",
					color: "text-warning",
					name: "新建文件夹",
				}]
			}
		},
		props: {
			item: Object,
			index: [Number, String]
		},
		onLoad() {
			// this.list = files;
			// this.list = list;
			let dirs = uni.getStorageSync('dirs');
			if (dirs) {
				this.dirs = JSON.parse(dirs);
			}
			this.getData()
		},
		methods: {
			//将数据格式化为我们需要显示的样子，不同的文件类型，是否选中
			formatList(list) {
				return list.map(item => {
					//数据清洗
					//把文件夹类型转成dir
					let type = 'none';
					if (item.isdir === 1) {
						type = 'dir';
					} else {
						//文件扩展名
						type = item.ext.split('/')[0] || 'none';
						// console.log('type' + type)
					}
					return {
						type,
						checked: false,
						...item
					}

				});
			},
			getData() {
				// this.dirs=[]
				// console.log(this.file_id + '>>>>>>>>');
				let orderby = this.sortOptions[this.sortIndex].key;
				console.log(orderby + '&&&&&&&&&&&&&&')
				this.$H.get(`/file?file_id=${this.file_id}&orderby=${orderby}`, {
					token: true
				}).then(res => {
					this.list = this.formatList(res.rows)
				})
			},
			//切换顺序
			changeSort(index) {
				console.log("排序切换")
				this.sortIndex = index;
				console.log(this.sortIndex)
				this.getData();
				this.$refs.sort.close();
			},
			openSortDialog() {
				this.$refs.sort.open();
			},
			//列表点击事件处理
			doEvent(item) {
				switch (item.type) {
					case 'image': //预览图片
						let images = this.list.filter(item => {
							return item.type === 'image'
						})
						uni.previewImage({
							// current: item.data,
							current: item.url,
							// urls: images.map(item => item.data)
							urls: images.map(item => item.url)
						})
						break;
					case 'video':
						console.log(item.url)
						uni.navigateTo({
							// url: '../video/video?url=' + item.data + '&title=' + item.name,
							url: '../video/video?url=' + item.url + '&title=' + item.name,
						})
						break;
					default:
						this.dirs.push({
							id: item.id,
							name: item.name
						});
						this.getData();
						uni.setStorage({
							key: 'dirs',
							data: JSON.stringify(this.dirs)
						});
						break;
				}
			},
			select(e) {
				//接收到子组件传递过来的索引选中状态，将对应的list中的数据更新
				this.list[e.index].checked = e.value
			},
			// 全选/取消全选
			handleCheckAll(checked) {
				this.list.forEach(item => {
					item.checked = checked;
				})
			},
			//处理底部操作条事件，这里仅对“删除”做处理
			handleBottomEvent(item) {
				switch (item.name) {
					// case '删除':
					// 	this.$refs.dialog.open(close => {
					// 		//对List进行过滤，留下未被选中的
					// 		this.list = this.list.filter(item => !item.checked)
					// 		close();
					// 		uni.showToast({
					// 			title: '删除成功',
					// 			icon: 'none'
					// 		})
					// 		//在这儿可以写点击删除需要做的回调事件，
					// 		// 这里先在控制台模拟,实际需要表checkList移除掉重命名，批量删除
					// 		// console.log('删除文件');
					// 		// console.log(this.checkList);
					// 	})
					// 	break;
					case '重命名':
						//重命名只能对单个文件进行，所以取this.checkList[0],也就是选中的唯一元素
						this.renameValue = this.checkList[0].name;
						this.$refs.rename.open(close => {
							if (this.renameValue == '') {
								return uni.showToast({
									title: '文件名称不能为空',
									icon: 'none'
								})
							}
							console.log(this.checkList[0].id + '>>>>>' + this.file_id);
							//重命名接口需要三个参数 自身id   目录id  新名称
							this.$H.post(
								'/file/rename', {
									id: this.checkList[0].id,
									file_id: this.file_id,
									name: this.renameValue
								}, {
									token: true
								}
							).then(
								res => {
									this.checkList[0].name = this.renameValue;
									uni.showToast({
										title: '重命名成功',
										icon: 'none'
									})
								})
							close();
							// //更新该元素的name值，实时看到效果
							// this.checkList[0].name = this.renameValue;
							// close();
						})
						break;
					case '删除':
						this.$refs.delete.open(close => {
							//加载框过渡
							uni.showLoading({
								title: '删除中...',
								mask: false
							});
							//删除接口需要传 1 2 3 这样的参数形式，所以用map取出checkList中每条数据的Id,然后用join拼接上逗号
							let ids = this.checkList.map(item => item.id).join(',');
							this.$H.post(
								'/file/delete', {
									ids
								}, {
									token: true
								},
							).then(res => {
								//重新请求下数据
								this.getData();
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								});
								//结束loading
								uni.hideLoading();
							}).catch(err => {
								uni.hideLoading()
							});
							close();
						})
						break;
					default:
						break;
				}
			},
			//处理添加操作条的各种事件
			handleAddEvent(item) {
				this.$refs.add.close();
				switch (item.name) {
					case '新建文件夹':
						this.$refs.newdir.open(close => {
							if (this.newdirname == '') {
								return uni.showToast({
									title: '文件夹名称不能为空',
									icon: 'none'
								})
							}
							//请求新增文件夹接口
							this.$H.post('/file/createdir', {
								file_id: this.file_id,
								name: this.newdirname
							}, {
								token: true
							}, ).then(res => {
								this.getData();
								uni.showToast({
									title: '新增文件夹成功',
									icon: 'icon'
								})
							})
							close();
							this.newdirname = '';
							// //模拟请求服务器，这里先增加到list数组中
							// this.list.push({
							// 	type: 'dir',
							// 	name: this.newdirname,
							// 	create_time: '2020-10-22 17:00',
							// 	checked: false
							// });
							// uni.showToast({
							// 	title: '新建文件夹成功',
							// 	icon: 'none'
							// });
							// close();
						});
						break;
					default:
						break;
				}
			},
			//打开添加操作条
			openAddDialog() {
				this.$refs.add.open();
			},
			//返回上一个目录
			backUp() {
				this.dirs.pop();
				this.getData();
				uni.setStorage({
					key: 'dirs',
					data: JSON.stringify(this.dirs)
				})
			},
			//搜索功能，关键字为空就走请求所有数据的接口，
			//否则就将文本框实时输入的内容作为关键词搜索
			// search(e) {
			// 	if (e.detail.value == '') {
			// 		return this.getData();
			// 	}
			// 	this.$H.get('/file/search?keyword=' + e.detail.value, {
			// 		token: true
			// 	}).then(
			// 		res => {
			// 			this.list = this.formatList(res.rows)
			// 		})
			// }
		},
		computed: {
			//两个计算属性，事实根据当前dirs数组的变化，file_id计算属性取得应该传到后端的file_id参数（
			//就是当前目录，current计算属性则用来切换导航栏样式
			file_id() {
				let l = this.dirs.length;
				if (l === 0) {
					return 0;
				}
				return this.dirs[l - 1].id;
			},
			current() {
				let l = this.dirs.length;
				if (l === 0) {
					return false
				}
				return this.dirs[l - 1];
			},
			//选中列表
			checkList() {
				return this.list.filter(item => item.checked);
			},
			//选中数量
			checkCount() {
				return this.checkList.length;
			},
			//操作菜单
			actions() {

				if (this.checkCount > 1) {
					return [{
						icon: "icon-xiazai",
						name: "下载"
					}, {
						icon: "icon-shanchu",
						name: "删除",
					}]
				}
				return [{
					icon: "icon-xiazai",
					name: "下载"
				}, {
					icon: "icon-fenxiang-1",
					name: "分享"
				}, {
					icon: "icon-shanchu",
					name: "删除",
				}, {
					icon: "icon-chongmingming",
					name: "重命名",
				}]
			}
		},
		actions: {
			//退出登录
			logout({
				state
			}) {
				$H.post('/logout', {}, {
					token: true
				})
				state.user = null
				state.token = null
				uni.removeStorageSync('user')
				uni.removeStorageSync('token')
				uni.removeStorageSync('dirs')
				//重启应用
				uni.reLaunch()({
					url: '/pages/login/login'
				})
			},
		}
	}





	/*
   
	<template>
		<view>
		<!-- 	uni.request({
				url: 'http://localhost:7001/list',
				method: 'GET',
				success: res => {
					console.log(res.data.data)
				}
			}) -->
			
			<!--  自定义导航栏 -->
			<view>
				<!-- 驼峰式自动转换为中划线式 -->
				<!-- 顶部 -->
				<uni-status-bar>
					<!-- 此处不为rpx -->
					<view style="height: 44px;" class="flex border-bottom align-center">
						<view class="flex-1 flex">
							<!-- ml  margin left 32 -->
							<text class="font-md ml-3">首页</text>
						</view>
						<view class="flex-1 flex justify-center"></view>
						<view class="flex-1 flex justify-end">
							<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
								<text class="iconfont icon-zengjia"></text>
							</view>
							<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
								<text class="iconfont icon-gengduo"></text>
							</view>
						</view>
					</view>
				</uni-status-bar>
			</view> 
		</view>
		
	</template>
		
	*/
</script>

<style>

</style>
