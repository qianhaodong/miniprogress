const { addCartBehavior } = require('../../common/js/behaviors.js')

const CART_LIST = 'CART_LIST'

Component({
  behaviors: [addCartBehavior],
  data: {
    pageType: 'goodsDetail'
  },

  methods: {
    onLoad(options) {
      // 获取打开页面数据事件处理器
      const eventChannel = this.getOpenerEventChannel()
      this.eventChannel = eventChannel
      eventChannel.on('goodsDetail', data => {
        this.storeId = data.storeId
        this.setData({
          currentGoodsItem: data.goodsDetail,
          diffPrice: data.diffPrice
        })

        // 从缓存获取购物车商品
        wx.getStorage({
          key: CART_LIST,
          success: ({ data: storeCartList = [] }) => {
            // 获取当前商家购物车列表
            let localCartList = storeCartList.find(item => item.storeId == this.storeId)
            localCartList = localCartList ? (localCartList.cartList) : []
  
            this.storeCartList = storeCartList
            this.setData({
              updateListFlag: false,
              localCartList
            })
          }
        })
      })
    },

    // 更新商品数量
    _updateGoodsNumber(list) {
      list.forEach(item => {
        // 获取商品索引
        if (this.data.currentGoodsItem.f_id === item.f_id) {
          this._updateGoodsItem(item, list)
        }
      })
    },

    // 更新所选商品
    _updateGoodsItem(item, list) {
      const { currentGoodsItem } = this.data
      // 不是当前商品时不执行
      if (currentGoodsItem.f_id !== item.f_id) return

      // 计算当前商品总数量
      let tempNum = 0, result = []
      // 提取数量
      list.forEach(value => {
        if (value.f_id == item.f_id) {
          result.push(value.f_number)
        }
      })
      // 计算总数量
      tempNum = result.reduce((total, next) => (total + next), tempNum)

      this.setData({
        // 保存最后一次添加的商品索引
        'currentGoodsItem.specIndex': item.specIndex,
        'currentGoodsItem.attrIndex': item.attrIndex,
        // 保存最后一次添加的规格属性和价格
        'currentGoodsItem.chooseSpecs': item.f_specs,
        'currentGoodsItem.choosePrice': item.f_price,
        // 更新当前商品总数量
        'currentGoodsItem.localQuantity': tempNum
      })
    }
  },

  observers: {
    localCartList(newVal) {
      const { currentGoodsItem, updateListFlag } = this.data
      const storeCartList = this.storeCartList || []
      
      if (currentGoodsItem && updateListFlag) {
        this._updateGoodsNumber(newVal)
      }

      // 更新缓存
      const index = storeCartList.findIndex(item => item.storeId == this.storeId)
      if (index !== -1) {
        // 保存数量不为 0 的商品到缓存
        storeCartList[index].cartList = newVal
      } else {
        storeCartList.push({
          storeId: this.storeId,
          cartList: newVal
        })
      }
      
      wx.setStorage({
        data: storeCartList,
        key: CART_LIST,
        success: () => {
          // 更新上一级页面该商品
          this.eventChannel.emit('updateCartList')
        }
      })
    }
  }
})