<!-- 基于uniCloud开发的简易留言板 -->
<template>
	<view class="content">
		<view class="input_box">
			<textarea placeholder="请输入您要留言的内容" class="textarea border" v-model="message.content"></textarea>
			<input type="text" class="input-box border" v-model="message.name" placeholder="请输入用户名" />
			<button @click="addMsg" class="submit">提交</button>
		</view>

		<view class="list">
			<view class="item" v-for="(item,index) in listData" :key="index">
				<view class="word">
					<text class="user_name">{{item.name}}</text>
					<text class="content">{{item.content}}</text>
				</view>
				<text class="delete" @click="removeMsg(item._id)">删除</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: {
					name: '',
					content: ''
				},
				listData: [{
					_id: '',
					name: '',
					content: ''
				}]
			};
		},
		methods: {
			addMsg() {
				let data = this.message;
				uniCloud.callFunction({
					name: 'add',
					data: data
				}).then(res => {
					this.getData();
					this.message.name = '';
					this.message.content = '';
				});
			},
			getData() {
				uniCloud.callFunction({
					name: 'get'
				}).then(res => {
					this.listData = res.result.data;
				});
			},
			removeMsg(id) {
				console.log(id)
				let _id = id
				uniCloud.callFunction({
					name: 'remove',
					data: {
						_id
					}
				}).then(res => {
					this.getData();
				})
			}
		},
		onLoad() {
			this.getData();
		}
	}
</script>

<style>
	.list{
		padding: 10rpx;
		margin: 10rpx;
	}
	
	.content {
		background-color: #d7ebfd;
		height: 1300rpx;
	}
	.word{
		padding-top: 10rpx;
	}
.border{
	border: #2F435E;
}
	.submit {
	padding: 10rpx;
		margin: 10rpx;
		text-decoration: none;
		background: #2f435e;
		color: #f2f2f2;

		padding: 10px 30px 10px 30px;
		font-size: 16px;
		font-family: 微软雅黑, 宋体, Arial, Helvetica, Verdana, sans-serif;
		font-weight: bold;
		border-radius: 3px;

		-webkit-transition: all linear 0.30s;
		-moz-transition: all linear 0.30s;
		transition: all linear 0.30s;
	}
	
	.delete{

			text-decoration: none;
			background: #2f435e;
			color: #f2f2f2;
			padding: 2px 4px 4px 2px;
			font-size: 3px;
			font-family: 微软雅黑, 宋体, Arial, Helvetica, Verdana, sans-serif;
			font-weight: bold;
			border-radius: 3px;
		
			-webkit-transition: all linear 0.30s;
			-moz-transition: all linear 0.30s;
			transition: all linear 0.30s;
	}
.input-box{
	margin: 10rpx;
	padding: 10rpx;
	border-bottom: solid #2F435E;
	border-radius: 1px;
} 
	.textarea {
		border-radius: 5px;
		background-color: rgba(241, 241, 241, .98);
		width: 355px;
		height: 100px;
		padding: 10px;
		resize: none;
	}
</style>
