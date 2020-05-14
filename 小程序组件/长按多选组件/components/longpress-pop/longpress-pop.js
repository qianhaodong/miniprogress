Component({
  properties: {
    longpressPopShowFlag: {
      type: Boolean,
      value: false
    },

    longpressList: {
      type: Array,
      value: [
        {
          txt: '删除',
          color: '#ff4247'
        },
        {
          txt: '多选删除'
        }
      ]
    }
  },

  data: {
    animateMask: '',
    animatePop: ''
  },

  methods: {
    longpressItemTap(e) {
      this.triggerEvent('longpress-event-done', {
        tapIndex: e.currentTarget.dataset.index
      })
    },

    longpressPopHide() {
      this.setData({
        animateMask: 'fadeOut',
        animatePop: 'slideOutDown'
      })
      const timer = setTimeout(() => {
        this.setData({
          longpressPopShowFlag: false
        })
        clearTimeout(timer)
      }, 150)
    },
  },
  
  observers: {
    longpressPopShowFlag(newVal) {
      if (newVal) {
        this.setData({
          animateMask: 'fadeIn',
          animatePop: 'slideInUp'
        })
      }
    }
  }
})
