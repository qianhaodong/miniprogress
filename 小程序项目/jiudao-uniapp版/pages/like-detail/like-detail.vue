<template>
	<view>
		<classic-content :classic-content="result" :index="index"></classic-content>
	</view>
</template>

<script>
	import ClassicContent from 'components/classic-content/classic-content'
	import { getLikeDetail } from 'common/api/like'
	import { ERR_OK } from 'common/api/config'
	
	export default {
		data() {
			return {
				result: {},
				index: 0
			}
		},
		
		onLoad(options) {
			let {type, id} = options
			
			this._getLikeDetail(type, id)
		},
		
		methods: {
			_getLikeDetail(type, id, params = {}) {
				getLikeDetail(params, type, id).then(res => {
					if (res.statusCode === ERR_OK) {
						this.result = res.data
						this.index = res.data.index
					}
				})
			}
		},
		
		components: {
			ClassicContent
		}
	}
</script>

<style>

</style>
