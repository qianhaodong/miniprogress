const windowHeight = wx.getSystemInfoSync().windowHeight

// 创建小球
function createBalls() {
  let balls = []
  for (let i = 0; i < 10; i++) {
    balls.push({ show: false })
  }
  return balls
}

Component({
  properties: {
    diffPrice: {
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        if (newVal) {
          this.setData({
            localDiffPrice: newVal.toFixed(2)
          })
          this._calculateCartPrice(this.data.cartList)
        }
      }
    },

    cartList: {
      type: Array,
      value: []
    },

    storeInfo: {
      type: Object,
      value: {}
    },
  },

  data: {
    goodsPrice: '0.00', // 购物车商品金额
    goodsNumber: 0, // 购物车商品数量
    cartPopShow: false,
    balls: createBalls(),
    ballStyle: '',
    ballInnerStyle: '',
  },

  lifetimes: {
    attached() {
      this.dropBalls = []
    }
  },

  methods: {
    // 购物车列表弹窗显示
    cartPopShowTap() {
      if (this.data.cartList.every(item => !item.f_number)) return
      this.setData({
        cartPopShow: true
      })
    },

    // 购物车列表弹窗隐藏
    cartPopHideTap() {
      this.setData({
        cartPopShow: false
      })
    },

    // 清空产品,购物车
    clearCartTap() {
      this.triggerEvent('clear-cart-tap')
    },

    // 更改数量
    setQuantity(e) {
      this.triggerEvent('set-quantity', {
        index: e.currentTarget.dataset.index,
        quantity: e.detail
      })
    },

    handleAddAnimate(e) {
      this._drop(e.detail.el)
    },

    // 去结算
    submitTap() {
      if (this.data.goodsNumber && this.data.localDiffPrice <= 0) {
        wx.showToast({
          title: '跳转结算页面',
          icon: 'none',
          duration: 3000
        })
      }
    },

    ballTransitionend({ currentTarget: { dataset } }) {
      this.dropBalls.shift()
      this.setData({
        [`balls[${dataset.index}].show`]: false,
        [`balls[${dataset.index}].ballStyle`]: '',
        [`balls[${dataset.index}].ballInnerStyle`]: '',
        dropBalls: this.dropBalls
      })
    },

    _drop(el) {
      for (let i = 0; i < this.data.balls.length; i++) {
        const ball = this.data.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          ball.index = i
          this.dropBalls.push(ball)
          this._dropAnimate()
          return
        }
      }
    },
    
    // 小球动画
    _dropAnimate() {
      // 获取添加的小球
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const x = ball.el.touches[0].clientX - 40
      const y = - (windowHeight - ball.el.touches[0].clientY - 16)
      let ballStyle = `transform: translate3d(0, ${y}px, 0)`
      let ballInnerStyle = `transform: translate3d(${x}px, 0, 0)`
      this.setData({
        [`balls[${ball.index}].ballStyle`]: ballStyle,
        [`balls[${ball.index}].ballInnerStyle`]: ballInnerStyle
      }, () => {
        this.setData({
          [`balls[${ball.index}].show`]: true
        })
      })
    },

    // 计算商品总价格
    _calculateCartPrice(list) {
      if (!list.length) {
        this.setData({
          goodsNumber: 0, // 商品总数量
          goodsPrice: '0.00' // 商品总价格
        })
        return
      }

      // 计算商品总数量
      let goodsNumber = list.reduce((total, item) => {
        return total + item.f_number
      }, 0)

      // 计算商品总价格
      let goodsPrice = list.reduce((total, item) => {
        return total + item.f_number * parseFloat(item.f_price)
      }, 0)

      this.setData({
        goodsNumber,
        goodsPrice: goodsPrice.toFixed(2),
        // 差价
        localDiffPrice: (Number(this.data.diffPrice) - Number(goodsPrice)).toFixed(2)
      })
    },
  },

  observers: {
    cartList(list) {
      // 当购物车所有商品数量都为 0 时
      if (list.every(item => !item.f_number)) {
        this.setData({
          cartPopShow: false
        })
      }
      
      // 计算购物车商品价格和数量
      this._calculateCartPrice(list)
    }
  }
})
