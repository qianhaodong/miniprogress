<template>
	<view class="search-record">
		<view class="search-hd">
			<view class="line-icon"></view>
			<text class="title">
				<!-- 插槽，用来接收组件调用时传来的值 -->
				<slot></slot>
			</text>
		</view>
		<view class="search-key-list">
			<block v-for="item in searchKeyList" :key="item">
				<view class="search-key" @click="onSelectedTap" :data-value="item">
					<text>{{item}}</text>
				</view>
			</block>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			searchKeyList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			onSelectedTap(e) {
				let query = e.currentTarget.dataset.value
				
				this.$emit('on-query-selected', { query: query })
			}
		}
	}
</script>

<style scoped>
	.search-record {
		padding: 30rpx;
	}

	.search-hd {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.line-icon {
		margin-right: 20rpx;
		width: 8rpx;
		height: 28rpx;
		background-color: #010101;
	}

	.title {
		font-size: 28rpx;
		color: #010101;
	}

	.search-key-list {
		display: flex;
		flex-wrap: wrap;
		padding-left: 28rpx;
	}

	.search-key {
		/* float: left; */
		margin: 0 20rpx 20rpx 0;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		color: #666;
		background-color: #f7f7f7;
		border-radius: 4rpx;
	}
</style>
