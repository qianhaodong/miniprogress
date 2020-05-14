Component({
  options: {
    multipleSlots: true
  },

  externalClasses: ['my-class'],

  properties: {
    checked: {
      type: Boolean,
      value: false
    },

    radioShow: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    // 长按事件处理器
    longpressHandler(e) {
      // 处于长按状态时，禁止触发长按事件
      if (this.data.radioShow) return
      this.triggerEvent('longpress-pop-show')
    },

    // 选中状态切换
    selectedTap(e) {
      // 不处于多选状态时，禁止事件
      if (!this.data.radioShow) return
      this.triggerEvent('handle-selected-tap', !this.data.checked)
    },
  }
})