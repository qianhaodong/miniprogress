const util = require('../../utils/util.js')

Component({
  properties: {
    starStatus: { // 期刊状态对象
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    local_status: {}
  },

  lifetimes: {
    attached() {
      
    }
  },

  observers: {
    starStatus(newVal) {
      if (!Object.keys(newVal).length) return

      let star_list = wx.getStorageSync('star_list')
      if (star_list) {
        
        // 先判断本地存储中有无当前项的点赞信息
        let index = star_list.findIndex((item) => {
          return util.isObjectValueEqual(item, newVal)
        })
        
        if (index > -1) { // 有当前项的点赞信息
          this.setData({
            local_status: star_list[index]
          })
        } else { // 无当前项的点赞信息
          this.setData({
            local_status: newVal
          })

          // 保存点赞状态到本地存储
          star_list.push(this.data.local_status)
          wx.setStorageSync('star_list', star_list)
        }
      } else {
        let star_list = [] // 用于存储点赞信息到本地

        // 更改点赞状态
        this.setData({
          local_status: newVal
        })
        
        // 保存点赞状态
        star_list.push(this.data.local_status)
        wx.setStorageSync('star_list', star_list)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onStarTap(e) {
      let star_list = wx.getStorageSync('star_list')
      let { id, type, fav_nums, like_status } = this.data.local_status

      // 判断点赞数量的增与减
      if (like_status) {
        fav_nums--
      } else {
        fav_nums++
      }
      
      // 更改点赞状态
      this.setData({
        local_status: {
          id: id,
          type: type,
          fav_nums: fav_nums,
          like_status: !like_status
        }
      })

      // 保存点赞状态
      let index = star_list.findIndex((item) => {
        return util.isObjectValueEqual(item, this.data.local_status)
      })
      star_list.splice(index, 1, this.data.local_status)
      wx.setStorageSync('star_list', star_list)
    
    }
  }
})
