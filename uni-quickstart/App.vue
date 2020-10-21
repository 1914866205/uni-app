<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	/*引入全局样式*/
	@import url("./common/iconfont.css");
	/* 自定义图标库 */
	@import './common/icon.css';
	/* 动画库 */
	@import './common/animate.css';
	/* 自定义样式库 */
	@import './common/free.css';
	/* 全局样式 */
	@import './common/common.css';
</style>
