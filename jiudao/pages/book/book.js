const util = require('../../utils/util.js')

Page({
  data: {
    searchResultShow: false,
    clearIconShow: false,
    book_list: [],
    query: ''
  },

  onLoad(options) {
    const url = 'http://bl.7yue.pro/v1/book/hot_list?appkey=RdshydjBvcYZhMZC'

    wx.showLoading({
      title: '正在加载'
    })

    util.http(url, this._setRequestHandler, 'book_list')
  },

  onFocus(e) {
    this.setData({
      searchResultShow: e.detail.searchResultShow
    })
  },

  onQuerySelected(e) { // 设置 search-result 组件传递来的 query 值
    this.setData({
      query: e.detail.query,
      clearIconShow: e.detail.clearIconShow
    })
  },

  onConfirmSearch(e) {
    this.setData({
      query: e.detail.query
    })
  },

  onCancel(e) {
    this.setData({
      searchResultShow: e.detail.searchResultShow,
      query: ''
    })
  },

  _setRequestHandler(result, key) {
    if (result) {
      this.setData({
        [key]: result
      })
    } else {
      console.log('Request Error')
    }
  }
})