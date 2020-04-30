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

// 处理网络请求
const getRequestData = (url, callback) => {
  wx.request({
    url: url,
    success: function(res) {
      if (res.statusCode === 200) {
        callback(res.data.result)
      }
    }
  })
}

// 处理电影字符
const movieFormat = str => {
  if (str) {
    return str.split(',').join(' / ')
  } else {
    return '不详'
  }
}

module.exports = {
  formatTime: formatTime,
  http: getRequestData,
  movieFormat: movieFormat
}
