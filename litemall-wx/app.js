var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./utils/user.js');

App({
  onLaunch: function() {
    //UpdateManager 对象，用来管理更新，可通过 wx.getUpdateManager 接口获取实例。
    const updateManager = wx.getUpdateManager();
    //监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    wx.getUpdateManager().onUpdateReady(function() {
      //显示模态对话框
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          // confirm 为 true 时，表示用户点击了确定按钮
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  onShow: function(options) {
    user.checkLogin().then(res => {
      this.globalData.hasLogin = true;
    }).catch(() => {
      this.globalData.hasLogin = false;
    });
  },
  globalData: {
    hasLogin: false
  }
})