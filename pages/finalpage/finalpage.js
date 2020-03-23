var util = require('../../utils/util.js')
const db = wx.cloud.database()

const qnaire = require("../../pages/finalpage/problem.js")  //导入题库
const DHI = require("../../pages/quest/DHI.js")
var count=0
var ans = new Array(5)  //答案数组初始化，会在onload函数中赋初值""
Page({
  data: {
    //queryResult:"",
    qnaire: qnaire.qnaire,
    answer: ans,
    tablenumber:1,         //当前所填的表号
    id: 0,    //当前题号  比实际小一
    answers: {
      number: Array(),
      option: Array()
    },
    n: 1,    //增加的题号
    num: 0,  //当前已答题的数目
    time: "0年0个月0天",  //第一次发病至今时间
    time1: "0年0个月0天",  //最后一次发病至今时间
    cishu: "2",         //记录发病次数
    showView:true,
    array:[0,1,2,7,8,9,10,11,12,13,14,15,16],
    option2: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    count:0
  },
  onLoad: function (options) {
    
    var allans = [];
    //var n=options.ques[-1];
    //console.log(options.ques[-1]);
    var j = 0;
    
    this.setData({
      array: JSON.parse(options.ques),
      option1: JSON.parse(options.ans),
      //number:options.ques[-1]
      answers: JSON.parse(options.answers),
      tablenumber:JSON.parse(options.tablenumber),
    })
    if(this.data.tablenumber==1){                       //若为表一则需要特殊设置年月日及次数相关数据
    this.setData({
      time: this.data.option1[0][0] + "年" + this.data.option1[0][1] + "个月" + this.data.option1[0][2]+ "天",
      time1: this.data.option1[1][0] + "年" + this.data.option1[1][1] + "个月" + this.data.option1[1][2] + "天",
      cishu:this.data.option1[2][1],
      qnaire: qnaire.qnaire
    })
    if(this.data.option1[2][0]=="B"){
      this.setData({
        showView:true
      })
    }else {
      this.setData({
        showView: false
      })

    }
    }else if(this.data.tablenumber==2){
      this.setData({
        qnaire: DHI.DHI
      })
    }
    for (var i = 0; i < this.data.qnaire.length; i++) {
      if (this.data.array.includes(i)) {
        allans[i] =this.data.option1[j]; j = j + 1;
      }
      else { allans[i] = "-"; }
    }
    this.setData({
      option2:allans,
    })

    console.log(this.data.array);
    console.log(this.data.option1);
    console.log(this.data.answers);
    console.log(this.data.option2);
    console.log(this.data.showView);
    console.log(this.data.option2[2].indexOf("A"));

  },
  radioChange: function (e) {
    
  },
  radioChange1: function (e) {
    
  },

  nextq: function () {
   
  },

  lastq: function (e) {
   
  },

  submit: function (e) {
    console.log(e.detail.value);
    var a = e.detail.value.answer;
    var id = this.data.id;
    //ans[id] = a;
    var i = this.data.num;
    //ans[i].questionnumber=id+1;   //从0开始
    //ans[i].option=a;
    //this.data.answers.number[i]=id+1;  
    this.data.answers.number[i] = id;//题号从0开始
    this.data.answers.option[i] = a;
    this.setData({
      answer: ans,
      num: i + 1
    })
    console.log(this.data.answer);
    console.log(this.data.answers);
    /*wx.redirectTo({
      url: '../finaltest1/finaltest1',
    })*/

  },

  //判断答题完成情况
  formSubmit: function () {
    console.log("count"+ count)
    if(count==0)
    {
      this.answer2db();
    }else{
      wx.showToast({
        icon: 'none',
        title: '请勿重复提交！'
      })
    }   
  },
  back:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    prevPage.setData({
      id: 0,
      num:0,
      answers: {
        number: Array(),
        option: Array()
      },
      rechange:true,
    })
     wx.navigateBack({
       
     })
  },

  //将用户完成的答案数组上传至云数据库
  answer2db: function () {
    count=1;
    const qnaire1 = require("../../pages/quest/sas.js"); 
    const DHI = require("../../pages/quest/DHI.js");
    var TIME = util.formatTime(new Date());
    var DATE = util.formatDate(new Date());
    var tablename='问卷';
    var tab=1;
    switch(this.data.tablenumber){
      case 1:tablename='逻辑问诊表';break;
      case 2:tablename='DHI量表';tab=2;break;
      default:tablename='问诊表'
    }
      db.collection('Result').add({
        data: {
          tablenumber: this.data.tablenumber,     //插入表号
          name: tablename,
          answer: this.data.answers,
          date: DATE,
          time: TIME
        },
        success(res) {
          console.log(res._id);
      
          wx.showModal({
            title: '提示',
            content: '提交成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('弹框后点取消')
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 2];  //上一个页面

                wx.reLaunch({
                  url: '../index/index',
                })
                count=0
              } else {
                console.log('弹框后点取消')
                count=0
              }
            }
          })
        },
        fail(res) {
          count=0
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value[0] + "年" + e.detail.value[1] + "个月" + e.detail.value[2] + "天",
    })
  },
  bindDate1Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value[0] + "年" + e.detail.value[1] + "个月" + e.detail.value[2] + "天",
    })
  },
  bindPickChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var a = parseInt(e.detail.value);
    a = a + 2;
    this.setData({
      cishu: a + "次",
    })
  },
})