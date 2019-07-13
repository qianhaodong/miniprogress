const util = require('../../utils/util.js')

Page({
  data: {
    like_detail: {}
  },

  onLoad(options) {
    let { type, id } = options
    let url = `http://bl.7yue.pro/v1/classic/${type}/${id}?appkey=RdshydjBvcYZhMZC`

    util.http(url, (result, key) => {
      if (result) {
        // console.log(result)
        this.setData({
          like_detail: result,
          index: result.index
        })
      } else {
        console.log('Request Error')
      }
    }, 'like_detail')
  }
})