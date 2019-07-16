import { BASE_URL, commonParams } from './config'
import util from 'common/utils/util'

// 获取热搜关键字
export function getHotSearchKey(params) {
	const url = BASE_URL + '/book/hot_keyword'
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}

// 获取搜索列表
export function getSearchList(params) {
	const url = BASE_URL + '/book/search'
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}