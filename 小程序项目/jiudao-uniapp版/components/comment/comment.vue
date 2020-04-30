<template>
	<view class="comment">
		<view class="comment-input">
			<image class="write-icon" src="/static/image/icon/write-icon.png"></image>
			<input class="write-input" placeholder="留下你的短评~" placeholder-class="placeholder"></input>
		</view>
		<view class="r-msg">
			<!-- <user-star></user-star> -->
			<image @click="toggleLikeState(data)" class="like" :src="getLikeImg(data)"></image>
			<image class="share" src="/static/image/icon/share-icon.png"></image>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import UserStar from 'components/user-star/user-star'
	
	export default {
		props: {
			data: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		
		computed: {
			...mapGetters([
				'likeBookList'
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
					this.deleteLikeBookList(item)
				} else {
					this.saveLikeBookList(item)
				}
			},
		
			isLikeItem(likeItem) {
				let index = this.likeBookList.findIndex(item => {
					return item.id === likeItem.id
				})
				
				return index > -1
			},
			
			...mapActions([
				'saveLikeBookList',
				'deleteLikeBookList'
			])
		},
		
		components: {
			UserStar
		}
	}
</script>

<style scoped>
	.comment {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		height: 86rpx;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		z-index: 99;
	}

	.comment-input {
		display: flex;
		align-items: center;
		width: 400rpx;
		height: 54rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		border: 1px solid #000;
		border-radius: 27rpx;
	}

	.write-icon {
		margin-right: 10rpx;
		width: 24rpx;
		height: 24rpx;
	}

	.write-input {
		flex: 1;
		font-size: 24rpx;
	}

	.placeholder {
		font-size: 24rpx;
		color: #010101;
	}

	.r-msg {
		display: flex;
		align-items: center;
	}
	
	.like {
		width: 32rpx;
		height: 28rpx;
	}
	
	.like-num {
		position: relative;
		top: -18rpx;
		left: 4rpx;
		font-size: 18rpx;
		color: #bbb;
	}

	.share {
		width: 28rpx;
		height: 28rpx;
		margin-left: 44rpx;
	}
</style>
