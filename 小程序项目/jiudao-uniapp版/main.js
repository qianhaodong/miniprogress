import Vue from 'vue'
import App from './App'
import store from './store'

/* function getUserInfo() {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({ // 不推荐使用
			success(res) {
				if (res.errMsg === 'getUserInfo:ok') {
					resolve(res)
				}
			}
		})
	})
}

getUserInfo().then(res => {
	// 添加数据到 Vue 全局对象中（设置全局数据的第二种方式）
	Vue.prototype.$globalData = { userInfo: res.userInfo }
}) */

// 将状态管理对象添加到 Vue 原型对象中
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
