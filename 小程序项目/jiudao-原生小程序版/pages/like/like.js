const app = getApp()

Page({
  data: {
    like_list: [],
    userInfo: {},
  },

  onLoad(options) {
    
  },

  onShow() {
    // 获取喜欢的期刊
    let star_list = wx.getStorageSync('star_list')
    if (star_list) {
      let like_list = [] // 用来存储喜欢项的列表

      star_list.forEach((item, index) => {
        // 获取喜欢状态
        let { like_status } = item

        if (like_status) { // 如果状态为喜欢，则添加
          like_list.push(item)
        }

        this.setData({
          like_list
        })
      })
    }
  }
})