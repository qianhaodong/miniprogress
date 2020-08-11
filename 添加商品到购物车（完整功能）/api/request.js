function post(url) {
  return function(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'POST',
        data,
        success: resolve,
        fail: reject
      })
    })
  }
}

function getJSON(url) {
  return function(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        dataType: 'json',
        success: resolve,
        fail: reject
      })
    })
  }
}

module.exports = {
  post,
  getJSON
}
