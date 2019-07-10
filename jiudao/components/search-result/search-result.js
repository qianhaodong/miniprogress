const util = require('../../utils/util.js')

Component({
  properties: {
    query: {
      type: String,
      value: ''
    }
  },

  data: {
    hot_list: [],
    history_list: [],
    search_list: []
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
          this.setData({
            [key]: result.hot
          })
        } else {
          console.log('Request Error')
        }
      }, 'hot_list')
    }
  },

  observers: { // 监听器，监听 query 变化时触发
    query(query) {
      if (query) {
        this._getSearchResult(query)
      } else { // 当搜索框查询关键字为空时，清空搜索记录
        this.setData({
          search_list: []
        })
      }
    }
  },

  methods: {
    onQuerySelected(e) { // 搜索关键字点击事件处理
      let query = e.detail.query

      // 设置搜索框搜索关键字
      this.setData({
        clearIconShow: true
      })

      // 将选择的搜索关键字通过事件传递到父组件
      this.triggerEvent('querySelected', {
        query: query,
        clearIconShow: true
      })
    },

    _getSearchResult(query) {
      let url = `http://bl.7yue.pro/v1/book/search?appkey=RdshydjBvcYZhMZC&summary=1&q=${query}`

      // 提示加载loading
      wx.showLoading({
        title: '正在加载'
      })

      // 保存搜索历史
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

      // 将上一次搜索结果置空
      this.setData({
        search_list: {}
      })

      util.http(url, (result, key) => {
        if (result) {
          this.setData({
            [key]: result.books
          })
        } else {
          console.log('Request Error')
        }
      }, 'search_list')
    },

    /* _setRequestHandler(result, key) {
      if (result) {
        this.setData({
          [key]: result
        })
      } else {
        console.log('Request Error')
      }
    } */
  }
})