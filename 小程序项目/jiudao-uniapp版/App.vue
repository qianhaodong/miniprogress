<script>
	export default {
		/* globalData: { // 设置全局数据的第一种方式
			userInfo: {}
		}, */
		
		onLaunch: function() {
			/* const that = this
			uni.getUserInfo({
				success(res) {
					that.$options.globalData.userInfo = res.userInfo
				}
			}) */
			
			/* uni.login({
				success: res => {
					console.log(res);
				},
				fail: () => {},
				complete: () => {}
			}); */
		},
		
		onShow: function() {
			// console.log('App Show')
		},
		
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
