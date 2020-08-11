Component({
  properties: {
    quantity: {
      // 初始商品数量
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        this.setData({
          localQuantity: newVal
        })
      }
    }
  },

  data: {
    localQuantity: 0
  },

  lifetimes: {
    attached() {}
  },

  methods: {
    // 优惠券数量增减
    changeQty(e) {
      // 获取初始时间戳（默认为 0)
      let timeStamp = this.timeStamp || 0
      // 获取当前时间戳
      let nowTime = Date.now()
      if (nowTime - timeStamp < 300) {
        return
      }
      this.timeStamp = nowTime

      const isAdd = e.currentTarget.dataset.isAdd // 增加标志（true --> 为增；false --> 为减）
      if (isAdd) {
        this.setData({
          localQuantity: ++this.data.localQuantity
        })
        this.triggerEvent('add-animate', { el: e })
      } else {
        this.setData({
          localQuantity: this.data.localQuantity <= 0 ? 0 : --this.data.localQuantity
        })
      }
    }
  },

  observers: {
    localQuantity(newVal) {
      this.triggerEvent('set-quantity', newVal)
    }
  }
})