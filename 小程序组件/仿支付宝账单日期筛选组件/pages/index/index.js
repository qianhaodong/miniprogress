Page({
  data: {
    pickerDateShow: false
  },

  onLoad(options) {
    this._initData()
  },

  pickerSelectedTap() {
    this.setData({
      pickerDateShow: true
    })
  },

  // 日期选择完成事件
  pickerDateDone(e) {
    console.log('result: ', e.detail)

    // 完成日期选择时执行
    if (e.detail.type === 'confirm') {
      const date = e.detail.date.content
      this.setData({
        date,
        pickerDate: date.split(',')
      })
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
      pickerDate: date.split(',')
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

    // 处理日期格式
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day

    return {
      year,
      month,
      day
    }
  }
})