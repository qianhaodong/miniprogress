const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResultShow: false,
    clearIconShow: false,
    book_list: [],
    // history_list: [],
    // hot_list: {},
    search_list: {},
    query: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const url = 'http://bl.7yue.pro/v1/book/hot_list?appkey=RdshydjBvcYZhMZC'

    wx.showLoading({
      title: '正在加载'
    })

    util.http(url, this._setRequestHandler, 'book_list')

    // 初始化搜索历史
    /* this.setData({
      history_list: wx.getStorageSync('history_list') ? wx.getStorageSync('history_list') : []
    }) */
  },

  onFocus(e) {
    /* const url = 'http://bl.7yue.pro/v1/book/hot_keyword?appkey=RdshydjBvcYZhMZC'

    util.http(url, this._setRequestHandler, 'hot_list')
    this.setData({
      searchResultShow: e.detail.searchResultShow
    }) */
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
      search_list: {},
      query: ''
    })
  },

  /* onQuerySelected(e) { // 组件事件处理器
    let query = e.detail.query

    // 设置搜索框搜索关键字
    this.setData({
      query: query,
      clearIconShow: true
    })

    this._getSearchResult(query)
  }, */

  _getSearchResult(query) {
    let url = `http://bl.7yue.pro/v1/book/search?appkey=RdshydjBvcYZhMZC&summary=1&q=${query}`

    // 搜索历史
    let history_list = wx.getStorageSync('history_list')

    if (history_list) {

      // 如果有该查询关键字，则删除数组中的该值
      if (history_list.includes(query)) {
        // 获取关键字索引
        let index = history_list.findIndex((item) => {
          return item === query
        })
        history_list.splice(index, 1)
      }

      // unshift() 方法用于向数组头部添加内容，会改变原数组，返回新数组的长度
      history_list.unshift(query)

      wx.setStorageSync('history_list', history_list)

      this.setData({
        history_list: history_list
      })

    } else {
      let history_list = []
      history_list.unshift(query)
      wx.setStorageSync('history_list', history_list)

      this.setData({
        history_list: history_list
      })
    }

    // 提示加载loading
    wx.showLoading({
      title: '正在加载'
    })

    // 将上一次搜索结果置空
    this.setData({
      search_list: {}
    })

    util.http(url, this._setRequestHandler, 'search_list')
  },

  _setRequestHandler(result, key) {
    if (result) {
      wx.hideLoading()
      this.setData({
        [key]: result
      })
    } else {
      console.log('Request Error')
    }
  }
})