// pages/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    poster:'',
    title:''
  },

  onLoad: function (options) {
    this.setData({
      src:   decodeURIComponent(options.url),
      poster:options.poster,
      title: options.title
    })
  },

  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      succes: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})
