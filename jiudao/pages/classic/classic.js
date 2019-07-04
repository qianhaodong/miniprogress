var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    index: 0,
    musicShow: false,
    category: 'movie',
    isPlayingMusic: false,
    currentIndex: 0
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
        index: --this.data.index
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index + 2}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  onNextTap() {
    if (this.data.index === 1) {
      this.setData({
        index: ++this.data.index
      })
    }
    var url = `http://bl.7yue.pro/v1/classic/${this.data.index}/previous?appkey=RdshydjBvcYZhMZC`

    util.http(url, this.onRequretHandler)
  },

  onRequretHandler(result) {
    if (result) {
      var type = result.type
      var category = '' // 记录类型图标
      var musicShow = false // 记录音乐播放器显示状态
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

      this.setData({
        result: result,
        index: result.index,
        category: category,
        musicShow: musicShow
      })
    } else {
      console.log('Callback Error')
    }
  },

  onMusicPlay(e) {
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    var config = { // 歌曲详情配置
      title: this.data.result.title.split('《')[1].split('》')[0],
      singer: this.data.result.title.split('《')[0],
      src: this.data.result.url,
      coverImgUrl: this.data.result.image
    }

    if (this.data.isPlayingMusic) {
      backgroundAudioManager.pause()
      this.setData({
        isPlayingMusic: false
      })
    } else { // 初始化音乐播放
      Object.assign(backgroundAudioManager, config)
      this.setData({
        isPlayingMusic: true,
        currentIndex: this.data.result.index // 记录当前播放音乐索引
      })
    }

    this.setMusicMonitor(backgroundAudioManager)
  },

  setMusicMonitor(backgroundAudioManager) {
    var that = this

    backgroundAudioManager.onPlay(function () { // 监听播放状态
      if (that.data.index === that.data.currentIndex) {
        that.setData({
          isPlayingMusic: true
        })
      }
    })

    backgroundAudioManager.onPause(function () { // 监听暂停状态
      if (that.data.index === that.data.currentIndex) {
        that.setData({
          isPlayingMusic: false
        })
      }
    })

    backgroundAudioManager.onEnded(function () { // 监听自然播放完成状态
      // 播放完成之后清除播放状态缓存
      that.setData({
        isPlayingMusic: false,
        currentIndex: 0
      })
    })
  },
})