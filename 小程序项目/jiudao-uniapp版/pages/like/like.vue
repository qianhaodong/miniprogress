<template>
	<view class="like-container">
		<view class="like-hd">
			<image mode="aspectFill" class="like-img" src="/static/image/like-bg.jpg"></image>
			<view class="mask"></view>
			<view class="user-content">
				<view class="user-bg"></view>
				<view class="user-info">
					<!-- <image class="user-avatar" :src="userInfo.avatarUrl"></image> -->
					<!-- <text class="user-nickname">{{userInfo.nickName}}</text> -->
					<view class="user-avatar-box">
						<open-data class="user-avatar" type="userAvatarUrl"></open-data>
					</view>
					<open-data class="user-nickname" type="userNickName"></open-data>
				</view>
				<view class="user-more">
					<view class="about-me">
						<image class="about-icon" src="/static/image/icon/about-icon.png"></image>
						<text class="more-text">关于我们</text>
					</view>
					<view class="my-books" @click="onLikeBooks">
						<text class="book-num">{{likeBookList.length}}</text>
						<text class="more-text">我的书单</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="likeList.length" class="like-bd">
			<view class="like-title">
				<image class="decorate-icon" src="/static/image/icon/decorate-icon.png"></image>
				<text>喜欢</text>
			</view>
			<view class="like-list">
				<block v-for="item in likeList" :key="item.index">
					<like-item :like-item="item"></like-item>
				</block>
			</view>
		</view>
		<view v-else class="tips">
			<text>暂时没有喜欢的内容~</text>
		</view>
	</view>
</template>

<script>
	import LikeItem from 'components/like-item/like-item'
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				userInfo: {}
			}
		},

		created() {
			// this.userInfo = getApp().globalData.userInfo
			// console.log(getApp().globalData.userInfo);
			
			// this.userInfo = this.$globalData.userInfo
		},
		
		computed: {
			...mapGetters([
				'likeList',
				'likeBookList'
			])
		},

		methods: {
			onLikeBooks() {
				uni.navigateTo({
					url: '/pages/favorite-books/favorite-books'
				})
			}
		},
		
		components: {
			LikeItem
		}
	}
</script>

<style>
	/* 如果 page（当前页面）要设置背景颜色，那么 style 样式必须是全局的，不能添加 scoped ，否则无效！ */
	page {
		background-color: #f5f5f5;
	}
</style>

<style scoped>
	.like-container {
		display: flex;
		flex-direction: column;
	}

	.like-hd {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		width: 100%;
		height: 556rpx;
		z-index: 1;
	}

	.like-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: -1;
	}

	.user-content {
		position: relative;
		width: 100%;
		height: 300rpx;
	}

	.user-bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 180rpx;
		border-top: 120rpx solid transparent;
		border-right: 750rpx solid #fff;
		z-index: -1;
	}

	.about-icon {
		width: 34rpx;
		height: 34rpx;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.user-avatar-box {
		margin-bottom: 8rpx;
		border-radius: 50%;
		overflow: hidden;
		height: 120rpx;
		width: 120rpx;
	}

	.user-avatar {
		height: 120rpx;
		width: 120rpx;
	}

	.user-nickname {
		font-size: 34rpx;
		color: #000;
	}

	.user-more {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 120rpx 0;
	}

	.about-me,
	.my-books {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.more-text {
		font-size: 24rpx;
		color: #999;
	}

	.book-num {
		font-size: 36rpx;
		color: #000;
	}

	.like-title {
		position: relative;
		padding: 42rpx 0 20rpx;
		text-align: center;
	}

	.like-title image {
		position: absolute;
		width: 107rpx;
		height: 32rpx;
		left: 50%;
		top: 50%;
		margin: -4rpx 0 0 -40rpx;
	}

	.like-title text {
		font-size: 34rpx;
		color: #000;
		position: relative;
		z-index: 1;
	}

	.like-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 30rpx;
	}

	.tips {
		padding-top: 220rpx;
		text-align: center;
		color: #666;
		font-size: 32rpx;
	}
</style>
