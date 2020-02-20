// pages/yaoxh6/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceIcon: "../../../image/selected.png",
    currentFatherIndex: 0,
    questionnaireArray: [
      {
        //单选
        "type": "SCQ",
        "content": {
          "description": "发病的次数（连续数天或数周持续症状算为一次发病）?",
          "options":
            [
              { "id": 1, "name": "第一次发病", "isSelected": false },
              { "id": 2, "name": "2到10次", "isSelected": false },
              { "id": 3, "name": "大于10次", "isSelected": false }
            ]
        }
      },
      //多选
      {
        "type": "MCQ",
        "content": {
          "description": "以往发病反复发作频率?",
          "options":
            [
              { "id": 1, "name": "每天多次发作", "isSelected": false },
              { "id": 2, "name": "间隔数天", "isSelected": false },
              { "id": 3, "name": "一月至数月发作一次", "isSelected": false },
              { "id": 4, "name": "一年至数年发作一次", "isSelected": false }
            ]
        }
      },
      {
        "type": "MCQ",
        "content": {
          "description": "请描述本次发病的不适感（可多选）？",
          "options":
            [
              { "id": 1, "name": "外界物体旋转", "isSelected": false },
              { "id": 2, "name": "自身旋转", "isSelected": false },
              { "id": 3, "name": "头晕，无明显旋转感", "isSelected": false },
              { "id": 4, "name": "直立时难以保持身体平衡", "isSelected": false },
              { "id": 5, "name": "其他", "isSelected": false }
            ]
        }
      },
      //填写
      {
        "type": "SAQ",
        "content": {
          "description": "What's your name?",
          "answer": ""
        }
      },

      //次数选择器
      {
        "type": "CHOOSE",
        "content": {
          "description": "发病的次数",
          "options":['1','2','3','4','5','6','7','8','9','10','大于10'],
          "answer": ""
        }
      },
      //日期选择器
      {
        "type": "DATE",
        "content":{
          "description": "第一次发病至今的时间",

        }

      }
    ],
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
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

  },
  // fun : function(){
  //   var q = {
  //     test: this.data.test,
  //     test2: this.data.test2
  //   }
  //   wx.cloud.callFunction({
  //     name: 'release_questionnaire',
  //     data: {
  //       content: JSON.stringify(q)
  //     },
  //     success: res => {
  //       // test = JSON.stringify(res)
  //       // this.setData({
  //       //   test : JSON.stringify(res.result.results.data[0].description)
  //       // })
  //       console.log('success')
  //     }
  //   })
  // },

  // fun2 : function(){
  //   wx.cloud.callFunction({
  //     name: 'get_all_questionnaire',
  //     success: res => {
  //       console.log(res)
  //       var last = res.result.results.data[8].content
  //       this.setData({
  //         test: JSON.parse(last).test
  //       })
  //       console.log('success')
  //     }
  //   })
  // }
  goBack: function () {
    console.log('to task page')
    wx.switchTab({
      url: '../task/task',
    })
  },

  getTempFatherIndex: function (input) {
    var tempFatherIndex = input.currentTarget.dataset.id;
    //console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },

  radioChangeSCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  checkboxChangeMCQ: function (input) {
    // console.log(input.detail.value);
    var flag = false;
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      flag = false;
      for (var j in input.detail.value) {
        if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value[j]) {
          flag = true;
        }
      }
      if (flag == true) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurAnswerOfSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.answer = input.detail.value;
    // console.log(tempArray[tempIndex].content);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  complete: function () {
    console.log(this.data.questionnaireArray);
  },
})
