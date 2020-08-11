// 添加购物车共享数据
const addCartBehavior = Behavior({
  data: {
    // 当前操作的商品
    currentGoodsItem: null,
    // 选规格弹窗显示标志
    visible: false,
    // 当前商家购物车列表
    localCartList: [],
  },

  methods: {
    // 选择规格弹窗
    chooseSpecsTap({ currentTarget: { dataset } }) {
      let foodItem = {}
      if (this.data.pageType === 'storeTakeaway') {
        const { categroyIndex, foodIndex } = dataset
        foodItem = this.data.goodsList[categroyIndex].foodsList[foodIndex]
      } else if (this.data.pageType === 'goodsDetail') {
        foodItem = dataset.item
      }

      this.setData({
        visible: true,
        currentGoodsItem: foodItem
      })
    },

    // 设置商品数量
    setQuantity({ detail, currentTarget: { dataset } }) {
      const quantity = detail
      const { type } = dataset

      if (type === 'spec') {
        /* 规格弹窗组件事件 */

        // 保存到购物车
        this._saveCartList(quantity)
      } else if (type === 'add') {
        /* 商品列表组件事件 */

        let foodItem = {}
        if (this.data.pageType === 'storeTakeaway') {
          const { categroyIndex, foodIndex } = dataset
          foodItem = this.data.goodsList[categroyIndex].foodsList[foodIndex]
        } else if (this.data.pageType === 'goodsDetail') {
          foodItem = dataset.item
        }

        // 当商品数量未改变时，不执行更新操作
        if (foodItem.attrIndex[foodItem.attrIndex.length - 1] === quantity) return
        
        // 更新商品总数量
        foodItem.localQuantity = quantity
        foodItem.attrIndex[foodItem.attrIndex.length - 1] = quantity

        // 保存到购物车
        this._saveCartList(foodItem)
      } else if (type === 'cart') {
        /* 购物车列表组件事件 */

        const { index, quantity } = detail
        const localCartList = this.data.localCartList

        // 当商品数量未改变时，不执行更新操作
        if (localCartList[index].f_number === quantity) return

        // 更新购物车列表商品数量
        localCartList[index].f_number = quantity
        localCartList[index].attrIndex[localCartList[index].attrIndex.length - 1] = quantity
        
        // 更新当前商品数据
        this._updateGoodsItem(localCartList[index], localCartList)
        this.setData({
          updateListFlag: false,
          localCartList
        })
      }
    },

    // 加入购物车动画
    handleAddAnimate(e) {
      // 获取购物车组件
      const cartEle = this.selectComponent('#cart')
      if (!cartEle) return
      cartEle._drop(e.detail.el)
    },

    // 清空购物车
    clearCartTap() {
      this.data.localCartList.forEach(item => {
        item.f_number = 0
        // 初始化属性列表数量
        item.attrIndex[item.attrIndex.length - 1] = 0
      })

      this.setData({
        updateListFlag: true,
        localCartList: this.data.localCartList
      })
    },

    // 保存购物车数据
    _saveCartList(data) {
      const localCartList = this.data.localCartList
      // 查找当前购物车列表中是否已经有该商品
      const cartIndex = localCartList.findIndex(item => {
        return data.chooseSpecs === item.f_specs && data.f_id === item.f_id
      })
      // 深复制一份属性索引
      const copyAttrIndex = JSON.parse(JSON.stringify(data.attrIndex))

      if (cartIndex === -1) {
        /* 不存在 */
        
        // 获取属性 Id 列表
        const idList = data.foodsProperties.map((item, index) => item.foodsValues[data.attrIndex[index]].fv_id)
        
        // 向购物车列表开头添加一项
        localCartList.unshift({
          ft_id: data.ft_id, // 分类 Id
          f_id: data.f_id, // 商品 Id
          fs_id: data.foodsSpecs[data.specIndex].fs_id, // 规格 Id
          fv_id: idList, // 属性 Id 列表
          key: `${data.f_id}-${data.chooseSpecs}`, // 唯一标识
          specIndex: data.specIndex, // 规格索引
          attrIndex: copyAttrIndex, // 属性索引
          f_name: data.f_name,
          f_image: data.f_image,
          f_price: data.choosePrice,
          f_specs: data.chooseSpecs,
          f_number: copyAttrIndex[copyAttrIndex.length - 1], // 商品数量
          f_label: data.foodsLabel
        })
        this._updateGoodsItem(localCartList[0], localCartList)

      } else {
        /* 存在 */
        
        // 更新数量
        localCartList[cartIndex].f_number = data.attrIndex[data.attrIndex.length - 1]
        // 更新属性索引
        localCartList[cartIndex].attrIndex = copyAttrIndex
        this._updateGoodsItem(localCartList[cartIndex], localCartList)
        // 将当前项移入第一项
        localCartList.unshift(...localCartList.splice(cartIndex, 1))
      }

      this.setData({
        updateListFlag: false,
        localCartList
      })
    }
  }
})

module.exports = {
  addCartBehavior
}