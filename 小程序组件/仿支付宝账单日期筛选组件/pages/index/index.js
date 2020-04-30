Page({
  data: {
    pickerDateShow: false
  },

  onLoad(options) {
    this._initData()
  },

  show() {
    this.setData({
      pickerDateShow: true
    })
  },

  // 日期选择完成事件
  pickerDateDone(e) {
    // 完成日期选择时执行
    if (e.detail.type === 'confirm') {
      const date = e.detail.date.content

      // 初始化 按月 / 按日 请求参数
      let monORday = 0
      if (e.detail.date.type === 'month') { // 按月
        monORday = 0
      } else if (e.detail.date.type === 'day') { // 按日
        monORday = 1
      }

      this.setData({
        date,
        monORday,
        pickerDate: date.split(','),
        page: 1,
        orderList: []
      })

      this._getTakeawayOrderList()
    }

    this.setData({
      pickerDateShow: false
    })
  },

  // 初始化数据
  _initData() {
    // 获取当前日期
    const currentDate = this._getCurrentDate()
    const date = `${currentDate.year}-${currentDate.month},${currentDate.year}-${currentDate.month}`

    this.setData({
      date,
      pickerDate: date.split(','),
    })
  },

  // 获取当前日期
  _getCurrentDate() {
    const date = new Date()
    let year, month, day

    // 获取当前日期
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()

    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day

    return {
      year,
      month,
      day
    }
  }
})