var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie_detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var movieid = options.id
    var url = 'http://v.juhe.cn/movie/query?key=feafb51d9b8570c37e410093699565fe&movieid=' + movieid

    util.http(url, function(result) {
      // this.serializeMovieDetail(result)
      that.setData({
        movie_detail: that.serializeMovieDetail(result)
      })
      // console.log(that.data.movie_detail)
    })
  },

  serializeMovieDetail: function(data) {
    var movieDetail = {
      title: data.title,
      genres: data.genres.split('/').join('、'),
      language: data.language,
      directors: util.movieFormat(data.directors),
      actors: util.movieFormat(data.actors),
      year: data.year,
      country: data.country,
      poster: data.poster,
      summary: data.plot_simple ? data.plot_simple : '待续...'
    }

    return movieDetail
  }
})