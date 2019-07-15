<template>
	<view class="search-result">
		<block v-if="!searchList.length">
			<search-key v-if="historyList.length" @on-query-selected="onQuerySelected" :search-key-list="historyList">历史搜索</search-key>
			<search-key @on-query-selected="onQuerySelected" :search-key-list="hotList">热门搜索</search-key>
		</block>

		<book-list v-else :book-list="searchList"></book-list>
	</view>
</template>

<script>
	import SearchKey from 'components/search-key/search-key'
	import BookList from 'components/book-list/book-list'
	import { getHotSearchKey, getSearchList } from 'common/api/search'
	import { ERR_OK } from 'common/api/config'

	export default {
		props: {
			query: {
				type: String,
				default: ''
			}
		},
		
		data() {
			return {
				historyList: [],
				hotList: [],
				searchList: []
			}
		},

		created() {
			
			// 初始化搜索历史
			this.historyList = uni.getStorageSync('historyList') ? uni.getStorageSync('historyList') : []
			
			this._getHotSearchKey()
		},

		methods: {
			onQuerySelected(e) { // 搜索关键字点击事件处理
				let query = e.query
				
				// 将选择的搜索关键字通过事件传递到父组件
				this.$emit('query-selected', { query: query })
			},
			
			_getHotSearchKey(params = {}) {
				getHotSearchKey(params).then(res => {
					if (res.statusCode === ERR_OK) {
						this.hotList = res.data.hot
					}
				})
			},

			_getSearchList(params = {}) {
				getSearchList(params).then(res => {
					if (res.statusCode === ERR_OK) {
						this.searchList = res.data.books
					}
				})
				this._setHistorySearchKey(params.q)
			},
			
			_setHistorySearchKey(query) { // 保存搜索历史
				let historyList = uni.getStorageSync('historyList')
				
				if (historyList) { // 如果有搜索历史
					// 如果有该查询关键字，则删除数组中的该值
					if (historyList.includes(query)) {
						// 获取关键字索引
						let index = historyList.findIndex((item) => {
							return item === query
						})
						historyList.splice(index, 1)
					}
				
					// unshift() 方法用于向数组头部添加内容，会改变原数组，返回新数组的长度
					historyList.unshift(query)
				
					uni.setStorageSync('historyList', historyList)
				
					this.historyList = historyList
				} else { // 如果没有搜索历史
					// 新建搜索历史数组，添加并保存到本地
					let historyList = []
					historyList.unshift(query)
					uni.setStorageSync('historyList', historyList)
					
					this.historyList = historyList
				}
			}
		},
		
		watch: {
			query(query) { // 当搜索框关键字改变时触发
				if (query) {
					let params = { // 搜索条件配置
						summary: 1,
						q: query
					}
					this._getSearchList(params)
				} else { // 当搜索框查询关键字为空时，清空搜索记录
					this.searchList = []
				}
			}
		},

		components: {
			SearchKey,
			BookList
		}
	}
</script>

<style scoped>
	.search-result {
		border-top: 1px solid #f3f3f3;
	}
</style>
