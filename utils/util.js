
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/* 公共request 方法 */
const requestUrl = ({
  url,
  params,
  success,
  method = "post"
}) => {
  wx.showLoading({
    title: '加载中',
  });
  let server = 'http://xxxxxxxxxx';//正式域名
  // let server = 'http://dxxx.xxxxxxxxxx.cn';//测试域名
  let sessionId = wx.getStorageSync("sid"),
    that = this;
  if (sessionId != "" && sessionId != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'sid=' + sessionId }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: (res) => {
        wx.hideLoading();
        if (sessionId == "" || sessionId == null) {
          wx.setStorageSync('sid', res.data.info.sessionId)//  如果本地没有就说明第一次请求 把返回的 sessionId 存入本地
        }
        if (res['statusCode'] == 200) {
          resolve(res)//异步成功之后执行的函数
        } else {
          wx.showToast({
            title: res.data.msg || '请求出错',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          reject(res.ErrorMsg);
        }
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg || '',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        reject('网络出错');
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  requestUrl: requestUrl
}


//新增
//时间格式化  yyyy/MM/dd HH:mm:ss
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//获取当前日期方法
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//时间格式化  yyyy/MM/dd HH:mm
const toformatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}


module.exports = {
  formatTime:formatTime,
  formatDate: formatDate
}

module.exports.toformatTime = toformatTime;


/**
 * 数字校验
 */
const isNumber = num => {
  if (!isNaN(num) && num != null && (num + '').length > 0) {
    return true;
  } else {
    return false;
  }
}
module.exports.isNumber = isNumber;

//+===========================================================================================================================
const finalUrl = 'http://localhost:8387/wizardlisa';
//+===========================================================================================================================
/**
 * 请求封装GET
 */
var httpGet = function (url, data) {
  const Authorization = wx.getStorageSync('api_key');
  const sys_source = wx.getStorageSync('sys_source');
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: finalUrl + url,
      data: data,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization,
        'sys_source': sys_source
      },
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.httpGet = httpGet;

/**
 * 请求封装POST
 */
var httpPost = function (url, data) {
  const Authorization = wx.getStorageSync('api_key');
  const sys_source = wx.getStorageSync('sys_source');
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: finalUrl + url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization,
        'sys_source': sys_source
      },
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.httpPost = httpPost;

/**
 * POST 上传图片
 */
var uploadFile = function (url, filePath, data) {
  const Authorization = wx.getStorageSync('api_key');
  const sys_source = wx.getStorageSync('sys_source');
  var promise = new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: finalUrl + url,
      filePath: filePath,
      name: 'file',
      formData: data,
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization,
        'sys_source': sys_source
      },
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.uploadFile = uploadFile;




/**
 * 记录小程序用户formId
 */
var insertFormId = function (formId) {
  if (formId && formId.indexOf('form') == -1) {
    const Authorization = wx.getStorageSync('api_key');
    const sys_source = wx.getStorageSync('sys_source');
    wx.request({
      url: finalUrl + '/notification/formidSave',
      data: { formId: formId },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': Authorization,
        'sys_source': sys_source
      },
    })
  }
};
module.exports.insertFormId = insertFormId;

/**
 * 时间会话列表微信方式显示
 */
var geWXtDate = function (dateTimeStamp) {
  var result = '';
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = Date.parse(new Date());
  var diffValue = now - dateTimeStamp;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};
module.exports.geWXtDate = geWXtDate;

//会话 详情 时间
var geWXtDetailDate = function (dateTimeStamp) {
  var result = '';
  const time = new Date(new Date().setHours(0, 0, 0, 0)).getTime();//当天0点时间
  var date = new Date(dateTimeStamp)//传参数时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  if (dateTimeStamp > time) {//今天内
    result = [hour, minute].map(formatNumber).join(':')
  } else {
    result = [month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':')
  }
  return result;
};
module.exports.geWXtDetailDate = geWXtDetailDate;