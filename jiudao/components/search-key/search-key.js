const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached() {
      // console.log(this.data.hotList)
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
