<template>
	<view class="search-box">
		<view :class="inputChange ? 'search-input-m' : 'search-input'">
			<icon class="search-icon" size='14' type="search" @click="onSearchIconTap"></icon>
			<input type="text" class="search" v-model="query" :placeholder="placeholder" placeholder-class="placeholder" @focus="onBindFocus"
			 @confirm="onConfirmSearch" confirm-type="search"></input>
			<icon v-if="clearIconShow" class="clear" size="14" type="clear" @click="onClearTap"></icon>
		</view>
		<view v-if="inputChange" class="cancel" @click="onCancelTap">
			<text>取消</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			queryKey: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				inputChange: false,
				clearIconShow: false,
				placeholder: '搜索图书名称',
				query: ''
			}
		},

		methods: {
			onBindFocus(e) { // 获取焦点事件处理
				this.inputChange = true
				this.placeholder = '搜索图书名称'

				this.$emit('on-focus', {
					searchResultShow: true
				})
			},

			onConfirmSearch(e) { // 手机键盘点击搜索触发
				if (this.query) {
					this.$emit('on-confirm-search', {
						query: this.query
					})
				} else {
					this.placeholder = '请输入搜索内容'
				}
			},

			onSearchIconTap(e) { // 搜索图标点击搜索处理
				if (this.query) {
					this.$emit('on-confirm-search', {
						query: this.query
					})
				} else {
					this.placeholder = '请输入搜索内容'
				}
			},

			onClearTap() { // 清空搜索框事件	
				this.query = ''

				this.$emit('on-cancel', {
					searchResultShow: true
				})
			},

			onCancelTap() { // 取消按钮事件
				this.inputChange = false
				this.query = ''

				this.$emit('on-cancel', {
					searchResultShow: false
				})
			}
		},

		watch: {
			query(query) {
				if (query) {
					this.clearIconShow = true
				} else {
					this.clearIconShow = false
				}
			},
			
			queryKey(query) {
				if (query) {
					this.query = query
				}
			}
		}
	}
</script>

<style scoped>
	.search-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		padding: 0 30rpx;
		width: 100%;
		height: 108rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-top: 1px solid #f3f3f3;
		transition: all 0.2s;
		z-index: 99;
	}

	.search-input {
		display: flex;
		align-items: center;
		width: 100%;
		height: 68rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		border-radius: 34rpx;
		background-color: #f7f7f7;
		transition: all 0.2s;
	}

	.search-input-m {
		display: flex;
		align-items: center;
		width: 540rpx;
		height: 68rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		border-radius: 34rpx;
		background-color: #f7f7f7;
		transition: all 0.5s;
	}

	.search {
		font-size: 28rpx;
		color: #333;
		margin-left: 10rpx;
		flex: 1;
	}

	.placeholder {
		color: #999;
		font-size: 28rpx;
	}

	.cancel {
		width: 118rpx;
		height: 66rpx;
		border: 1px solid #6d6d6d;
		border-radius: 34rpx;
		color: #666;
		line-height: 68rpx;
		text-align: center;
		font-size: 32rpx;
	}
</style>
