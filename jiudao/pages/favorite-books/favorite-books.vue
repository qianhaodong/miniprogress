<template>
	<view>
		<book-list :book-list="likeBookList">喜欢书单</book-list>
	</view>
</template>

<script>
	import BookList from 'components/book-list/book-list'
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		
		computed: {
			...mapGetters([
				'likeBookList'
			])
		},

		components: { // 组件定义不能使用混入
			BookList
		}
	}
</script>

<style>
	/* 如果 page（当前页面）要设置背景颜色，那么 style 样式必须是全局的，不能添加 scoped ，否则无效！ */
	page {
		background-color: #f5f5f5;
	}
</style>
