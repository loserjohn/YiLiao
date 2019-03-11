//app.js

import Event from './utils/event.js'
import {
  wxLogin,
  getIdentity
} from './utils/api.js'


App({
  onLaunch: function() {
    // console.log(1)
   
  },
  // 全局时间订阅者
  event: new Event(),
  // 获取用户信息 
  globalUserInfo(callback){
    let that = this
    if (that.globalData.wxUserInfo){
      if (callback) callback()  
      return
    };
    wx.getUserInfo({
      success(res) {
        that.globalData.wxUserInfo = res;  
        if (callback) callback()  
      }
    })
  },
  // 微信登录
  globalLogin(callback){
    wx.login({
      success: res => {
        // app.globalData.code = res.code; 
        console.log('code ' + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        let data = {
          username: this.globalData.userAccount,
          code: res.code
        }
        getIdentity(data).then(res => {
          console.log(111, res.Data);
          wx.setStorageSync('openId', res.Data.openid)
          wx.setStorageSync('sessionKey', res.Data.session_key);    
          if (callback) callback()
        })

      }
    })
  },
  globalData: {
    // 用户身份
    // role:'inspector',
    // role: 'maintain',
    winHeight:559, 
    userInfo: {}, //本地服务器的用户信息
    // wxUserInfo:{}, //微信服务器的用户信息
    openId: '',
    sessionKey: ''
  }
})
