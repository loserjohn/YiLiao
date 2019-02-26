//app.js

import {
  wxLogin
} from './utils/api.js'
App({
  onLaunch: function() {

   
  },
  // 判断用户身份
  UserIdentity(key){

  }, 
  globalData: {
    // 用户身份
    winHeight:559,
    userInfo: {}, //本地服务器的用户信息
    wxUserInfo:{}, //微信服务器的用户信息
    openId: '',
    sessionKey: '',
    baseURL: 'http://wx.fjdmll.com',
  }
})