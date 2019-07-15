<template>
	<view class="book-list">
		<block v-for="item in bookList" :key="item.id">
			<book-item :book-item="item"></book-item>
		</block>
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
	.book-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx 90rpx 0;
	}
</style>
