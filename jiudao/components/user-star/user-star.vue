<template>
	<view>
		<image @click="onStarTap" class="like" src="/static/image/icon/love-icon.png"></image>
		<text class="like-num">{{starNums}}</text>
		<!-- <text class="like-num">{{local_status.fav_nums}}</text> -->
	</view>
</template>

<script>
	export default {
		props: {
			starNums: {
				type: Number,
				default: 0
			}
		},
		
		data() {
			return  {
				// localStarNums: this.starNums
			}
		},
		
		mounted() {
			// console.log(this.starNums)
		},
		
		methods: {
			onStarTap() {
				
			}
		}
	}
</script>

<style>
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
</style>
