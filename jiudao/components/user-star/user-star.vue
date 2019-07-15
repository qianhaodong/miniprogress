<template>
	<view>
		<image @click="onStarTap" class="like" src="/static/image/icon/love-icon.png"></image>
		<text class="like-num">{{starNums}}</text>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		props: {
			starNums: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				// localStarNums: this.starNums
			}
		},

		created() {
			console.log(this.starNums)
			// this.setStarNums(this.starNums)
		},

		methods: {
			onStarTap() {
				let star_list = wx.getStorageSync('star_list')
				let {
					id,
					type,
					fav_nums,
					like_status
				} = this.data.local_status

				// 判断点赞数量的增与减
				if (like_status) {
					fav_nums--
				} else {
					fav_nums++
				}

				// 更改点赞状态
				this.setData({
					local_status: {
						id: id,
						type: type,
						fav_nums: fav_nums,
						like_status: !like_status
					}
				})

				// 保存点赞状态（先获取当前项在本地存储数组中的位置）
				let index = star_list.findIndex((item) => {
					return util.isObjectValueEqual(item, this.data.local_status)
				})

				// 通过获取的位置去更新本地存储中当前项的值
				star_list.splice(index, 1, this.data.local_status)
				wx.setStorageSync('star_list', star_list)
			},
			
			...mapMutations({
				setStarNums: 'SET_STARNUMS'
			})
		},

		watch: {
			starStatus(newVal) {
				if (!Object.keys(newVal).length) return

				console.log(222222)
				let star_list = wx.getStorageSync('star_list')
				if (star_list) {

					// 先判断本地存储中有无当前项的点赞信息
					let index = star_list.findIndex((item) => {
						return util.isObjectValueEqual(item, newVal)
					})

					if (index > -1) { // 有当前项的点赞信息
						this.setData({
							local_status: star_list[index]
						})
					} else { // 无当前项的点赞信息
						this.setData({
							local_status: newVal
						})

						// 保存点赞状态到本地存储
						star_list.push(this.data.local_status)
						wx.setStorageSync('star_list', star_list)
					}
				} else {
					let star_list = [] // 用于存储点赞信息到本地

					// 将点赞信息保存到本地 data 中，防止监听器死循环
					this.setData({
						local_status: newVal
					})

					// 保存点赞状态
					star_list.push(this.data.local_status)
					wx.setStorageSync('star_list', star_list)
				}
			}
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
