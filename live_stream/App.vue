<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//监听底部导航中间的凸起按钮
			uni.onTabBarMidButtonTap(()=>{
				console.log('点击了中间按钮')
			})
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
	/*引入公共样式库*/
	@import url("/common/common.css");
	/*引入free样式库*/
	@import url("/common/free.css");
	/*引入图标库*/
	@import url("/common/icon.css");
</style>
