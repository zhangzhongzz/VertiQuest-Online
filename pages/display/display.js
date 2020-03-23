// pages/display.js

const db = wx.cloud.database()
const app = getApp()
const DHI = require("../../pages/quest/DHI.js")
const SAS = require("../../pages/quest/sas.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '',
    time : '',
    number: Array(),
    option: Array(),
    tabel : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name,
      time:options.time
    })
    if(options.name == "DHI量表"){
      this.setData({
        tabel:DHI.DHI
      })
    }
    if (options.name == "逻辑问诊表") {
      this.setData({
        tabel: SAS.qnaire
      })
    }
     db.collection('Result').where({
       name:   this.data.name,
       time:   this.data.time,
       _openid:app.globalData.OPENID
     }).get({
       
       success: res => {
         console.log(res.data[0].answer)
         this.setData({
           number :  res.data[0].answer.number,
           option :  res.data[0].answer.option
         })
       }
     })
    console.log(this.data)
  },

  /**
   * 测试函数
   */
  onPrint:function(){
    console.log(this.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})