const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '搜索图书名称',
    book_list: [],
    history_list: [],
    hot_list: {},
    search_list: {},
    inputChange: false,
    searchResultShow: false,
    clearIconShow: false,
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
    this.setData({
      history_list: wx.getStorageSync('history_list') ? wx.getStorageSync('history_list') : []
    })
  },

  onBindFocus(e) { // 获取焦点事件处理
    const url = 'http://bl.7yue.pro/v1/book/hot_keyword?appkey=RdshydjBvcYZhMZC'
    
    util.http(url, this._setRequestHandler, 'hot_list')
    this.setData({
      inputChange: true,
      searchResultShow: true,
      placeholder: '搜索图书名称'
    })
  },

  onBindInput(e) { // 搜索框搜索关键字改变时触发
    let query = e.detail.value

    if (query) {
      this.setData({
        query: query,
        clearIconShow: true
      })
    } else {
      this.setData({
        clearIconShow: false
      })
    }
  },

  onConfirmSearch(e) { // 手机键盘点击搜索触发
    let query = e.detail.value
    
    if (query) {
      this._getSearchResult(query)
    } else {
      this.setData({
        placeholder: '请输入搜索内容'
      })
    }
  },

  onSearchIconTap(e) { // 搜索图标点击搜索处理
    let query = e.currentTarget.dataset.query

    if (query) {
      this._getSearchResult(query)
    } else {
      this.setData({
        placeholder: '请输入搜索内容'
      })
    }
  },

  onQuerySelected(e) { // 组件事件处理器
    let query = e.detail.query

    // 设置搜索框搜索关键字
    this.setData({
      query: query,
      clearIconShow: true
    })

    this._getSearchResult(query)
  },

  onClearTap() { // 清空搜索框事件
    this.setData({
      query: '',
      clearIconShow: false,
      search_list: {}
    })
  },

  onCancelTap() { // 取消按钮事件
    this.setData({
      inputChange: false,
      searchResultShow: false,
      query: '',
      search_list: {}
    })
  },

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
  },
})