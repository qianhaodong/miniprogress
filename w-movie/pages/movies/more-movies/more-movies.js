// pages/movies/more-movies/more-movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more_data: [],
    offset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var title = options.title
    var searchKey = options.searchKey

    this.setData(searchKey)
    wx.request({
      url: 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title=' + searchKey,
      success: function(res) {
        that.setData({
          more_data: res.data.result
        })
      }
    })

    wx.setNavigationBarTitle({
      title: title
    })
  },

  /* onReachBottom: function () {
    var that = this
    this.data.offset++
    this.setData({
      offset: this.data.offset++
    })
    wx.request({
      url: 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title=' + that.data.searchKey + '&offset=' + that.data.offset * 30,
      success: function(res) {
        var tempArr = res.data.result
        console.log(tempArr)

        that.setData({
          more_data: that.data.more_data.concat(res.data.result)
        })
        // console.log(that.data.more_data)
      }
    })
  } */
})