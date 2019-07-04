// require 只支持相对路径，不支持绝对路径
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
  },

  onSwiperTap: function(e) {
    // target 和 currentTarge
    // target 指当前点击的目标组件，currentTarget 指触发事件的实际组件
    // 这里 target 是指 image 组件，currentTarget 是指 swiper 组件
    
    var postId = e.target.dataset.postid;

    wx.navigateTo({
      url: 'posts-detail/posts-detail?postId=' + postId
    })
  }
})