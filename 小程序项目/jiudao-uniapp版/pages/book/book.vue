<template>
	<view class="book-container">
		<search-box :query-key="query" @on-focus="onFocus" @on-confirm-search="onConfirmSearch" @on-cancel="onCancel"></search-box>

		<view v-show="!searchResultShow" class="book-content">
			<book-list :book-list="bookList">精选</book-list>

			<uni-load-more v-if="loading" :status="loadingType"></uni-load-more>
		</view>

		<view v-show="searchResultShow">
			<search-result @query-selected="querySelected" :query="query" :pull-down="pullDown" :pull-up="pullUp" @pull-done="pullDone"></search-result>
		</view>
	</view>
</template>

<script>
import SearchBox from 'components/search-box/search-box';
import SearchResult from 'components/search-result/search-result';
import BookList from 'components/book-list/book-list';
import UniLoadMore from 'components/uni-load-more/uni-load-more';
import { searchMixin } from 'common/utils/mixin';
import { getHotBookList } from 'common/api/book';
import { ERR_OK } from 'common/api/config';

export default {
	mixins: [searchMixin],

	data() {
		return {
			bookList: [],
			pullDown: false,
			pullUp: false,
			loading: false,
			loadingType: 'loading'
		};
	},

	onLoad() {
		uni.showLoading({
			title: '加载中',
			mask: false
		});

		this._getHotBookList();
	},

	onPullDownRefresh() {
		if (this.searchResultShow) {
			this.pullDown = true;
		} else {
			let pullDown = true;
			this._getHotBookList(pullDown);
		}
	},

	onReachBottom() {
		if (this.searchResultShow) {
			this.pullUp = true;
		} else {
			this.loading = true;

			setTimeout(() => {
				this.loadingType = 'noMore';
			}, 1000);
		}
	},

	methods: {
		pullDone(e) {
			// 下拉完成后将 pullDown 设为 false，确保每次下拉时，传入结果组件的 pullDown 值都为 true
			this.pullDown = false;
			this.pullUp = false;
		},

		_getHotBookList(pullDown) {
			getHotBookList().then(res => {
				if (res.statusCode === ERR_OK) {
					this.bookList = res.data;

					if (pullDown) {
						// 如果为下拉刷新，结束后提示
						uni.showToast({
							title: '刷新成功',
							icon: 'success',
							duration: 1000
						});
					}
				}
			});
		}
	},

	components: {
		// 组件定义不能混入
		BookList,
		SearchBox,
		SearchResult,
		UniLoadMore
	}
};
</script>

<style lang="stylus" scoped>
.book-container
	display flex
	flex-direction column
	padding-top 110rpx
	.book-content
		background-color #f9f9f9
</style>
