var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    result: {},
    index: 0,
    isPrevEnd: false,
    isNextEnd: false
  },

  onLoad(options) {
    var url = 'http://bl.7yue.pro/v1/classic/latest?appkey=RdshydjBvcYZhMZC'

    util.http(url, this.onRequretHandler)
  },

  onPrevTap() {
    if (this.data.index === 8) {
      this.setData({
        index: --this.data.index,
        isPrevEnd: true
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index + 2}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  onNextTap() {
    if (this.data.index === 1) {
      this.setData({
        index: ++this.data.index,
        isNextEnd: true
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  onRequretHandler(result) {
    if (result) {
      
      // 初始化状态变量和模板数据
      this.setData({
        result: result,
        index: result.index
      })

      // 通过索引判断切换按钮状态
      if (this.data.index === 8) {
        this.setData({
          isPrevEnd: true
        })
      } else if (this.data.index === 1) {
        this.setData({
          isNextEnd: true
        })
      } else {
        this.setData({
          isPrevEnd: false,
          isNextEnd: false
        })
      }

    } else {
      console.log('Callback Error')
    }
  }
})