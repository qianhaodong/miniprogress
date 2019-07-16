import { mapGetters, mapActions } from 'vuex'

// 搜索功能共享
export const searchMixin = {
	data() {
		return {
			searchResultShow: false,
			query: ''
		}
	},

	methods: {
		onFocus(e) {
			this.searchResultShow = e.searchResultShow
		},

		onConfirmSearch(e) {
			this.query = e.query
		},

		onCancel(e) {
			this.query = ''
			// 当没有传入该值时，默认为 true
			this.searchResultShow = e.searchResultShow
		},

		querySelected(e) { // 设置 search-result 组件传递来的 query 值
			this.query = e.query
		},
	}
}

// 点赞功能共享
export const likeMixin = {
	computed: {
		...mapGetters([
			'likeList'
		])
	},
	
	methods: {
		getLikeImg(item) {
			if (this.isLikeItem(item)) {
				return '/static/image/icon/love-active-icon.png'
			} else {
				return '/static/image/icon/love-icon.png'
			}
		},
		
		toggleLikeState(item) {
			if (this.isLikeItem(item)) {
				this.deleteLikeList(item)
			} else {
				this.saveLikeList(item)
			}
		},

		isLikeItem(likeItem) {
			let index = this.likeList.findIndex(item => {
				return item.id === likeItem.id && item.type === likeItem.type
			})
			
			return index > -1
		},
		
		...mapActions([
			'saveLikeList',
			'deleteLikeList'
		])
	}
}
