//logs.js
import requestUrl from '../../utils/util.js'
var globalOpenId = getApp().globalData.openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')//获取用户信息是否在当前版本可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
    if (e.detail.userInfo) {//点击了“允许”按钮，
      var that = this;
      requestUrl.requestUrl({//将用户信息传给后台数据库
        url: "/pages/index/index",
        params: {
          openId: globalOpenId,//用户的唯一标识
          nickName: e.detail.userInfo.nickName,//微信昵称
          avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
          province: e.detail.userInfo.province,//用户注册的省
          city: e.detail.userInfo.city//用户注册的市
        },
        method: "post",
      })
        .then((data) => {//then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数
          console.log("允许授权了");
        })
        .catch((errorMsg) => {
          console.log(errorMsg)
        })
      wx.switchTab({
        url: '../VehicleIndex/VehicleIndex',
      })
    }
  }
})
