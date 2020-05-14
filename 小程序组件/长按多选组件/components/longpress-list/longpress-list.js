Component({
  externalClasses: ['my-class'],

  properties: {
    // 长按弹窗显示
    longpressPopShowFlag: {
      type: Boolean,
      value: false
    },

    // 全选标志
    checkAllFlag: {
      type: Boolean,
      value: false
    },

    // 选中数量
    multipleNumber: {
      type: Number,
      value: 0
    },

    // 底部操作显示标志
    radioShow: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    // 全选事件
    selectAllTap() {
      this.triggerEvent('select-all-tap', !this.data.checkAllFlag)
    },

    // 长按操作选择结束
    longpressEventDone(e) {
      const tapIndex = Number(e.detail.tapIndex)

      if (tapIndex === 0) {
        // 删除
        this.triggerEvent('handle-delete', { type: 'single' })
      } else if (tapIndex === 1) {
        // 多选删除
        this.setData({
          radioShow: true
        })
      }

      // 隐藏长按弹窗
      this.setData({
        longpressPopShowFlag: false
      })
    },

    // 取消
    cancel() {
      this.setData({
        radioShow: false
      })
      this.triggerEvent('select-all-tap', false)
    },

    // 删除
    confirm() {
      this.triggerEvent('handle-delete', { type: 'multiple' })
    }
  }
})