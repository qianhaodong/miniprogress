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

const http = (url, callback, key) => {
  wx.request({
    url: url,
    success(res) {
      if (res.statusCode === 200) {
        callback(res.data, key)
      } else {
        console.log(res.errMsg)
      }
    }
  })

}

module.exports = {
  formatTime: formatTime,
  http: http
}
