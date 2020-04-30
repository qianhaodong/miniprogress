Component({
  properties: {
    // 初始时间
    initDate: {
      type: String,
      value: ''
    },

    // 初始年份
    year: {
      type: Number,
      value: 2019
    }
  },

  data: {
    years: [],
    months: [],
    days: [],
    monthDate: { // 按月时间对象
      year: 0,
      month: 0,
    },
    startDate: { // 开始时间对象
      year: 0,
      month: 0,
      day: 0,
    },
    endDate: { // 结束时间对象
      year: 0,
      month: 0,
      day: 0
    },
    value: [],
    pickerToggle: false, // 按月 / 按日切换标志（true 为按月，false 为按日）
    pickerDateShow: false, // 日期选择器显示标志
    pickerMonth: false, // 按月处理日期显示标志
    pickerStartDay: false, // 开始日期显示标志
    pickerEndDay: false, // 结束日期显示标志
    pickerStartActive: false, // 开始日期选中标志
    pickerEndActive: false, // 结束日期选中标志
    confirmState: false, // 日期选择完成标志（防止滚动选择器未结束时点击完成按钮，导致日期选择有误）
  },

  lifetimes: {
    attached() {
      // 初始化状态
      this.setData({
        pickerToggle: true,
        pickerDateShow: true,
        pickerMonth: true,
        pickerStartDay: true,
        pickerStartActive: true,
        confirmState: true
      })

      // 初始化时间范围
      this._initDate(this.data.initDate)
    }
  },

  methods: {
    // picker 滚动选择事件
    pickerChange(e) {
      const val = e.detail.value
      // let startDate = {}
      let year, month, day
      const {
        pickerToggle,
        years,
        months,
        days,
        pickerEndActive
      } = this.data
      
      year = years[val[0]]
      month = months[val[1]]
      day = days[val[2]]

      // 格式化日期
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day

      // 设置选择时间
      if (pickerToggle) { // 按月
        console.log('billDate: ', year + '-' + month)
        this.setData({
          monthDate: {
            year,
            month
          }
        })
      } else { // 按日
        
        // 结束日期
        if (pickerEndActive) {
          this.setData({
            endDate: {
              year,
              month,
              day
            }
          })
          return
        }

        // 开始日期
        this.setData({
          startDate: {
            year,
            month,
            day
          }
        })
      }
    },

    // picker 滚动选择开始事件
    pickerStart() {
      this.data.confirmState = false
    },

    // picker 滚动选择结束事件
    pickerEnd() {
      this.data.confirmState = true
    },

    // 按月/按日选择切换
    pickerSelect() {
      const pickerToggle = !this.data.pickerToggle
      this.setData({
        pickerToggle
      })
      
      // 切换月份/日期选择时，控制日期选择器的显示与隐藏
      const {
        pickerMonth,
        pickerStartDay,
        pickerEndDay
      } = this.data
      let pickerDateShow

      if (pickerToggle) { // 按月选择
        pickerMonth ? pickerDateShow = true : pickerDateShow = false
      } else { // 按日选择
        !pickerStartDay && !pickerEndDay ? pickerDateShow = false : pickerDateShow = true
      }

      this.setData({
        pickerDateShow
      })

      this._checkPickerDate()
    },

    // 选择开始/结束日期
    pickerDayToggle(e) {
      const id = Number(e.currentTarget.dataset.id)

      if (id === 1) { // 开始日期
        this.setData({
          pickerStartDay: true,
          pickerStartActive: true,
          pickerEndActive: false
        })
      } else if (id === 2) { // 结束日期
        this.setData({
          pickerEndDay: true,
          pickerStartActive: false,
          pickerEndActive: true
        })
      }

      this.setData({
        pickerDateShow: true
      })

      this._checkPickerDate()
    },

    // 删除所选日期
    pickerDeleteTap() {
      const pickerToggle = this.data.pickerToggle

      if (pickerToggle) { // 按月选择
        this.setData({
          pickerMonth: false,
          pickerDateShow: false
        })
      } else { // 按日选择
        this.setData({
          pickerDateShow: false,
          pickerStartDay: false,
          pickerEndDay: false,
          pickerStartActive: false,
          pickerEndActive: false
        })
      }

      // 初始化时间为当前时间
      const currentDate = this._getCurrentDate()
      this.setData({
        monthDate: currentDate,
        startDate: currentDate,
        endDate: currentDate
      })
    },

    // 选择月份
    pickerMonthSelect() {
      this.setData({
        pickerMonth: true,
        pickerDateShow: true
      })
    },

    // 确认
    confirm() {
      let date = {}
      const {
        pickerToggle,
        pickerMonth,
        pickerStartDay,
        pickerEndDay
      } = this.data

      // 当 picker 滚动选择开始且没有结束时，则不执行
      if (!this.data.confirmState) return
      
      if (pickerToggle) { // 按月选择
        let {
          monthDate
        } = this.data

        // 当月份没有选择时的默认值为当前月
        if (!pickerMonth) {
          const currentDate = this._getCurrentDate()

          monthDate = {
            year: currentDate.year,
            month: currentDate.month
          }
        }
        
        date = {
          type: 'month',
          content: `${monthDate.year}-${monthDate.month},${monthDate.year}-${monthDate.month}`
        }
      } else { // 按日选择
        let {
          startDate,
          endDate
        } = this.data

        // 处理时间，当开始日期 / 结束日期没有输入时的默认值
        if (!pickerStartDay && !pickerEndDay) {
          startDate = endDate = this._getCurrentDate()
        } else if (!pickerStartDay) {
          startDate = endDate
        } else if (!pickerEndDay) {
          endDate = startDate
        }

        // 当开始日期大于结束日期时，自动转换
        const startTime = new Date(`${startDate.year}-${startDate.month}-${startDate.day}`).getTime()
        const endTime = new Date(`${endDate.year}-${endDate.month}-${endDate.day}`).getTime()
        if (startTime > endTime) {
          [startDate, endDate] = [endDate, startDate]
        }

        date = {
          type: 'day',
          content: `${startDate.year}-${startDate.month}-${startDate.day},${endDate.year}-${endDate.month}-${endDate.day}`
        }
      }

      this.triggerEvent('picker-date-done', {type: 'confirm', date})
    },

    // 取消
    cancel() {
      this.triggerEvent('picker-date-done', {type: 'cancel'})
    },

    // 初始化时间格式
    _initDate(initDate = '') {
      const date = new Date()
      const years = []
      const months = []
      const days = []
      const value = []
      const currentDate = this._getCurrentDate()

      // 初始化时间范围
      for (let i = this.data.year; i <= date.getFullYear(); i++) {
        years.push(i)
      }

      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }

      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }

      const dateArr = initDate.split(',')
      const tempArr1 = dateArr[0].split('-')
      const tempArr2 = dateArr[1].split('-')
      let monthDate, startDate, endDate
      let pickerToggle = false
      let pickerEndDay = false

      if (dateArr[0] === dateArr[1]) {
        monthDate = startDate = endDate = currentDate
        if (tempArr1.length === 2) {
          pickerToggle = true
          monthDate = {
            year: tempArr1[0],
            month: tempArr1[1]
          }
        } else {
          pickerEndDay = true
          startDate = endDate = {
            year: tempArr1[0],
            month: tempArr1[1],
            day: tempArr1[2]
          }
        }
      } else {
        pickerEndDay = true
        monthDate = currentDate
        startDate = {
          year: tempArr1[0],
          month: tempArr1[1],
          day: tempArr1[2]
        }
        endDate = {
          year: tempArr2[0],
          month: tempArr2[1],
          day: tempArr2[2]
        }
      }

      // 处理 picker-view 日期初始值
      value.push(years.indexOf(Number(tempArr1[0])))
      value.push(months.indexOf(Number(tempArr1[1])))
      value.push(days.indexOf(Number(tempArr1[2])))
      
      this.setData({
        years,
        months,
        days,
        monthDate,
        startDate,
        endDate,
        value,
        pickerToggle,
        pickerEndDay
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
    },

    // 处理 picker 时间选择器
    _checkPickerDate() {
      const {
        years,
        months,
        days,
        monthDate,
        startDate,
        endDate,
        pickerToggle,
        pickerStartActive,
        pickerEndActive
      } = this.data
      let value = []

      if (pickerToggle) { // 按月
        value.push(years.indexOf(Number(monthDate.year)))
        value.push(months.indexOf(Number(monthDate.month)))
      } else { // 按日
        if (pickerStartActive) {
          value.push(years.indexOf(Number(startDate.year)))
          value.push(months.indexOf(Number(startDate.month)))
          value.push(days.indexOf(Number(startDate.day)))
        } else if (pickerEndActive) {
          value.push(years.indexOf(Number(endDate.year)))
          value.push(months.indexOf(Number(endDate.month)))
          value.push(days.indexOf(Number(endDate.day)))
        }
      }
      this.setData({
        value
      })
    }
  }
})