<template>
	<view class="search-result">
		<view v-if="!searchList.length">
			<search-key v-if="historyList.length" @on-query-selected="onQuerySelected" :search-key-list="historyList">历史搜索</search-key>
			<search-key @on-query-selected="onQuerySelected" :search-key-list="hotList">热门搜索</search-key>
		</view>
		
		<view v-else>
			<book-list :book-list="searchList">搜索列表</book-list>
			<uni-load-more v-if="loading" :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import SearchKey from 'components/search-key/search-key'
	import BookList from 'components/book-list/book-list'
	import UniLoadMore from 'components/uni-load-more/uni-load-more'
	import { getHotSearchKey, getSearchList } from 'common/api/search'
	import { ERR_OK } from 'common/api/config'
	
	const count = 20 // 每页加载数量
	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			pullDown: { // 下拉刷新标志
				type: Boolean,
				default: false
			},
			pullUp: { // 上拉加载更多标志
				type: Boolean,
				default: false
			}
		},
		
		data() {
			return {
				historyList: [],
				hotList: [],
				searchList: [],
				loadingType: 'loading', // 加载更多提示样式
				loading: false, // 加载更多显示标志
				hasMore: true, // 是否加载完标志
				offset: 0 // 加载页码
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
			
			_getHotSearchKey() {
				getHotSearchKey().then(res => {
					if (res.statusCode === ERR_OK) {
						this.hotList = res.data.hot
					}
				})
			},

			_getSearchList(pullDown) {
				this.offset = 0 // 初始化页码
				let params = { // 搜索条件配置
					summary: 1,
					count: count,
					start: count * this.offset,
					q: this.query
				}
				getSearchList(params).then(res => {
					if (res.statusCode === ERR_OK) {
						this.searchList = res.data.books
						
						if (pullDown) { // 如果为下拉刷新，结束后提示
							uni.showToast({
								title: '刷新成功',
								icon: 'success',
								duration: 1000
							})
						}
						this._checkMore(res.data)
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
			},
			
			_checkMore(data) { // 上拉加载更多结束条件
				if (data.books) {
					const books = data.books
					const total = data.total // 搜索结果数量
					if (!books.length || (this.offset + 1) * count >= total) {
						this.hasMore = false
					}
				} else if (!data.total) {
					this.hasMore = false
				}
			}
		},
		
		watch: {
			query(query) { // 当搜索框关键字改变时触发
				if (query) {
					uni.showLoading({
						title: '加载中',
						mask: false
					})
					
					this._getSearchList()
				} else { // 当搜索框查询关键字为空时，清空搜索记录
					this.searchList = []
				}
			},
			
			pullDown(pullFlag) {
				if (pullFlag) {
					if (this.searchList.length) {
						let pullDown = true
						this._getSearchList(pullDown)
					} else {
						this._getHotSearchKey()
					}
					
					// 当下拉刷新结束，派发一个下拉完成事件
					this.$emit('pull-done')
				}
			},
			
			pullUp(pullFlag) {
				if (pullFlag) {
					if (this.searchList.length) {
						if (!this.hasMore) {
							this.loadingType = 'noMore'
							return
						}
						
						this.offset++
						this.loading = true
						let params = { // 搜索条件配置
							summary: 1,
							count: count,
							start: count * this.offset,
							q: this.query
						}
						getSearchList(params).then(res => {
							if (res.statusCode === ERR_OK) {
								this.searchList = this.searchList.concat(res.data.books)
								
								this._checkMore(res.data)
								// 当下拉刷新结束，派发一个下拉完成事件
								this.$emit('pull-done')
							}
						})
					} else {
						console.log('什么也不做~')
					}
				}
			}
		},

		components: {
			SearchKey,
			BookList,
			UniLoadMore
		}
	}
</script>

<style scoped>
	.search-result {
		border-top: 1px solid #f3f3f3;
	}
</style>
