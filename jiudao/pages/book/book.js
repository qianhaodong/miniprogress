const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list: [],
    hot_list: {},
    inputChange: false,
    searchResultShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const url = 'http://bl.7yue.pro/v1/book/hot_list?appkey=RdshydjBvcYZhMZC'
    
    util.http(url, this.setRequestHandler, 'book_list')
  },

  onBindFocus(e) {
    const url = 'http://bl.7yue.pro/v1/book/hot_keyword?appkey=RdshydjBvcYZhMZC'

    util.http(url, this.setRequestHandler, 'hot_list')
    this.setData({
      inputChange: true,
      searchResultShow: true
    })
  },

  setRequestHandler(result, key) {
    if (result) {
      this.setData({
        [key]: result
      })
    } else {
      console.log('Request Error')
    }
  },

  onBindBlur(e) {
    this.setData({
      inputChange: false,
      searchResultShow: false
    })
  }
})