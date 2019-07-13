const util = require('../../utils/util.js')

Component({
  properties: {
    starStatus: {
      type: Object,
      value: {}
    }
  },

  data: {
    likeType: '',
    type: '',
    id: '',
    isMusicType: false,
    like_item: {}
  },

  observers: {
    starStatus(newVal) {
      if (!Object.keys(newVal).length) return

      // console.log(newVal)
      let {id, type} = newVal
      let url = `http://bl.7yue.pro/v1/classic/${type}/${id}?appkey=RdshydjBvcYZhMZC`
      let likeType = '电影'
      let isMusicType = false
      
      switch(type) {
        case 100:
          likeType = '电影'
          break
        case 200:
          likeType = '音乐'
          isMusicType = true
          break
        case 300:
          likeType = '诗句'
          break
      }

      this.setData({
        likeType,
        type,
        id,
        isMusicType
      })
      
      util.http(url, (result, key) => {
        if (result) {
          this.setData({
            [key]: result
          })
          // console.log(this.data.like_item)
        } else {
          console.log('Request Error')
        }
      }, 'like_item')
    }
  },

  methods: {
    onLikeDetailTap(e) {
      let type = e.currentTarget.dataset.type
      let id = e.currentTarget.dataset.id
      
      wx.navigateTo({
        url: `/pages/like-detail/like-detail?type=${type}&id=${id}`
      })
    }
  }
})
