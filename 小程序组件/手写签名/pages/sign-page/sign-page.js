Page({
    data: {
        canvas: null,
        ctx: null,
        drawCount: 0,
        drawState: 'init', // 签名状态：初始值-init；签名中-ing；签名完成-stop
    },

    onLoad(options) {
        const eventChannel = this.getOpenerEventChannel()
        this.data.eventChannel = eventChannel
    },

    onReady() {
        this.initCanvas()
    },

    onUnload() {
        this.handleClear()
    },

    initCanvas() {
        const {
            windowWidth,
            windowHeight,
            pixelRatio: dpr
        } = wx.getSystemInfoSync()

        // 创建 canvas 画布上下文
        wx.createSelectorQuery()
            .select('.canvas')
            .node()
            .exec(res => {
                const canvas = res[0].node

                // 设置画布大小
                canvas.width = windowWidth * dpr
                canvas.height = windowHeight * dpr

                this.data.canvas = canvas

                // 初始化画布
                this.data.ctx = canvas.getContext('2d')
                this.data.ctx.textAlign = 'center'
                this.data.ctx.font = '240px sans-serif'
                this.data.ctx.fillStyle = '#E8EAED'
                this.data.ctx.fillText('签名区', canvas.width / 2, 360)
                this.data.ctx.scale(dpr, dpr)
            })
    },

    catchtouchstart(e) {
        // 判断开始签名
        if (this.data.drawCount === 0) {
            this.handleClear('emit')
        }
        
        const { clientX, clientY } = e.changedTouches[0]

        this.data.drawCount++
        this.data.ctx.strokeStyle = '#000000'
        this.data.ctx.lineWidth = 6
        this.data.ctx.lineCap = 'round'
        this.data.ctx.lineJoin = 'round'
        this.data.ctx.beginPath()
        this.data.ctx.moveTo(clientX, clientY)
    },

    catchtouchmove(e) {
        // 签名结束则不执行
        if (this.data.drawState === 'stop') return
        
        // 判断有多点触屏，则不执行
        if (e.touches.length > 1) return

        const { clientX, clientY } = e.changedTouches[0]
        this.data.drawState = 'ing'
        this.data.ctx.lineTo(clientX, clientY)
        this.data.ctx.stroke()
        this.data.ctx.moveTo(clientX, clientY)
    },

    /**
     * @description 清除签名
     * @param { String } type 调用类型：'click'-点击事件，'emit'-页面调用
     */
    handleClear(type = 'click') {
        // 判断不是在签名中，则不可清除（页面调用场景除外）
        if (type !== 'emit' && this.data.drawState !== 'ing') return
        const { canvas } = this.data
        this.data.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.data.drawState = 'init'
    },

    handleConfirm() {
        if (this.data.drawState === 'init') {
            wx.showToast({
                icon: 'none',
                title: '请签名',
            })
            return
        }
        this.data.drawState = 'stop'
        this._canvasToImg()
    },

    _canvasToImg() {
        wx.canvasToTempFilePath({
            canvas: this.data.canvas,
            success: res => {
                this.data.eventChannel.emit('getSignImage', res.tempFilePath);
                wx.navigateBack()
                // 上传服务器
                /* wx.navigateTo({
                    url: '/pages/showImg/showImg?src=' + res.tempFilePath,
                }) */
            }
        })
    },
})