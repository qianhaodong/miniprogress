Component({
  properties: {
    bookItem: {
      type: Object,
      value: null
    }
  },

  data: {
    
  },

  lifetimes: {
    attached() {
      
    }
  },

  methods: {
    onBookTap(e) {
      let bookid = e.currentTarget.dataset.bookid
      
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bookid=${bookid}`
      })
    }
  }
})