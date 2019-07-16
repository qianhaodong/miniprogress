// 资源请求
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

// 判断对象是否相等
const isObjectValueEqual = (obj1, obj2) => {
  let props1 = Object.keys(obj1)
  let props2 = Object.keys(obj2)

  if (props1.length !== props2.length) {
    return false
  }

  for (let i = 0; i < props1.length; i++) {
    let propName = props1[i]

    if (obj1[propName] !== obj2[propName]) {
      return false
    }
  }

  return true
}

export default {
	http,
	isObjectValueEqual
}
