var data = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    local_database: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
    if (data) {
      this.setData({
        local_database: data.postList
      })
    }

    // console.log(this.data.local_database)
  },

  onPostTap: function(e) {
    var postId = e.currentTarget.dataset.postid;
    
    wx.navigateTo({
      url: 'posts-detail/posts-detail?postId=' + postId
    })
  }
})