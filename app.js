//app.js

import Event from './utils/event.js'
import {
  wxLogin
} from './utils/api.js'

// console.log(Event)
App({
  onLaunch: function() {

   
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