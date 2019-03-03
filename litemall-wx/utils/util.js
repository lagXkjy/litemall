var api = require('../config/api.js');
//全局的 getApp() 函数可以用来获取到小程序 App 实例。
//不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
//通过 getApp() 获取实例之后，不要私自调用生命周期函数。
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        //header 中不能设置 Referer content-type 默认为 application/json
        'Content-Type': 'application/json',
        //wx.getStorageSync,从本地缓存中同步获取指定 key 的内容
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            //wx.navigateTo保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  
  //显示消息提示框
  wx.showToast({
    //提示的内容
    title: msg,
    //自定义图标的本地路径，image 的优先级高于 ico
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast
}