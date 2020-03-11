//index.js
//获取应用实例
Page({
  data: {
    sex: '男',
    imageList: []
  },
  switch1Change: function (e) {
    if (e.detail.value) {
      this.setData({ sex: '男' })
    } else {
      this.setData({ sex: '女' })
    }
  },
  //表单提交
  formSubmit: function (e) {
    wx.request({
      url: 'http://anqingya.top/face/index.php/home/index/index', //仅为示例，并非真实的接口地址
      data: e.detail.value,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log(res)
        if (res.error) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
          })
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          })

          this.upload();
        }
      }
    })
  },
  //拍照
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  //预览照片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  //上传
  upload: function () {
    wx.uploadFile({
      url: 'http://anqingya.top/face/index.php/home/index/upload', //仅为示例，非真实的接口地址
      filePath: this.data.imageList[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        console.log(data);
        var json = JSON.parse(res.data);
        wx.showToast({
          title: json.msg,
          icon: 'none',
          duration: 3000,
        })
      }
    })
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
})