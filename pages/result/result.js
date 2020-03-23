var util = require('../../utils/util.js');
const db = wx.cloud.database()
const app = getApp()

Page({
 data: {
  
  chooseQuery: "选择问卷",
  chooseDate : "时间排序",
  date       : "",
  slist      : [],
  llist      : [],
  mlist      : [],

  news: Array(),
  isstart: false,
  direction: true
 },

  onLoad: function (e) {
    /**
     * 初始化日期
     */
    var DATE = util.formatTime(new Date());
    this.setData({
      date: DATE,
    });
    /**
     * 初始化当前患者所有问卷
     */
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getResult',
      complete: res => {

        this.setData({
          news: res.result.data.reverse()
        })

        for (var i = 0; i <this.data.news.length; i++) {
          var that = this;
          var obj = {};
          obj.name = this.data.news[i].name;
          obj.time = this.data.news[i].time;
          let llist = that.data.llist;
          llist.push(obj);
          that.setData({ llist });
          console.log(llist)
        }
        
        console.log('All',this.data.news[0])
      }
    })
    
    /*db.collection('Result').where({
      _openid: app.globalData.OPENID,
    }).get({
      
      success: res =>{
        for(var i = 0; i<res.data.length; i++){
          var that = this;
          var obj = {};
          obj.name = res.data[i].name;
          obj.time = res.data[i].time;
          let llist = that.data.llist;
          llist.push(obj);
          that.setData({ llist });
          console.log(llist)
        }
      }
    })*/

    /**
     * 初始化问卷列表
     */
    db.collection('querylist').get({
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        console.log(res.data)
        for(var i =0;i<res.data.length;i++){
          var that = this;
          var obj  = {};
          obj.id   = res.data[i].label;
          obj.name = res.data[i].name;
          let slist= that.data.slist;
          slist.push(obj);
          that.setData({slist});
        }
      }
    })
    console.log(this.data.date);
  },

 opens: function (e) {
  switch (e.currentTarget.dataset.item) {
   case "1":
    if (this.data.isstart) {
     this.setData({
      isstart: false,
     });
    }
    else {
     this.setData({
      isstart: true,
     });
    }
    break;
  }
 },

 onclicks1: function (e) {

  var index = e.currentTarget.dataset.index;
  let name = this.data.slist[index].name;
  
  this.setData({
   llist  :[],
   direction:true,
   isstart: false,
   isfinish: false,
   isdates: false,
   chooseQuery: this.data.slist[index].name,
   finish: "查询表"
  })
  console.log(2)
  if(this.data.chooseQuery == '全部'){
    for (var i = 0; i < this.data.news.length; i++) {
      var that = this;
      var obj = {};
      obj.name = this.data.news[i].name;
      obj.time = this.data.news[i].time;
      let llist = that.data.llist;
      llist.push(obj);
      that.setData({ llist });
      console.log(llist)
    }
  }else{
    for (var i = 0; i < this.data.news.length; i++) {
      var that = this;
      var obj = {};
      if(this.data.news[i].name==this.data.chooseQuery){
        obj.name = this.data.news[i].name;
        obj.time = this.data.news[i].time;
        let llist = that.data.llist;
        llist.push(obj);
        that.setData({ llist });
      }
      console.log(this.data.llist)
    }
  }
 
 },

 query:function(e){
   console.log(this.data.chooseDate)
 },
 
 sortTime: function (e) {
    this.setData({
      mlist:this.data.llist
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(this.data.direction == true){
      this.setData({
        direction: false
      })
      this.data.mlist.sort(function(a,b){
        return b.time<a.time?1:-1
      })
      console.log(this.data.mlist)
    }else{
      this.setData({
        direction: true
      })
      this.data.mlist.sort(function (a, b) {
        return b.time> a.time? 1 : -1
      })
      console.log(this.data.mlist)
    }

    this.setData({
      llist:this.data.mlist
    })
    
  },
})

