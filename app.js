//app.js

import Event from './utils/event.js'
import {
  
} from './utils/api.js'


App({
  onLaunch: function() {
    // console.log(777)
    // this.globalUserInfo()
    // this.globalLogin()
    // this.getCode(code=>{
    //   console.log(code)
    // })
    // 获取系统相关配置信息
   
  },
  // 全局时间订阅者
  event: new Event(),
  // 获取用户信息 
  globalUserInfo(callback){
    let that = this
    if (that.globalData.wxUserInfo){
      console.log('weixin0', that.globalData.wxUserInfo)
      if (callback) callback()  
      return
    };
    wx.getUserInfo({
      success(res) {
        that.globalData.wxUserInfo = res.userInfo;  
        console.log('weixin1',that.globalData.wxUserInfo )
        if (callback) callback()  
      }
    })
  },
  // 换取code
  getCode(callback){
    wx.login({
      success: res => {
        // app.globalData.code = res.code; 
        console.log('code ' + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        let code = res.code;
        if (callback) callback(code)
      }
    })
  },
  globalData: {
    // 用户身份
    // role:'inspector',
    // role: 'maintain',
    winHeight:559, 
    // userInfo: {}, //本地服务器的用户信息
    // wxUserInfo:{}, //微信服务器的用户信息
    openId: '',
    sessionKey: ''
  }
})
