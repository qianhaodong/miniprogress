const http = (url, data, resolve) => {
	uni.request({
		url,
		data,
		success: res => {
			resolve(res)
		},
		complete: () => {
			uni.hideLoading()
		}
	})
}

export default {
	http
}
