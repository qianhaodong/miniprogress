<template>
	<view class="comment">
		<view class="comment-input">
			<image class="write-icon" src="/static/image/icon/write-icon.png"></image>
			<input class="write-input" placeholder="留下你的短评~" placeholder-class="placeholder"></input>
		</view>
		<view class="r-msg">
			<user-star></user-star>
			<image class="share" src="/static/image/icon/share-icon.png"></image>
		</view>
	</view>
</template>

<script>
	import UserStar from 'components/user-star/user-star'
	
	export default {
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

	.share {
		width: 28rpx;
		height: 28rpx;
		margin-left: 44rpx;
	}
</style>
