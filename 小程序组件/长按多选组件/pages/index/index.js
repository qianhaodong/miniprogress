Page({
  data: {
    radioShow: false, // 多选按钮显示标志
    longpressPopShowFlag: false, // 长按弹窗显示标志
    checkAllFlag: false, // 全选标志
    multipleNumber: 0, // 多选删除选中数量
    list: [
      { id: 1, txt: '列表1' },
      { id: 2, txt: '列表2' },
      { id: 3, txt: '列表3' },
      { id: 4, txt: '列表4' },
      { id: 5, txt: '列表5' },
      { id: 6, txt: '列表6' },
      { id: 7, txt: '列表7' },
      { id: 8, txt: '列表8' },
      { id: 9, txt: '列表9' },
      { id: 10, txt: '列表10' },
      { id: 11, txt: '列表11' },
      { id: 12, txt: '列表12' },
      { id: 13, txt: '列表13' },
      { id: 14, txt: '列表14' },
      { id: 15, txt: '列表15' },
    ]
  },

  onLoad(options) {
    // 添加选中状态
    const { list } = this.data
    list.forEach(item => item.checked = false)
  },

  /* 多选删除逻辑处理 - start */

  // 长按弹窗显示
  longpressPopShow(e) {
    this.setData({
      itemId: e.currentTarget.dataset.id,
      currentIndex: e.currentTarget.dataset.index,
      longpressPopShowFlag: true
    })
  },

  // 优惠券选中状态切换
  handleSelectedTap(e) {
    const index = e.currentTarget.dataset.index
    const list = this.data.list

    list[index].checked = e.detail

    this.setData({
      list
    })
    this._checkSelectAll(list)
  },

  // 全选事件
  selectAllTap(e) {
    const checkAllFlag = e.detail
    const list = this.data.list

    list.forEach(item => {
      if (checkAllFlag) {
        item.checked = true
      } else {
        item.checked = false
      }
    })

    this.setData({
      list,
      checkAllFlag
    })
    this._checkSelectAll(list)
  },

  // 删除处理
  handleDelete(e) {
    const { type } = e.detail
    const {
      list,
      itemId,
      currentIndex
    } = this.data

    let idList = [], content = '是否删除所选项？'
    if (type === 'single') {
      // 单选删除
      content = `是否删除（${list[currentIndex].txt}）？`
      idList.push(itemId)
    } else if (type === 'multiple') {
      // 多选删除
      idList = list.filter(item => item.checked).map(item => item.id)
    }

    if (!idList.length) {
      wx.showToast({
        title: '请选择要删除的项',
        icon: 'none',
        duration: 3000
      })
      return
    }

    wx.showModal({
      title: '删除提示',
      content,
      success: res => {
        if (res.confirm) {
          this._deleteItem(idList)
        }
      }
    })
  },

  _deleteItem(idList) {
    let { list } = this.data
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
    const timer = setTimeout(() => {
      // 过滤掉选中项
      list = list.filter(item => !idList.includes(item.id))
      this.setData({
        list,
        radioShow: false,
        multipleNumber: 0
      })
      clearTimeout(timer)
    }, 500)
  },

  // 检查是否全选和统计选中数量
  _checkSelectAll(list) {
    if (!list.length) return
    this.setData({
      checkAllFlag: list.every(item => item.checked),
      multipleNumber: list.filter(item => item.checked).length
    })
  },

  /* 多选删除逻辑处理 - end */
})