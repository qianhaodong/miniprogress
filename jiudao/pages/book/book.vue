<template>
	<view class="book-container">
		<search-box :query-key="query" @on-focus="onFocus" @on-confirm-search="onConfirmSearch"
		 @on-cancel="onCancel"></search-box>

		<view v-show="!searchResultShow" class="book-content">
			<view class="title">
				<image src="/static/image/icon/decorate-icon.png"></image>
				<text>精选</text>
			</view>
			<book-list :book-list="bookList"></book-list>
		</view>

		<view v-show="searchResultShow">
			<search-result @query-selected="querySelected" :query="query"></search-result>
		</view>
	</view>
</template>


<script>
	import SearchBox from 'components/search-box/search-box'
	import SearchResult from 'components/search-result/search-result'
	import BookList from 'components/book-list/book-list'
	import { searchMixin } from 'common/utils/mixin'
	import { getHotBookList } from 'common/api/book'
	import { ERR_OK } from 'common/api/config'

	export default {
		mixins: [searchMixin],
		
		data() {
			return {
				bookList: []
			}
		},

		onLoad() {
			this._getHotBookList()
		},

		methods: {
			_getHotBookList(params = {}) {
				getHotBookList(params).then(res => {
					if (res.statusCode === ERR_OK) {
						this.bookList = res.data
					}
				})
			}
		},

		components: { // 组件定义不能混入
			BookList,
			SearchBox,
			SearchResult
		}
	}
</script>

<style scoped>
	.book-container {
		display: flex;
		flex-direction: column;
		padding-top: 110rpx;
	}

	.book-content {
		background-color: #f9f9f9;
	}

	.title {
		position: relative;
		text-align: center;
		padding-top: 32rpx;
	}

	.title image {
		position: absolute;
		width: 107rpx;
		height: 32rpx;
		left: 50%;
		top: 50%;
		margin: 4rpx 0 0 -70rpx;
	}

	.title text {
		font-size: 34rpx;
		color: #000;
		position: relative;
		z-index: 1;
	}

	.book-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx 90rpx 0;
	}
</style>
