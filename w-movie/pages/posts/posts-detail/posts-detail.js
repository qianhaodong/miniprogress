var data = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_data: {},
    collected: false,
    currentPostId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.postId
    this.setData({
      currentPostId: postId
    })

    var postsCollected = wx.getStorageSync('posts_collected')

    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },

  onCollectionTap: function(e) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]

    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected  
    })
  }
})