const { addCartBehavior } = require('../../common/js/behaviors')
const { getAllFoods } = require('../../api/index')

const CART_LIST = 'CART_LIST'

Component({
  behaviors: [addCartBehavior],
  data: {
    // 页面类型
    pageType: 'storeTakeaway',
    // 商家 Id
    storeId: 1,
    // 起送价格
    diffPrice: 20,
    // 分类菜单列表
    categroyMenu: [],
    // 分类菜单索引
    categroyMenuIndex: 0,
    // 商品内容块索引
    contentIndex: 0,
    // 商品列表
    goodsList: [],
    // 无内容标志
    noResult: false,
  },

  methods: {
    onLoad(options) {
      // 从缓存获取购物车商品
      const storeCartList = wx.getStorageSync(CART_LIST) || []
      // 获取当前商家购物车列表
      let localCartList = storeCartList.find(item => item.storeId == this.data.storeId)
      localCartList = localCartList ? localCartList.cartList : []

      this.storeCartList = storeCartList
      this.setData({
        updateListFlag: false,
        localCartList
      })
      
      // 获取商品列表
      this._getAllFoods()
    },

    // 进入商品详情页
    navToGoodsDetail({ currentTarget: { dataset } }) {
      wx.navigateTo({
        url: '/pages/goodsDetail/goodsDetail',
        events: {
          /* 更新商品列表 */
          'updateCartList': () => {
            // 从缓存获取购物车商品
            wx.getStorage({
              key: CART_LIST,
              success: ({ data: storeCartList = [] }) => {
                // 获取当前商家购物车列表
                let localCartList = storeCartList.find(item => item.storeId == this.data.storeId)
                localCartList = localCartList ? localCartList.cartList : []
                
                this.storeCartList = storeCartList
                this.setData({
                  updateListFlag: true,
                  localCartList
                })
              }
            })
          }
        },
        success: res => {
          res.eventChannel.emit('goodsDetail', {
            goodsDetail: dataset.foodItem,
            storeId: this.data.storeId,
            diffPrice: this.data.diffPrice
          })
        }
      })
    },

    // 分类菜单切换
    categroyMenuTap({ currentTarget: { dataset } }) {
      const { index } = dataset

      this.setData({
        categroyMenuIndex: index,
        contentIndex: index,
        // 分类导航滚动距离
        navScrollTop: (index - 1) * 48
      })
    },

    // 商品列表滚动事件
    onMainScroll({ detail }) {
      const { scrollTop, deltaY } = detail
      const { goodsList } = this.data

      // 当 scroll-view 组件向上滚动，并且滚动距离小于 100px 时执行
      /* if (scrollTop < 100 && deltaY < 0) {
        // 滚动到底部
        wx.pageScrollTo({
          scrollTop: 9999,
          duration: 0
        })
      } */

      for (let i = 0; i < goodsList.length; i++) {
        if (scrollTop > goodsList[i].top && scrollTop < goodsList[i].bottom) {
          // 当处于当前分类时，不重复执行 setData ，解决滚动性能问题
          if (this.data.categroyMenuIndex === i) return
          this.setData({
            navScrollTop: (i - 1) * 48,
            categroyMenuIndex: i
          })
        }
      }
    },

    // 获取商品列表
    _getAllFoods() {
      // 初始化无内容标志
      this.setData({ noResult: false })
      
      getAllFoods().then(res => {
        if (res.data.state === 1) {
          const data = res.data.dataObject
          let goodsList = data.foodsTypes || []

          // 筛选掉没有商品的分类
          goodsList = goodsList.filter(item => item.foodsCount !== 0 && item.foodsList.length !== 0)

          // 提取分类列表
          const foodsTypes = goodsList.map(item => {
            return { ft_name: item.ft_name }
          })
          this.setData({ categroyMenu: foodsTypes })

          // 当没有商品时，显示提示
          if (!this.data.categroyMenu.length) {
            this.setData({ noResult: true })
            return
          }

          // 处理商品数据
          goodsList = this._goodsListHandler(goodsList)
          
          // 先将页面需要数据 setData 到视图层，再添加其它数据
          this.setData({ goodsList }, () => {
            // 添加节点高度属性
            let tabHeight = 0
            for (let i = 0; i < goodsList.length; i++) {
              // 获取节点相关信息
              this.createSelectorQuery().select('#main-' + i)
                .fields({
                  size: true
                }, res => {
                  goodsList[i].top = tabHeight
                  tabHeight += res.height
                  goodsList[i].bottom = tabHeight
                })
                .exec()
            }

            // 将缓存中购物车数据还原到商品列表
            this._updateGoodsList(this.data.localCartList)
          })
        } else {
          if (res.data.showContent) {
            wx.showToast({
              title: res.data.showContent,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    },

    /**
     * @method 处理商品数据
     * 
     * @param { Array } list 商品列表
     */
    _goodsListHandler(list) {
      // 筛选需要的数据（防止数据过大，影响 setData 性能）
      list = list.map(item => {
        return {
          ft_id: item.ft_id,
          ft_name: item.ft_name,
          foodsList: item.foodsList.map(food => {
            return {
              f_id: food.f_id,
              f_name: food.f_name,
              f_desc: food.f_desc,
              // 原图
              f_image: food.f_image,
              // 压缩图
              f_logo: food.f_logo,
              salesVolumeInMonth: food.salesVolumeInMonth,
              foodsLabel: food.foodsLabel,
              foodsSpecs: food.foodsSpecs.map(spec => {
                return {
                  fs_id: spec.fs_id,
                  fs_name: spec.fs_name,
                  fs_price: spec.fs_price,
                  fs_weight: spec.fs_weight
                }
              }),
              foodsProperties: food.foodsProperties.map(attr => {
                return {
                  fp_content: attr.fp_content,
                  foodsValues: attr.foodsValues.map(subAttr => {
                    return {
                      fv_id: subAttr.fv_id,
                      fv_content: subAttr.fv_content
                    }
                  }),
                }
              }),
            }
          }),
        }
      })

      // 遍历列表，增加自定义数据
      list.forEach(good => {
        good.foodsList.length && good.foodsList.forEach(item => {
          // 初始化当前商品选择总数量
          item.localQuantity = 0
          // 添加分类 Id 和分类名称属性
          item.ft_id = good.ft_id
          item.ft_name = good.ft_name

          // 没有规格时不执行
          if (!item.foodsSpecs.length) return

          // 处理价格（最小价格 ~ 最大价格）
          const priceList = item.foodsSpecs.map(item => item.fs_price)
          const maxPrice = Math.max(...priceList)
          const minPrice = Math.min(...priceList)
          item.localPrice = maxPrice === minPrice ? maxPrice : `${minPrice}-${maxPrice}`

          // 当只有一个规格，且只有一个（或没有）属性时（设置选择规格标志）
          if (item.foodsSpecs.length === 1 && (!item.foodsProperties.length || (item.foodsProperties.length === 1 && item.foodsProperties[0].foodsValues.length === 1))) {
            item.chooseSpecsFlag = false
          } else {
            item.chooseSpecsFlag = true
          }

          // 初始化所选价格和规格索引
          item.choosePrice = item.foodsSpecs[0].fs_price
          item.specIndex = 0

          // 初始化所选商品和属性索引
          if (item.foodsProperties.length) {
            const attrsList = item.foodsProperties.map(value => value.foodsValues[0].fv_content).join('、')
            item.attrIndex = item.foodsProperties.map(() => 0)
            // 属性数组末尾添加数量（默认为 0）
            item.attrIndex.push(0)
            item.chooseSpecs = `${item.foodsSpecs[0].fs_name}（${item.foodsSpecs[0].fs_weight}）、${attrsList}`
          } else {
            // 属性数组末尾添加数量（默认为 0）
            item.attrIndex = [0]
            item.chooseSpecs = `${item.foodsSpecs[0].fs_name}（${item.foodsSpecs[0].fs_weight}）`
          }
        })
      })

      return list
    },

    /**
     * @method 更新商品列表数据
     * 
     * @param { Array } list 购物车商品列表
     */
    _updateGoodsList(list) {
      if (list.length) {
        // 深复制一份，并反转排序（最先添加的在最上面）
        list = JSON.parse(JSON.stringify(list))
        list.reverse()

        // 将购物车商品数据还原到商品展示列表
        for (let i = 0; i < list.length; i++) {
          this._updateGoodsItem(list[i], list)
        }
      }
    },

    // 更新所选商品
    _updateGoodsItem(item, list) {
      const { goodsList } = this.data
      // 获取分类索引
      const categroyIndex = goodsList.findIndex(value => value.ft_id === item.ft_id)
      if (categroyIndex === -1) return

      // 获取商品索引
      const foodIndex = goodsList[categroyIndex].foodsList.findIndex(value => value.f_id === item.f_id)
      if (foodIndex === -1) return

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
        // 保存最后一次添加的商品规格和属性索引
        [`goodsList[${categroyIndex}].foodsList[${foodIndex}].specIndex`]: item.specIndex,
        [`goodsList[${categroyIndex}].foodsList[${foodIndex}].attrIndex`]: JSON.parse(JSON.stringify(item.attrIndex)),
        // 保存最后一次添加的规格属性和价格
        [`goodsList[${categroyIndex}].foodsList[${foodIndex}].chooseSpecs`]: item.f_specs,
        [`goodsList[${categroyIndex}].foodsList[${foodIndex}].choosePrice`]: item.f_price,
        // 更新当前商品总数量
        [`goodsList[${categroyIndex}].foodsList[${foodIndex}].localQuantity`]: tempNum
      })
    },
  },

  observers: {
    localCartList(newVal) {
      const {
        storeId,
        goodsList,
        // 更新商品列表标志
        updateListFlag
      } = this.data
      const storeCartList = this.storeCartList || []

      // 更新商品列表
      if (goodsList.length && updateListFlag) {
        this._updateGoodsList(newVal)
      }

      // 更新缓存
      const index = storeCartList.findIndex(item => item.storeId == storeId)
      if (index !== -1) {
        // 保存数量不为 0 的商品到缓存
        storeCartList[index].cartList = newVal.filter(item => !!item.f_number)
      } else {
        storeCartList.push({
          storeId,
          cartList: newVal
        })
      }

      wx.setStorage({
        data: storeCartList,
        key: CART_LIST
      })
    }
  }
})