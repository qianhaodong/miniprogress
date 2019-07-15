<template>
	<view class="book-item" @click="onBookTap" :data-bookId="bookItem.id">
		<image class="book-img" :src="bookItem.image"></image>
		<view class="book-info">
			<text class="book-name">{{bookItem.title}}</text>
			<text class="book-author">{{bookItem.author}}</text>
			<view class="book-user-info">
				<text class="like-num">{{bookItem.fav_nums}}</text>喜欢 ·
				<text class="comment-num">68</text>短评
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			bookItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},

		methods: {
			onBookTap(e) {
				let bookid = e.currentTarget.dataset.bookid

				// 跳转到书单详情页
				uni.navigateTo({
					url: `/pages/book-detail/book-detail?bookid=${bookid}`
				});
			}
		}
	}
</script>

<style scoped>
	.book-item {
		position: relative;
		margin-bottom: 60rpx;
		width: 240rpx;
		height: 360rpx;
		border-radius: 6rpx;
		overflow: hidden;
		box-shadow: 0 0 28rpx 8rpx #eee;
	}

	.book-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.book-info {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		padding: 18rpx 22rpx 0;
		width: 100%;
		height: 138rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.book-name {
		font-size: 24rpx;
		color: #1f1f1f;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.book-author {
		font-size: 20rpx;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.book-user-info {
		margin-top: 24rpx;
		text-align: right;
		font-size: 20rpx;
		color: #bbb;
	}

	.like-num {
		margin-right: 4rpx;
	}

	.comment-num {
		margin-right: 4rpx;
	}
</style>
