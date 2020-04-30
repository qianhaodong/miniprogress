import { BASE_URL, commonParams } from './config'
import util from 'common/utils/util'

// 获取精选书籍
export function getHotBookList(params = {}) {
	const url = BASE_URL + '/book/hot_list'
	const data = Object.assign(commonParams, params)
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}

// 获取书单详情
export function getBookDetail(bookid, params = {}) {
	const url = BASE_URL + `/book/${bookid}/detail`
	const data = Object.assign(commonParams, params)
	
	uni.showLoading({
		title: '加载中',
		mask: false
	});
	
	return new Promise((resolve, reject) => {
		util.http(url, data, resolve)
	})
}