var util = require('../../utils/util.js');

Page({
 data: {
  
  chooseQuery: "选择问卷",
  chooseDate : "选择时间",
  date       : "",

  slist: [
   { id: 1, name: "表一" },
   { id: 2, name: "表二" },
   { id: 3, name: "表三" },
  ],

  isstart: false,
  openimg: "/image/add.png",
  offimg:  "/image/down.png"

 },

  onLoad: function (e) {
    var DATE = util.formatTime(new Date());
    this.setData({
      date: DATE,
    });
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
   isstart: false,
   isfinish: false,
   isdates: false,
   chooseQuery: this.data.slist[index].name,
   finish: "查询表"
  })
 },

 query:function(e){
   console.log(this.data.chooseDate)
 },
 
 bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chooseDate:e.detail.value,
    })
  },
})

