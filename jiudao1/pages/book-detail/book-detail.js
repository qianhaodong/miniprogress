const util = require('../../utils/util.js')

Page({
  data: {
    searchResultShow: false,
    clearIconShow: false,
    book_detail: {},
    query: '',
    comment_list: [
      '你好哇，李银河 +234',
      '浪漫爱情 +453',
      '你要是喜欢别人我会哭 +228',
      '我还是喜欢你 +453',
      '我这张丑脸上就泛起微笑 +666',
      '浪漫爱情 +566',
      '233333 +122'
    ]
  },

  onLoad: function(options) {
    let bookid = options.bookid
    let url = `http://bl.7yue.pro/v1/book/${bookid}/detail?appkey=RdshydjBvcYZhMZC`

    wx.showLoading({
      title: '正在加载'
    })
    util.http(url, this._setRequestHandler, 'book_detail')
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