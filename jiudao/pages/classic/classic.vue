<template>
	<view>
		<classic-content :classic-content="result" :index="index"></classic-content>
		<view class="switch-btn">
			<image :class="!isPrevEnd ? 'prev' : 'prev-end'" src="/static/image/icon/prev-icon.png" @click="onPrevTap"></image>
			<text class="title">{{result.title}}</text>
			<image :class="!isNextEnd ? 'next' : 'next-end'" src="/static/image/icon/next-icon.png" @click="onNextTap"></image>
		</view>
	</view>
</template>

<script>
	import util from 'common/utils/util'
	import ClassicContent from 'components/classic-content/classic-content'
	import { getClassicData } from 'common/api/classic'
	
	export default {
		data() {
			return {
				result: {},
				index: 0,
				isPrevEnd: false,
				isNextEnd: false
			}
		},

		onLoad() {
			this._getClassicData()
		},
		
		methods: {
			_getClassicData() {
				getClassicData().then(res => {
					if (res.statusCode === 200) {
						this.result = res.data
					}
				})
			},
			
			_getPrevClassicData() {
				
			},
			
			_getNextClassicData() {
				
			},
			
			onPrevTap() {
				if (this.index === 8) {
					this.index -= 1
					this.isPrevEnd = true
				}
				// var url = `http://bl.7yue.pro/v1/classic/${this.index + 2}/previous?appkey=RdshydjBvcYZhMZC`

				util.http(url, this.onRequretHandler)
			},

			onNextTap() {
				/* if (this.index === 1) {
					this.index += 1
					this.isNextEnd = true
				}
				var url = `http://bl.7yue.pro/v1/classic/${this.index}/previous?appkey=RdshydjBvcYZhMZC`

				util.http(url, this.onRequretHandler) */
			},

			onRequretHandler(result) {
				if (result) {
					// 初始化状态变量和模板数据
					this.result = result
					this.index = result.index

					// 通过索引判断切换按钮状态
					if (this.index === 8) {
						this.isPrevEnd = true
					} else if (this.index === 1) {
						this.isNextEnd = true
					} else {
						this.isPrevEnd = false
						this.isNextEnd = false
					}
				} else {
					console.log('Callback Error')
				}
			}
		},
		
		components: {
			ClassicContent
		}
	}
</script>

<style>
	.switch-btn {
		position: fixed;
		left: 50%;
		bottom: 40rpx;
		margin-left: -294rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 588rpx;
		height: 80rpx;
		background-color: #f7f7f7;
	}

	.prev,
	.next {
		width: 23rpx;
		height: 34rpx;
	}

	.prev-end,
	.next-end {
		width: 23rpx;
		height: 34rpx;
		opacity: 0.3;
	}

	.title {
		font-size: 24rpx;
		color: #000;
	}
</style>
