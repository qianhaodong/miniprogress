Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicShow: false,
    isPlayingMusic: false,
    category: 'movie',
    currentIndex: 0
  },
  
  lifetimes: {
    created() {
      console.log(this.properties.result)
    },

    attached() {
      this.showData()
      var type = this.data.result.type  // 获取结果类型
      var category = ''                 // 记录类型图标
      var musicShow = false             // 记录音乐播放器显示状态
      var isPlayingMusic = false        // 记录音乐播放状态

      console.log(this.properties.result)

      // 判断类型，显示对应icon和显示音乐播放器
      switch (type) {
        case 100:
          category = 'movie'
          musicShow = false
          // console.log('movie')
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
        category: category,
        musicShow: musicShow
      })
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showData() {
      console.log(this.data)
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
    }
  }

  })