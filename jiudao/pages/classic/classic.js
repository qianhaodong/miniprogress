var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    index: 0,
    isPrevEnd: false,
    isNextEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var url = 'http://bl.7yue.pro/v1/classic/latest?appkey=RdshydjBvcYZhMZC'

    util.http(url, this.onRequretHandler)
  },

  onPrevTap() {
    if (this.data.index === 8) {
      this.setData({
        index: --this.data.index,
        isPrevEnd: true
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index + 2}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  onNextTap() {
    if (this.data.index === 1) {
      this.setData({
        index: ++this.data.index,
        isNextEnd: true
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  /* onRequretHandler(result) {
    if (result) {
      var type = result.type
      var category = ''          // 记录类型图标
      var musicShow = false      // 记录音乐播放器显示状态
      var isPlayingMusic = false // 记录音乐播放状态

      // 判断类型，显示对应icon和显示音乐播放器
      switch (type) {
        case 100:
          category = 'movie'
          musicShow = false
          break
        case 200:
          category = 'music'
          musicShow = true
          // 当正在播放音乐索引和当前页面音乐索引相同时，显示播放状态
          if (result.index === this.data.currentIndex) {
            isPlayingMusic = true
          }
          this.setData({
            isPlayingMusic: isPlayingMusic
          })
          break
        case 300:
          category = 'poetry'
          musicShow = false
          break
      }

      // 初始化状态变量和模板数据
      this.setData({
        result: result,
        index: result.index,
        category: category,
        musicShow: musicShow
      })

      // 通过索引判断切换按钮状态
      if (this.data.index === 8) {
        this.setData({
          isPrevEnd: true
        })
      } else if (this.data.index === 1) {
        this.setData({
          isNextEnd: true
        })
      } else {
        this.setData({
          isPrevEnd: false,
          isNextEnd: false
        })
      }

    } else {
      console.log('Callback Error')
    }
  }, */

  onRequretHandler(result) {
    if (result) {
      
      // 初始化状态变量和模板数据
      this.setData({
        result: result,
        index: result.index
      })

      // 通过索引判断切换按钮状态
      if (this.data.index === 8) {
        this.setData({
          isPrevEnd: true
        })
      } else if (this.data.index === 1) {
        this.setData({
          isNextEnd: true
        })
      } else {
        this.setData({
          isPrevEnd: false,
          isNextEnd: false
        })
      }

    } else {
      console.log('Callback Error')
    }
  }
})