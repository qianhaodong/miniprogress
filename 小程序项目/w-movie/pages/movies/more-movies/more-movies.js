Page({

  /**
   * 页面的初始数据
   */
  data: {
    more_data: [],
    offset: 0,
    searchKey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var title = options.title
    var searchKey = options.searchKey

    this.setData({
      searchKey: searchKey
    })

    wx.request({
      url: 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title=' + searchKey,
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            more_data: res.data.result
          })
        }
      }
    })

    wx.setNavigationBarTitle({
      title: title
    })
  },

  onPullDownRefresh: function() { // 下拉刷新
    var that = this
    wx.request({
      url: 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title=' + this.data.searchKey,
      success: function (res) {
        if (res.statusCode === 200) {
          that.setData({
            more_data: res.data.result
          })
        }
      }
    })
    // console.log('刷新')
  },

  onReachBottom: function () { // 上拉加载
    var that = this
    this.data.offset++
    this.setData({
      offset: this.data.offset++
    })
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title=' + that.data.searchKey + '&offset=' + that.data.offset * 30,
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            more_data: that.data.more_data.concat(res.data.result)
          })
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        }
      }
    })
  }
})