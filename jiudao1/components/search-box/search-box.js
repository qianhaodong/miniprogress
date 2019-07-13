Component({
  properties: {
    query: {
      type: String,
      value: ''
    },
    clearIconShow: {
      type: Boolean,
      value: false
    }
  },

  data: {
    placeholder: '搜索图书名称',
    inputChange: false
  },

  methods: {
    onBindFocus(e) { // 获取焦点事件处理
      this.setData({
        inputChange: true,
        placeholder: '搜索图书名称'
      })
      this.triggerEvent('onFocus', {
        searchResultShow: true
      })
    },

    onBindInput(e) { // 搜索框搜索关键字改变时触发
      let query = e.detail.value

      if (query) {
        this.setData({
          query: query,
          clearIconShow: true
        })
      } else {
        this.setData({
          clearIconShow: false
        })
        this.triggerEvent('onCancel', {
          searchResultShow: true
        })
      }
    },

    onConfirmSearch(e) { // 手机键盘点击搜索触发
      let query = e.detail.value

      if (query) {
        this.triggerEvent('onConfirmSearch', {
          query: query
        })
      } else {
        this.setData({
          placeholder: '请输入搜索内容'
        })
      }
    },

    onSearchIconTap(e) { // 搜索图标点击搜索处理
      let query = e.currentTarget.dataset.query
      
      if (query) {
        this.triggerEvent('onConfirmSearch', {
          query: query
        })
      } else {
        this.setData({
          placeholder: '请输入搜索内容'
        })
      }
    },

    onClearTap() { // 清空搜索框事件
      this.setData({
        query: '',
        clearIconShow: false
      })
      this.triggerEvent('onCancel', {
        searchResultShow: true
      })
    },

    onCancelTap() { // 取消按钮事件
      this.setData({
        inputChange: false,
        clearIconShow: false,
        query: ''
      })
      this.triggerEvent('onCancel', {
        searchResultShow: false
      })
    }
  }
})