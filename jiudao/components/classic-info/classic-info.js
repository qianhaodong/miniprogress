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
    star_status: {} // 记录期刊状态
  },

  lifetimes: {
    attached() {

    }
  },

  observers: {
    result(result) {
      if (!Object.keys(result).length) return

      let { id, type, fav_nums } = this.data.result
      this.setData({
        star_status: {
          id: id,
          type: type,
          fav_nums: fav_nums,
          like_status: false
        }
      })
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
