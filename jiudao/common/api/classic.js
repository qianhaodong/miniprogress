import { BASE_URL, APPKEY } from './config'


export function getClassicData(data) {
	const url = BASE_URL + '/classic/latest?appkey=' + APPKEY
	
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			success: res => {
				resolve(res)
			}
		});
	})
}