//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({
  /**
   * 页面初始化数据
   */
  data: {
    phone:'',
    name:'',
    gender: '男',
    age: '',
    sex: [{value:'男',checked:'true'},{value:'女'}],
    imageList: [],
    id: '',
    length:'0',
    edit:'确定'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.OPENID)
    db.collection('information').where({
      _openid: app.globalData.OPENID
    }).get({
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          name: res.data[0].name,
          age:  res.data[0].age,
          phone:res.data[0].phone,
          gender:res.data[0].gender,
          length:res.data.length
        })
        
        console.log(this.data.sex)
        console.log(this.data.length)
        if (this.data.gender == '男') {
          this.setData({
            ['sex[0].checked']:'true'
          })
        } 
        if (this.data.gender == '女') {
          this.setData({
            ['sex[1].checked']: 'true'
          })
        }
        if (this.data.length == '1') {
          this.setData({
            edit: '编辑'
          })

        }
        console.log(this.data.sex)
        console.log(this.data)
      }
    })
  },

  onShow: function () {
  },

  sexChange: function(e){
    this.setData({
      gender:e.detail.value
    })
    console.log('gender'+this.data.gender)    
  },

  //表单提交
  formSubmit: function (e) {

    this.data.age   = e.detail.value.age;
    this.data.phone = e.detail.value.phone;
    this.data.name  = e.detail.value.name;

    console.log(this.data)

    if(this.data.name == ''||this.data.age == ''||this.data.phone==''||this.data.gender==''){
      wx:wx.showToast({
        title: '信息不完整',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else if(this.data.length == '1'&&this.data.edit == '确定'){
      console.log('1')
      db.collection('information').where({
        _openid: app.globalData.OPENID
      }).get({
        success: res => {
          this.setData({
            id: res.data[0]._id
          })
          db.collection('information').doc(this.data.id).update({
            data: {
              name: e.detail.value.name,
              age: e.detail.value.age,
              phone: e.detail.value.phone,
              gender: this.data.gender,
            }
          })
          console.log(this.data.id)
        }
      })
       
      wx:wx.showToast({
        title: '数据已刷新',
      })

    }else if(this.data.length == '0' && this.data.edit == '确定'){
      console.log('1222')
      db.collection('information').add({
        data: {
          name: e.detail.value.name,
          age: e.detail.value.age,
          phone: e.detail.value.phone,
          gender: this.data.gender,
        }
      })
      this.setData({
        length:'1'
      })
      console.log(this.data.length)
      wx: wx.showToast({
        title: '信息已提交',
      })
    }
    
  },
  
  editButton: function(){
    if (this.data.edit == '确定') {
      this.setData({
        edit: '编辑'
      })
    } else {
      this.setData({
        edit: '确定'
      })
    }
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