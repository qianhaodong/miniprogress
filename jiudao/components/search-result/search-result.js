const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchList: {
      type: Array,
      value: []
    },
    query: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hot_list: [],
    history_list: []
  },

  lifetimes: {
    attached() {
      const url = 'http://bl.7yue.pro/v1/book/hot_keyword?appkey=RdshydjBvcYZhMZC'

      // 初始化搜索历史
      this.setData({
        history_list: wx.getStorageSync('history_list') ? wx.getStorageSync('history_list') : []
      })

      util.http(url, (result, key) => {
        if (result) {
          // wx.hideLoading()
          this.setData({
            [key]: result.hot
          })
        } else {
          console.log('Request Error')
        }
      }, 'hot_list')

      // util.http(url, this._setRequestHandler, 'hot_list')
    }
  },

  observers: {
    query(query) {
      if (query) {
        this._getSearchResult(query)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onQuerySelected(e) { // 搜索关键字点击事件处理
      let query = e.detail.query

      // 设置搜索框搜索关键字
      this.setData({
        query: query,
        clearIconShow: true
      })

      this._getSearchResult(query)

      // 将选择的搜索关键字通过事件传递到父组件
      this.triggerEvent('querySelected', {
        query: query,
        clearIconShow: true
      })
    },

    onConfirmSearch(e) {
      this._getSearchResult(e.detail.query)
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
        searchList: {}
      })

      util.http(url, (result, key) => {
        if (result) {
          wx.hideLoading()
          this.setData({
            [key]: result.books
          })
          // console.log(this.data.searchList)
        } else {
          console.log('Request Error')
        }
      }, 'searchList')

      // util.http(url, this._setRequestHandler, 'search_list')
    },

    /* _setRequestHandler(result, key) {
      if (result) {
        wx.hideLoading()
        this.setData({
          [key]: result
        })
      } else {
        console.log('Request Error')
      }
    } */
  }
})