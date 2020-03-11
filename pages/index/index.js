//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:'',
    
    skip:[
      { url: '../infor/infor', image: '../../image/information.png', title: '信息填写' },
      { url: '../quest/quest', image: '../../image/quest.png      ', title: '问卷填写' },
      { url: '../video/video', image: '../../image/video.png',       title: '康复视频' },
      { url: '../sound/sound', image: '../../image/sound.png',       title: '语音上传' },
      { url: '../result/result', image: '../../image/result.png',    title: '查询问卷' },
      { url: '../infor/infor', image: '../../image/upload.png',      title: '备用接口' },
    ],
   
    movies: [
      { url: 'http://47.100.27.103:8080/Images/ZVI.jpg' },
      { url: 'http://47.100.27.103:8080/Images/eyes.jpg' },
      { url: 'http://47.100.27.103:8080/Images/Iphone goggles.jpg' }
    ],

  },

  listItems: [' ', ' ', ' ', ' ', ' ', ' ', ' '],

  onLoad: function () {
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})




