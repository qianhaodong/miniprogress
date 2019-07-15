// 搜索功能共享
export const searchMixin =  {
	data() {
		return {
			searchResultShow: false,
			query: '',
			message: '帕帕古'
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