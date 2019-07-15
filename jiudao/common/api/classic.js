import { BASE_URL, commonParams } from './config'
import util from 'common/utils/util'

// 流行数据获取
export function getClassicData(params) {
	const url = BASE_URL + '/classic/latest'
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}

// 点击切换流行获取数据
export function getNextClassicData(params, index) {
	const url = BASE_URL + `/classic/${index}/previous`
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}