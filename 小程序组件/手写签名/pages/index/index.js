Page({
    data: {
        signImage: ''
    },

    onLoad() {
        
    },

    onPullDownRefresh() {
        this.setData({ signImage: '' })
        wx.stopPullDownRefresh()
    },

    navToSignPage() {
        wx.navigateTo({
            url: '../sign-page/sign-page',
            events: {
                getSignImage: image => {
                    this.setData({
                        signImage: image
                    })
                }
            },
        })
    }
})