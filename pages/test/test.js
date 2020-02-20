// pages/test/test.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.login().then(() => {
      this.carDetailtitle(),
        this.carDetail()
    })
  },
  showList(e) {
    let index = 0;
    let arrayItem = this.data.detil;//获取循环数组对象
    for (let item of arrayItem) {
      //如果当前点击的对象id和循环对象里的id一致
      if (item.repairitemsetid == e.currentTarget.dataset.id) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (arrayItem[index].isShow == "" || arrayItem[index].isShow == undefined) {
          arrayItem[index].isShow = "true"
          imgshow: !this.data.imgshow
        } else {
          arrayItem[index].isShow = ""
          imgshow: !this.data.imgshow
        }
      }
      index++;
    }
    //将数据动态绑定 
    this.setData({
      detil: arrayItem
    })
  },
  carDetailtitle(down) {
    var a = app.data
    libs.post('接口', {
      miniopenid: a.openid,
      carplate: a.carplate
    }, down).then(res => {
      console.log(JSON.parse(res))
      this.setData({
        detil: JSON.parse(res),
      })

    })
  },
  carDetail(down) {
    var a = app.data
    libs.post('接口', {
      miniopenid: a.openid,
      carplate: a.carplate,
      rcid: 7
    }, down).then(res => {
      console.log(JSON.parse(res))
      this.setData({
        notice: JSON.parse(res),
      })

    })
  },


  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
