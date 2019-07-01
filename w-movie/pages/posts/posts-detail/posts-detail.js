var data = require('../../../data/posts-data.js')

// 获取全局 App 实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_data: {},
    collected: false,
    currentPostId: 0,
    isPlayingMusic: false,
    backgroundAudioManager: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取页面对应新闻 id
    var postId = options.postId
    this.setData({
      currentPostId: postId,
      detail_data: data.postList[postId]
    })

    // 初始化文章收藏状态
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId] || false
      this.setData({
        collected: postCollected
      })
      postsCollected[postId] = postCollected
      wx.setStorageSync('posts_collected', postsCollected)
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }

    this.setData({
        backgroundAudioManager: wx.getBackgroundAudioManager()
    })

    // 通过全局变量控制播放状态图标
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId ) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
  },

  setMusicMonitor: function(e) {
    var that = this

    // 监听音乐播放事件
    this.data.backgroundAudioManager.onPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    })
    this.data.backgroundAudioManager.onPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap: function(e) { // 点击收藏
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    var that = this

    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })

    // Toast 提示
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    })

    /* wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
      success: function(res) {
        if (res.confirm) {

          // 更新文章是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected)

          // this 保存到 that 中
          that.setData({
            collected: postCollected
          })
        } else if (res.cancel) {
          console.log('不收藏成功！')
        }
      }
    }) */
  },

  onShareTap: function(e) { // 点击分享
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到QQ',
        '分享到朋友圈',
        '分享到微博'  
      ],
      itemColor: '#405f80',
      success: function(res) {
        wx.showToast({
          title: '分享成功'
        })
      }
    })
  },

  onMusicTap: function(e) { // 点击播放音乐

    // 获取音乐实例
    var backgroundAudioManager = this.data.backgroundAudioManager
    var isPlayingMusic = this.data.isPlayingMusic

    // 获取音乐数据
    var musicData = this.data.detail_data.music
    var musicName = musicData.title.split('-')[0]
    var musicAuthor = musicData.title.split('-')[1]
    var musicSrc = musicData.url
    var musicCoverImg = musicData.coverImg
    
    // 音乐详情配置
    var config = {
      title: musicName,
      singer: musicAuthor,
      src: musicSrc,
      coverImgUrl: musicCoverImg
    }

    if (isPlayingMusic) {
      backgroundAudioManager.pause()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      Object.assign(backgroundAudioManager, config)
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})