<template>
	<view>
		<view class="title">
			<image src="/static/image/icon/decorate-icon.png"></image>
			<text>
				<slot></slot>
			</text>
		</view>
		<view class="book-list">
			<block v-for="item in bookList" :key="item.id">
				<book-item :book-item="item"></book-item>
			</block>
		</view>
	</view>
</template>

<script>
	import BookItem from 'components/book-item/book-item'
	
	export default {
		props: {
			bookList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		
		components: {
			BookItem
		}
	}
</script>

<style scoped>
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
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx 90rpx 0;
	}
</style>
