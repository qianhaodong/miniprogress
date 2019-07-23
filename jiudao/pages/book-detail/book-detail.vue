<template>
	<view class="book-detail-container">
		<search-box :query-key="query" @on-focus="onFocus" @on-confirm-search="onConfirmSearch" @on-cancel="onCancel"></search-box>

		<view v-show="!searchResultShow">
			<view class="book-content">
				<view class="book-cover">
					<image class="book-img" :src="bookDetail.image"></image>
					<text class="book-name">{{ bookDetail.title }}</text>
					<text class="book-author">{{ bookDetail.author }}</text>
				</view>
				<view class="book-comment">
					<text class="title">短评</text>
					<view class="comment-content">
						<block v-for="item in commentList" :key="item">
							<text>{{ item }}</text>
						</block>
					</view>
				</view>
				<view class="book-summary">
					<text class="title">内容简介</text>
					<text class="summary-content">{{ bookDetail.summary }}</text>
				</view>
				<view class="book-info">
					<text class="title">书本信息</text>
					<view class="info-content">
						<view class="l-msg">
							<text>出版社</text>
							<text>出版年</text>
							<text>页数</text>
							<text>定价</text>
							<text>装帧</text>
						</view>
						<view class="r-msg">
							<text>{{ bookDetail.publisher }}</text>
							<text>{{ bookDetail.pubdate }}</text>
							<text>{{ bookDetail.pages }}</text>
							<text>{{ bookDetail.price }}</text>
							<text>{{ bookDetail.binding }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="comment-box"><comment :data="bookDetail"></comment></view>
		</view>

		<view v-show="searchResultShow"><search-result @query-selected="querySelected" :query="query"></search-result></view>
	</view>
</template>

<script>
import SearchBox from 'components/search-box/search-box';
import SearchResult from 'components/search-result/search-result';
import Comment from 'components/comment/comment';
import { searchMixin } from 'common/utils/mixin';
import { getBookDetail } from 'common/api/book';
import { ERR_OK } from 'common/api/config';

export default {
	mixins: [searchMixin],

	data() {
		return {
			bookDetail: {},
			commentList: ['你好哇，李银河 +234', '浪漫爱情 +453', '你要是喜欢别人我会哭 +228', '我还是喜欢你 +453', '我这张丑脸上就泛起微笑 +666', '浪漫爱情 +566', '233333 +122']
		};
	},

	onLoad(options) {
		let bookid = options.bookid;

		this._getBookDetail(bookid);
	},

	methods: {
		_getBookDetail(bookid) {
			getBookDetail(bookid).then(res => {
				if (res.statusCode === ERR_OK) {
					this.bookDetail = res.data;
					// console.log(res);
				}
			});
		}
	},

	components: {
		SearchBox,
		SearchResult,
		Comment
	}
};
</script>

<style lang="stylus" scoped>
box-shadow(args...) 
	box-shadow args
.title
	margin-bottom 16rpx
	font-size 30rpx
	color #292929
	text-align center
.book-detail-container
	display flex
	flex-direction column
	padding-top 110rpx
	.book-content
		padding-bottom 90rpx
		.book-cover
			display flex
			flex-direction column
			align-items center
			padding 40rpx 0
			border-top 20rpx solid #f5f5f5
			.book-img
				width 200rpx
				height 300rpx
				box-shadow(0 0 28rpx 8rpx #eee)
				margin-bottom 24rpx
			.book-name
				margin-bottom 4rpx
				font-size 38rpx
				color #000
			.book-author
				font-size 28rpx
				color #999
		.book-comment
			display flex
			flex-direction column
			border-top 20rpx solid #f5f5f5
			padding 20rpx 20rpx 4rpx
			.comment-content
				display flex
				flex-wrap wrap
			.comment-content text
				display block
				margin 0 12rpx 20rpx 0
				padding 12rpx 24rpx
				background-color #f7f7f7
				border-radius 30rpx
				font-size 24rpx
				color #666
		.book-summary, .book-info
			padding 30rpx 60rpx 24rpx
			display flex
			flex-direction column
			border-top 20rpx solid #f5f5f5
		.book-summary
			.summary-content
				font-size 28rpx
				color #666
				line-height 46rpx
				letter-spacing 2rpx
		.book-info
			.info-content
				display flex
				font-size 24rpx
				line-height 42rpx
				.l-msg
					display flex
					flex-direction column
					margin-right 20rpx
					color #999
				.r-msg
					display flex
					flex-direction column
					color #666
	.comment-box
		position fixed
		left 0
		bottom 0
		width 100%
</style>
