var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotMovie_data: [],
    movies_data: [],
    top250_data: [],
    result_data: [],
    query: '',
    showFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var baseUrl = 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&pagesize=30&title='
    var hotMovieUrl = baseUrl + '龙'
    var moviesUrl = baseUrl + '猛'
    var top250Url = baseUrl + '热'

    this.getMovieListData(hotMovieUrl, 'hotMovie_data', '正在热映')
    this.getMovieListData(moviesUrl, 'movies_data', '即将上映')
    this.getMovieListData(top250Url, 'top250_data', 'top250')
  },

  getMovieListData: function (url, key, categoryTitle) {
    var that = this

    util.http(url, function (result) {
      var tempData = {}
      tempData[key] = {
        categoryTitle: categoryTitle,
        searchKey: url.split('=')[url.split('=').length - 1],
        movies_data: result.slice(0, 3)
      }
      that.setData(tempData)
      // console.log(that.data.hotMovie_data.movies_data)
    })


    /* wx.request({
      url: url,
      success: function (res) {
        var tempData = {}
        tempData[key] = {
          categoryTitle: categoryTitle,
          searchKey: url.split('=')[url.split('=').length - 1],
          movies_data: res.data.result.slice(0, 3)
        }
        that.setData(tempData)
      }
    }) */
  },

  onMoreTap: function (e) {
    var searchKey = e.currentTarget.dataset.key
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: 'more-movies/more-movies?searchKey=' + searchKey + '&title=' + title
    })
  },

  onBindFocus: function (e) {
    this.setData({
      showFlag: false
    })
  },

  onBindBlur: function (e) {
    var that = this
    var query = e.detail.value

    if (query) {
      var url = 'http://v.juhe.cn/movie/index?key=feafb51d9b8570c37e410093699565fe&smode=0&title=' + query

      util.http(url, function (result) {
        that.setData({
          result_data: result
        })
      })

      this.setData({
        query: query
      })
    } else {
      this.setData({
        showFlag: true,
        result_data: []
      })
    }
  },

  onCancelTap: function (e) {
    this.setData({
      query: '',
      result_data: []
    })
  }
})