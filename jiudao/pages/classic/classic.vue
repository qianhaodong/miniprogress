<template>
	<view>
		<classic-content :classic-content="result" :index="index" :is-playing="isPlaying"></classic-content>
		<view class="switch-btn">
			<image :class="!isPrevEnd ? 'prev' : 'prev-end'" src="/static/image/icon/prev-icon.png" @click="onPrevTap"></image>
			<text class="title">{{ result.title }}</text>
			<image :class="!isNextEnd ? 'next' : 'next-end'" src="/static/image/icon/next-icon.png" @click="onNextTap"></image>
		</view>
	</view>
</template>

<script>
import util from 'common/utils/util';
import ClassicContent from 'components/classic-content/classic-content';
import { getClassicData, getNextClassicData } from 'common/api/classic';
import { mapGetters, mapMutations } from 'vuex';
import { ERR_OK } from 'common/api/config';

export default {
	data() {
		return {
			result: {},
			index: 0,
			isPrevEnd: false,
			isNextEnd: false,
			isPlaying: false
		};
	},

	computed: {
		...mapGetters(['playing', 'currentPlayIndex'])
	},

	onLoad() {
		this._getClassicData();
	},

	onShow() {
		// 当音乐播放状态为播放时，且正在播放音乐索引和当前页面音乐索引相同时，显示播放状态，否则显示暂停状态
		if (this.playing && this.index === this.currentPlayIndex) {
			this.isPlaying = true;
		} else {
			this.isPlaying = false;
		}
	},

	methods: {
		onPrevTap() {
			if (this.index === 8) {
				return;
			}

			this._getNextClassicData(this.index + 2);
		},

		onNextTap() {
			if (this.index === 1) {
				return;
			}

			this._getNextClassicData(this.index);
		},

		_getClassicData(params = {}) {
			getClassicData(params).then(res => {
				if (res.statusCode === ERR_OK) {
					this.result = res.data;
					this.index = res.data.index;

					this._setButtonState();
				}
			});
		},

		_getNextClassicData(index, params = {}) {
			getNextClassicData(params, index).then(res => {
				if (res.statusCode === ERR_OK) {
					this.result = res.data;
					this.index = res.data.index;

					this._setButtonState();
				}
			});
		},

		_setButtonState() {
			// 通过索引判断切换按钮状态
			if (this.index === 8) {
				this.isPrevEnd = true;
			} else if (this.index === 1) {
				this.isNextEnd = true;
			} else {
				this.isPrevEnd = false;
				this.isNextEnd = false;
			}
		},

		...mapMutations({
			setPlayingState: 'SET_PLAYING_STATE',
			setCurrentPlayIndex: 'SET_CURRENTPLAY_INDEX'
		})
	},

	components: {
		ClassicContent
	}
};
</script>

<style lang="stylus" scoped>
.switch-btn
	position fixed
	left 50%
	bottom 40rpx
	margin-left -294rpx
	display flex
	justify-content space-between
	align-items center
	padding 0 20rpx
	box-sizing border-box
	width 588rpx
	height 80rpx
	background-color #f7f7f7
	.prev, .next
		width 23rpx
		height 34rpx
	.prev-end, .next-end
		width 23rpx
		height 34rpx
		opacity 0.3
	.title
		font-size 24rpx
		color #000
</style>
