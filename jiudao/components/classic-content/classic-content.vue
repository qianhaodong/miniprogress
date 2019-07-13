<template>
	<view>
		<view class="classic-info">
			<view class="l-msg">
				<view class="order">
					<text>No.</text>
					<text class="num">{{classicContent.index}}</text>
				</view>
				<view class="line"></view>
				<view class="date">
					<text class="month">六月</text>
					<text class="year">2019</text>
				</view>
			</view>
			<view class="r-msg">
				<user-star :star-nums="favNums"></user-star>
				<image class="share" src="/static/image/icon/share-icon.png"></image>
			</view>
		</view>

		<view class="classic-content">
			<view v-if="musicShow" class="music-play">
				<image class="music-img" :src="classicContent.image"></image>
				<view class="btn-play" @click="onMusicPlay">
					<image :class="isPlayingMusic ? 'pause' : 'play'" :src="isPlayingMusic ? '/static/image/icon/pause-icon.png' : '/static/image/icon/play-icon.png'"></image>
				</view>
			</view>
			<block v-else>
				<image class="content-img" :src="classicContent.image"></image>
			</block>
			<image class="content-tips" :src="'/static/image/' + category + '.png'"></image>
			<view class="content-txt">
				<text>{{classicContent.content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import UserStar from 'components/user-star/user-star'
	
	export default {
		props: {
			classicContent: {
				type: Object,
				default: null
			},
			index: { // 记录页面的索引
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				musicShow: false, // 记录音乐播放器显示状态
				isPlayingMusic: false, // 记录音乐播放状态
				adminMusicChange: false, // 记录后台操作音乐播放与暂停的状态
				category: 'movie', // 记录类型图标
				currentIndex: 0, // 记录当前项索引
				favNums: 0
			}
		},

		created() {
			// console.log(this.index)
		},

		methods: {
			onMusicPlay(e) {
				let backgroundAudioManager = uni.getBackgroundAudioManager()
				let config = { // 歌曲详情配置
					title: this.classicContent.title.split('《')[1].split('》')[0],
					singer: this.classicContent.title.split('《')[0],
					src: this.classicContent.url,
					coverImgUrl: this.classicContent.image
				}

				if (this.isPlayingMusic) {
					backgroundAudioManager.pause()
					this.isPlayingMusic = false
				} else { // 初始化音乐播放
					// 为 backgroundAudioManager 对象添加属性
					Object.assign(backgroundAudioManager, config)
					
					this.isPlayingMusic = true
					this.currentIndex = this.classicContent.index // 记录当前播放音乐索引
				}

				this.setMusicMonitor(backgroundAudioManager)
			},

			setMusicMonitor(backgroundAudioManager) {
				let that = this // 解决回调中 this 问题

				backgroundAudioManager.onPlay(function() { // 监听播放状态
					that.adminMusicChange = false
					if (that.index === that.currentIndex) {
						that.isPlayingMusic = true
					}
				})
				backgroundAudioManager.onPause(function() { // 监听暂停状态
					that.adminMusicChange = true
					if (that.index === that.currentIndex) {
						that.isPlayingMusic = false
					}
				})
				backgroundAudioManager.onEnded(function() { // 监听自然播放完成状态
					// 播放完成之后清除播放状态缓存
					that.isPlayingMusic = false
					that.currentIndex = 0
				})
			}
		},

		watch: {
			classicContent(newVal, oldVal) {
				let type = newVal.type // 获取结果类型
				
				this.favNums = newVal.fav_nums
				// 判断类型，显示对应icon和显示音乐播放器
				switch (type) {
					case 100:
						this.category = 'movie'
						this.musicShow = false
						break
					case 200:
						this.category = 'music'
						this.musicShow = true
						this.isPlayingMusic = false
						// 当正在播放音乐状态为播放时，且正在播放音乐索引和当前页面音乐索引相同时，显示播放状态，否则显示暂停状态
						if (!this.adminMusicChange && this.index === this.currentIndex) {
							this.isPlayingMusic = true
						} else if (this.adminMusicChange && this.index === this.currentIndex) {
							this.isPlayingMusic = false
						}
						break
					case 300:
						this.category = 'poetry'
						this.musicShow = false
						break
				}
			}
		},
		
		components: {
			UserStar
		}
	}
</script>

<style>
	.classic-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		padding: 0 30rpx;
	}

	.l-msg {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #000;
	}

	.order {
		align-items: flex-end;
	}

	.num {
		font-size: 58rpx;
		font-weight: bold;
	}

	.line {
		margin: 0 15rpx;
		width: 2px;
		height: 42rpx;
		background-color: #000;
	}

	.date {
		font-size: 20rpx;
	}

	.month {
		font-size: 24rpx;
		display: block;
		letter-spacing: 2rpx;
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

	.classic-content {
		position: relative;
	}

	.content-img {
		width: 100%;
		height: 500rpx;
		margin-bottom: 112rpx;
		vertical-align: bottom;
	}

	.music-play {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 112rpx;
		height: 500rpx;
	}

	.music-img {
		width: 420rpx;
		height: 420rpx;
		border-radius: 50%;
		box-shadow: 0 0 20rpx 4rpx #ccc;
	}

	.btn-play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0 0 12rpx 2rpx #ccc inset;
	}

	.play {
		width: 28rpx;
		height: 44rpx;
		margin-left: 12rpx;
	}

	.pause {
		width: 28rpx;
		height: 44rpx;
		margin-left: 4rpx;
	}

	.content-tips {
		position: absolute;
		left: 30rpx;
		top: 442rpx;
		width: 46rpx;
		height: 142rpx;
	}

	.content-txt {
		display: flex;
		justify-content: center;
		padding: 0 96rpx 0;
		font-size: 34rpx;
		line-height: 50rpx;
		letter-spacing: 2rpx;
	}
</style>
