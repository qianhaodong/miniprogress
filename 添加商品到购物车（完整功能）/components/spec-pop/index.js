Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },

    goodsItem: {
      type: Object,
      value: {}
    },

    cartList: {
      type: Array,
      value: []
    }
  },

  data: {},

  methods: {
    // 弹窗蒙版显示时 - 禁止页面滚动
    stopTouchMove() { return false },

    // 关闭选择规格弹窗
    closePopTap() {
      this.setData({ visible: false })
    },

    // 选择商品属性/规格
    chooseSpecsItem({ currentTarget: { dataset } }) {
      const {
        // 属性索引
        index,
        // 属性项索引
        attrIndex,
        type
      } = dataset
      const { goodsItem } = this.data

      if (type === 'specs') {
        this.setData({ 'goodsItem.specIndex': index })
        // 更新选中价格
        this.setData({ 'goodsItem.choosePrice': goodsItem.foodsSpecs[index].fs_price })

        // 更新选中规格
        let temp = goodsItem.chooseSpecs.split('、')
        temp.splice(0, 1, `${goodsItem.foodsSpecs[index].fs_name}（${goodsItem.foodsSpecs[index].fs_weight}）`)
        this.setData({ 'goodsItem.chooseSpecs': temp.join('、') })
      } else if (type === 'attrs') {
        // 更新属性索引列表
        this.setData({ [`goodsItem.attrIndex[${index}]`]: attrIndex })

        // 更新选中属性
        let temp = goodsItem.chooseSpecs.split('、')
        temp.splice(index + 1, 1, goodsItem.foodsProperties[index].foodsValues[attrIndex].fv_content)
        this.setData({ 'goodsItem.chooseSpecs': temp.join('、') })
      }

      const cartItem = this.data.cartList.find(item => {
        // 当前选择的商品属性索引
        const attrIndex1 = goodsItem.attrIndex.slice(0, goodsItem.attrIndex.length - 1).toString()
        // 购物车商品属性索引
        const attrIndex2 = item.attrIndex.slice(0, item.attrIndex.length - 1).toString()
        
        if (goodsItem.f_id == item.f_id && goodsItem.specIndex == item.specIndex && attrIndex1 === attrIndex2) return item
      })
      
      // 更新组件所在页面的当前操作商品
      this.triggerEvent('update-goods-item', this.data.goodsItem)

      // 更新商品数量（属性索引列表最后一项）
      this.setData({
        [`goodsItem.attrIndex[${goodsItem.attrIndex.length - 1}]`]: cartItem ? cartItem.f_number : 0
      })
    },

    // 加入购物车
    addCartTap(e) {
      /* 节流处理 */

      // 获取初始时间戳（默认为 0）
      let timeStamp = this.timeStamp || 0
      // 获取当前时间戳
      let nowTime = Date.now()
      if (nowTime - timeStamp < 300) return
      this.timeStamp = nowTime

      this.handleAddAnimate({ detail: { el: e } })
      // 设置商品数量
      this.setQuantity({ detail: 1 })
    },

    handleAddAnimate(e) {
      this.triggerEvent('handle-add-animate', { el: e.detail.el })
    },

    setQuantity(e) {
      const quantity = e.detail
      const { goodsItem } = this.data

      // 当商品数量未改变时，不执行更新操作
      if (goodsItem.attrIndex[goodsItem.attrIndex.length - 1] === quantity) return

      // 更新属性索引列表（商品数量）
      this.setData({ [`goodsItem.attrIndex[${goodsItem.attrIndex.length - 1}]`]: quantity })
      this.triggerEvent('set-quantity', this.data.goodsItem)
    }
  }
})
