import { BASE_URL, commonParams } from './config'
import util from 'common/utils/util'

// 喜欢项详情数据
export function getLikeDetail(params, type, id) {
	const url = BASE_URL + `/classic/${type}/${id}`
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}