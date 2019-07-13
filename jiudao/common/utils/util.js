const http = (url, callback) => {
	wx.request({
		url,
		success(res) {
			if (res.statusCode === 200) {
				callback(res.data)
			} else {
				console.log(res.errMsg)
			}
		}
	})
}

export default {
	http
}
