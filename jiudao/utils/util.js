const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 数据请求处理
const http = (url, callback, key) => {
  wx.request({
    url: url,
    success(res) {
      if (res.statusCode === 200) {
        callback(res.data, key)
      } else {
        console.log(res.errMsg)
      }
    },
    complete() { // 请求完成时，隐藏加载提示
      wx.hideLoading()
    }
  })
}

// 判断两个对象是否相同
const isObjectValueEqual = (obj1, obj2) => {
  let props1 = Object.keys(obj1)
  let props2 = Object.keys(obj2)

  if (props1.length !== props2.length) {
    return false
  }

  for (let i = 0; i < props1.length - 2; i++) {
    let propName = props1[i]

    if (obj1[propName] !== obj2[propName]) {
      return false
    }
  }

  return true
}

module.exports = {
  formatTime,
  http,
  isObjectValueEqual
}