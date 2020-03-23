var util = require('../../utils/util.js')
const db = wx.cloud.database()
var app=getApp()
/*db.collection('wenjuan').where({
  number:"1"
}).get({
  success: res => {
    /*this.setData({
      queryResult: JSON.stringify(res.data, null, 2)
    })
    console.log('[数据库] [查询记录] 成功: ', res)
    //const qnaire = require("cloud://hht-yz5as.6868-hht-yz5as-1301271337/sas.js")
  },
  fail: err => {
    wx.showToast({
      icon: 'none',
      title: '查询记录失败'
    })
    console.error('[数据库] [查询记录] 失败：', err)
  }
})*/
const qnaire = require("../../pages/quest/sas.js")  //导入题库
const luoji = require("../../pages/quest/luoji.js")
const DHI = require("../../pages/quest/DHI.js")
//const qnaire = require("cloud://hht-yz5as.6868-hht-yz5as-1301271337/sas.js")
var ans = new Array(5)  //答案数组初始化，会在onload函数中赋初值""
Page({
  data: {
    //queryResult:"",
    luoji: luoji.luoji,
    qnaire: qnaire.qnaire,
    answer: ans,
    id: 0,    //当前题号  比实际小一
    answers: {
      number: Array(),
      option: Array()
    },
    tablenumber: 1,
    n: 1,    //增加的题号
    num: 0,  //当前已答题的数目
    time: "0年0个月0天",  //第一次发病至今时间
    time1: "0年0个月0天",  //最后一次发病至今时间
    timearray: [0, 0, 0],      //第一次发病时间数组
    timearray1: [0, 0, 0],
    cishu: 2,
    cishu1: "2",
    showView: false,
    changeChoose: false,          //判断是否修改当前选项
    finish: false,                //判断是否是返回修改状态  若是修改状态则下一题的按钮变为可选择的
    shownext: true,               //依据此项判断是否下一题按钮可显示   
    rechange:false,               //判断重新进入页面是修改按钮进入还是提交后重新进入    
  },
 onShow: function () {
    const qnaire1 = require("../../pages/quest/sas.js")
    const DHI1 = require("../../pages/quest/DHI.js") 
    
    if(app.globalData.tablenumber==1){
      console.log("quest   " + app.globalData.tablenumber)
      this.setData({
        tablenumber: 1,
        qnaire:qnaire1.qnaire
      })
    } else if (app.globalData.tablenumber == 2){
      console.log("DHI   " + app.globalData.tablenumber)
      this.setData({
        tablenumber: 2,
        qnaire: DHI1.DHI,
        shownext: false,
      })
    }
    if(!this.data.rechange){                 //若为返回修改则将所有缓存清空
      for(var j in this.data.qnaire){
        if(this.data.qnaire[j].type!='MULTI'){
          for (var i in this.data.qnaire[j].option) {
            var selected='qnaire['+j+'].option['+i+'].isSelected';
            this.setData({[selected]:false}); 
          }
        }
      }
    }
    if (app.globalData.tablenumber == 2){             //先刷新选项状态 再根据选项判断下一题按钮是否可用
      for (var i in this.data.qnaire[0].option) {    //表二(其他以选择题开头的表)每次进入界面根据选项选中状态判断是否显示下一题
        if (this.data.qnaire[0].option[i].isSelected) {
          this.setData({ shownext: true }); break;
        }
      }
    }
  },
  changeSlider(e) {
    this.setData({ timearray: [e.detail.value, this.data.timearray[1], this.data.timearray[2]] })
  },
  changeSlider1(e) {
    this.setData({ timearray: [this.data.timearray[0], e.detail.value ,this.data.timearray[2]] })
  },
  changeSlider2(e) {
    this.setData({ timearray: [this.data.timearray[0], this.data.timearray[1], e.detail.value] })
  },
  changeSlider3(e) {
    this.setData({ timearray1: [e.detail.value, this.data.timearray1[1], this.data.timearray1[2]] })
  },
  changeSlider4(e) {
    this.setData({ timearray1: [this.data.timearray1[0], e.detail.value, this.data.timearray1[2]] })
  },
  changeSlider5(e) {
    this.setData({ timearray1: [this.data.timearray1[0], this.data.timearray1[1], e.detail.value] })
  },
  changeSlidercishu(e) {
    var a=e.detail.value;
    this.setData({
      cishu: a,
      cishu1: a + ""
    })
  },
  radioChange: function (e) {     //暂时无用  没有纯单选题
    var tab = 0                                                                      //表示下一题按钮是否可点
    for (var i in this.data.qnaire[this.data.id].option) {
      //var selected='qnaire['+this.data.id+'].option['+i+'].isSelected';
      if (this.data.qnaire[this.data.id].option[i].flag == e.detail.value) {       //若选项和flag一致
        this.data.qnaire[this.data.id].option[i].isSelected = true;                  //设置为选中
        //this.setData({[selected]:true});
        tab = 1;
      } else {                                                                       //由于是单选题  其余都得重新置为false
        this.data.qnaire[this.data.id].option[i].isSelected = false;
        //this.setData({ [selected]: false });
      }
    }
    if (tab == 0) {
      this.setData({ shownext: false })
    } else {
      this.setData({ shownext: true })
    }
  },
  radioChange1: function (e) {
    //先根据改变后的选项值将取qnair中的isSelected值改变
    var tab=0                                                                      //表示下一题按钮是否可点
    for (var i in this.data.qnaire[this.data.id].option) {
      if (this.data.qnaire[this.data.id].option[i].flag == e.detail.value) {       //若选项和flag一致
        this.data.qnaire[this.data.id].option[i].isSelected=true;                  //设置为选中
        tab=1;
      }else{                                                                       //由于是单选题  其余都得重新置为false
        this.data.qnaire[this.data.id].option[i].isSelected = false;   
      }
    }
    if(tab==0){
      this.setData({shownext:false})
    }else {
      this.setData({ shownext:true })
    }
    if (e.detail.value == 'B') {
      this.setData({
        showView: true,
      })
    } else {
      this.setData({
        showView: false,
      })
    }
    
  },
  checkboxChange: function (e) {
    //先根据改变后的选项值将取qnair中的isSelected值改变
    var tab=0
    for (var i in this.data.qnaire[this.data.id].option) {
      if (e.detail.value.indexOf(this.data.qnaire[this.data.id].option[i].flag)!=-1) {       //若选项和flag一致
        this.data.qnaire[this.data.id].option[i].isSelected = true;                  //设置为选中
        tab=1;
      } else {                                                                       //其余都得重新置为false
        this.data.qnaire[this.data.id].option[i].isSelected = false;
      }
    }
    if (tab == 0) {
      this.setData({ shownext: false })
    } else {
      this.setData({ shownext: true })
    }
    this.setData({ n: 1, changeChoose: true });
  },

  nextq: function () {
    var e="";
    if (this.data.qnaire[this.data.id].type == 'SCQT' || this.data.qnaire[this.data.id].type == 'SCQ'){//若为单选题则需要逻辑判断
    for( var i in this.data.qnaire[this.data.id].option){
      if(this.data.qnaire[this.data.id].option[i].isSelected){       //若被选中
        e = this.data.qnaire[this.data.id].option[i].flag;           //将标签给e
      }
    } 
   if(this.data.tablenumber==1){                                  //若问卷号为1逻辑问卷则需要从luoji中读取下一题增加的题号
    for (var index in this.data.luoji) {
      if (this.data.id + 1 == this.data.luoji[index].number) {
        switch (e) {                                                 //按照标签进行判断下一个题号
          case "A": this.setData({ n: this.data.luoji[index].n.A }); break;
          case "B": this.setData({ n: this.data.luoji[index].n.B }); break;
          case "C": this.setData({ n: this.data.luoji[index].n.C }); break;
          case "D": this.setData({ n: this.data.luoji[index].n.D }); break;
          default: this.setData({ n: 1 });                          //e为空值时则默认下一题+1
        }
        //console.log(this.data.luoji[index].n.B)
      }
    }
    }
    }
    if (this.data.id < this.data.qnaire.length - 1) {
      this.setData({
        id: this.data.id + this.data.n,
        n: 1,                              //设置完下一题id后重新将自增题号置1
        changeChoose: false
      })
    }
    //设置完新id后再判断下一到题的next按钮初始状态是否应该可用
    if (this.data.qnaire[this.data.id].type == 'SCQT' || this.data.qnaire[this.data.id].type == 'SCQ' || this.data.qnaire[this.data.id].type == 'MCQ') {//若为单选或多选需判断下一题按钮是否为不可用
      var tab = 0;
      for (var i in this.data.qnaire[this.data.id].option) {
        if (this.data.qnaire[this.data.id].option[i].isSelected) {       //若有一项选中
          tab = 1; break;                                        //改变tab跳出循环
        }
      }
      if (tab == 0) {
        this.setData({ shownext: false })
      } else {
        this.setData({ shownext: true })
      }
    }
  },

  lastq: function (e) {
    if (this.data.id != 0) {
      this.setData({
        //id: this.data.id - this.data.n,
        //id:this.data.answers.number[this.data.num-1]-1,  //改变当前题号
        id: this.data.answers.number[this.data.num - 1],  //改变当前题号
        num: this.data.num - 1,                              //当前答题数目减一
        changeChoose: false

      })
      if(this.data.id<2){
        this.setData({
          shownext:true
        })
      }
      if (this.data.qnaire[this.data.id].type == 'SCQT' || this.data.qnaire[this.data.id].type == 'SCQ' || this.data.qnaire[this.data.id].type == 'MCQ') {//若为单选或多选需判断下一题按钮是否为不可用
        var tab = 0;
        for (var i in this.data.qnaire[this.data.id].option) {
          if (this.data.qnaire[this.data.id].option[i].isSelected) {       //若有一项选中
            tab = 1; break;                                        //改变tab跳出循环
          }
        }
        if (tab == 0) {
          this.setData({ shownext: false })
        } else {
          this.setData({ shownext: true })
        }
      }
      this.data.answers.number.splice(-1, 1);
      this.data.answers.option.splice(-1, 1);
    }
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
    if(this.data.tablenumber==1){       //若为表一逻辑问卷则需要特殊处理带滑框问题答案的提交
    if (i == 0) {
      this.data.answers.option[i] = this.data.timearray;
    } else if (i == 1) {
      this.data.answers.option[i] = this.data.timearray1;
    } else if (i == 2) {
      var opt = ["", ""];
      opt[0] = a;
      opt[1] = this.data.cishu1;
      this.data.answers.option[i] = opt;
    } else {
      this.data.answers.option[i] = a;
    }
    }else{                  //其余非逻辑问卷正常提交答案即可
      this.data.answers.option[i] = a;
    }
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
    //var finish;
    //var i = 0;
    //var _this = this;
    /*while (i < 5) {
      if (ans[i] == "") {
        finish = 'false';
        break;
      } else {
        finish = 'true';
      }
      i++;
    } 没用*/
    /*finish=true;   //先暂时设置为true
    if (finish == 'false') {
      wx.showModal({
        title: '无法提交',
        content: '您还有部分题目未完成，请检查后重新提交',
        showCancel: false,
        confirmColor: '#fcbe39',
        confirmText: "好的",
        success(res) {
          _this.setData({
            id: i,
          })
        }
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading({
          success(res) {
            _this.answer2db();
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }, 2000)
    }*/
    console.log(this.data.answers);
    wx.navigateTo({
      url: '../finalpage/finalpage?ques=' + JSON.stringify(this.data.answers.number) + '&ans=' + JSON.stringify(this.data.answers.option) + '&answers=' + JSON.stringify(this.data.answers)+'&tablenumber='+JSON.stringify(this.data.tablenumber),
    })
  },

  //将用户完成的答案数组上传至云数据库
  answer2db: function () {
    var TIME = util.formatTime(new Date());
    var DATE = util.formatDate(new Date());
    db.collection('SAS').add({
      data: {
        name: '抑郁问卷',
        answer: this.data.answers,
        date: DATE,
        time: TIME
      },
      success(res) {
        console.log(res._id);
      },
      fail(res) {
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
      timearray: e.detail.value
    })
  },
  bindDate1Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value[0] + "年" + e.detail.value[1] + "个月" + e.detail.value[2] + "天",
      timearray1: e.detail.value
    })
  },
  bindPickChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var a = parseInt(e.detail.value);
    a = a + 2;
    this.setData({
      cishu: a + "次",
      cishu1: a + ""
    })
  },
  stopTouchMove() {
    return false
  }
})