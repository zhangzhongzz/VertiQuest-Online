//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    movies: [
      { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
      { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
      { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
      { url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' }
    ],
    userInfo: {},
    hasUserInfo: false,
  },

  listItems: [' ', ' ', ' ', ' ', ' ', ' ', ' '],

  onLoad: function () {
  },



  goTest: function(){
    wx.navigateTo({
      url: '../fill/fill'
    })
  },

  goQuest: function(){
    wx.navigateTo({
      url: '../quest/quest',
    })
  },

  goVideo: function(){
    wx.navigateTo({
      url: '../video/video',
    })
  },

  goPlayer: function(){
    wx.navigateTo({
      url: '../player/player',
    })
  },

  goLogs: function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  goInfor: function(){
    wx.navigateTo({
      url: '../infor/infor',
    })
  },
  onLoad: function () {
    var that = this;
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
            }
          })
        } else {//未授权，跳到授权页面
          wx.redirectTo({
            url: '../logs/logs',//授权页面
          })
        }
      }
    })
  }
})




