<template>
	<view>
		<image @click="toggleLikeState" class="like" src="/static/image/icon/love-icon.png"></image>
		<text class="like-num"></text>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				// localStarNums: this.starNums
			}
		},

		created() {
			
		},
		
		computed: {
			...mapGetters([
				'likeList'
			])
		},

		methods: {
			toggleLikeState() {
				
			},
			
			isLikeItem(likeItem) {
				let index = this.likeList.findIndex(value)
			}
		},

		watch: {
			
		}
	}
</script>

<style scoped>
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
