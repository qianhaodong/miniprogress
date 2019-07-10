const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    starStatus: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like_item: {}
  },

  observers: {
    starStatus(newVal) {
      if (!Object.keys(newVal).length) return

      console.log(111)
      let {id, type} = newVal
      let url = `http://bl.7yue.pro/v1/classic/${type}/${id}?appkey=RdshydjBvcYZhMZC`
      
      util.http(url, (result, key) => {
        if (result) {
          this.setData({
            [key]: result
          })
          // console.log(this.data.like_item)
        } else {
          console.log('Request Error')
        }
      }, 'like_item')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
