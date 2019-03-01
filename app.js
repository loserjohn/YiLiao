//app.js

import {
  wxLogin
} from './utils/api.js'
App({
  onLaunch: function() {

   
  },

  // 获取用户信息 
  globalUserInfo(callback){
    let that = this
    if (that.globalData.wxUserInfo)return;
    wx.getUserInfo({
      success(res) {
        console.log( res);
        that.globalData.wxUserInfo = res;  
      
        if (callback) callback()  
      }
    })
  },
  globalData: {
    // 用户身份
    // role:'inspector',
    winHeight:559, 
    userInfo: {}, //本地服务器的用户信息
    // wxUserInfo:{}, //微信服务器的用户信息
    openId: '',
    sessionKey: ''
  }
})