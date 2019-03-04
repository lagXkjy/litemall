/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function (resolve, reject) {

    // 检查登录态是否过期。
    // 通过 wx.login 接口获得的用户登录态拥有一定的时效性。
    // 用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。
    //具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
    // 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  //调用接口获取登录凭证（code）。
  //通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等
  //用户数据的加解密通讯需要依赖会话密钥完成。
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 code2Session，
        //使用 code 换取 openid 和 session_key 等信息
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {

  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, {
        code: res.code,
        userInfo: userInfo
      }, 'POST').then(res => {
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};