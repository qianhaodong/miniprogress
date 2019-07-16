<template>
	<view class="like-item-container" @click="onLikeDetail" :data-type="type" :data-id="id">
		<view class="like-item-hd">
			<text class="like-item-label">{{likeType}}</text>
			<image class="like" src="/static/image/icon/love-active-icon.png"></image>
			<!-- <text class="like-num"></text> -->
		</view>
		<view class="like-item-cover">
			<view v-if="isMusicType" class="like-music">
				<image class="like-music-img" :src="likeItem.image"></image>
				<view class="like-music-circle"></view>
			</view>
			<image v-else class="like-item-img" :src="likeItem.image"></image>
		</view>
		<text class="like-item-content">{{likeItem.content}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			likeItem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		
		data() {
			return {
				likeType: '',
				isMusicType: false,
				type: 0,
				id: 0
			}
		},
		
		created() {
			let { id, type } = this.likeItem
			let likeType = '电影'
			let isMusicType = false
			
			switch (type) {
				case 100:
					likeType = '电影'
					break
				case 200:
					likeType = '音乐'
					isMusicType = true
					break
				case 300:
					likeType = '诗句'
					break
			}
			
			this.likeType = likeType
			this.isMusicType = isMusicType
			this.type = type
			this.id = id
		},

		methods: {
			onLikeDetail(e) {
				let {type, id} = e.currentTarget.dataset
				uni.navigateTo({
					url: `/pages/like-detail/like-detail?type=${type}&id=${id}`
				});
			}
		}
	}
</script>

<style>
	.like-item-container {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		width: 330rpx;
		height: 470rpx;
		background-color: #fff;
		box-shadow: 0 0 28rpx 8rpx #eee;
	}

	.like-item-hd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		height: 80rpx;
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

	.like-item-label {
		display: block;
		width: 72rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #333;
		background-color: #f2f2f2;
	}

	.like-item-img {
		width: 100%;
		height: 240rpx;
	}

	.like-music {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100;
		height: 240rpx;
	}

	.like-music-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		box-shadow: 0 0 20rpx #ccc;
	}

	.like-music-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 68rpx;
		height: 68rpx;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 18rpx 2rpx #ccc inset;
	}

	.like-item-content {
		display: block;
		font-size: 28rpx;
		color: #999;
		/* letter-spacing: 1rpx; */
		line-height: 42rpx;
		padding: 32rpx 20rpx 0;
		/* white-space: nowrap; */
		/* text-overflow: ellipsis; */
		/* overflow: hidden; */
	}
</style>
