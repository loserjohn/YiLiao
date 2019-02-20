//app.js
import {
  wxLogin
} from './utils/api.js'

App({
  onLaunch: function() {

    // 判断是否是自动登录
    let autoLogin = wx.getStorageSync('autoLogin') || false;
    if (!autoLogin) {
      try {
        let openId = wx.getStorageSync('openId')
        let sessionKey = wx.getStorageSync('sessionKey');
        if (openId && sessionKey) {
          // Do something with return value;
          // 调用自动登录接口
          this.autoLoin(openId, sessionKey)
        }
      } catch (e) {
        // Do something when catch error
        wx.showToast({
          title: '自动登录失败,请手动登录',
          // icon: 'success',
          duration: 1000
        })
      }
    }
  },
  // 判断是否过期是否直接登录
  autoLoin(openId, sessionKey) {
    let that = this
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log('有效');
        that.globalData.sessionKey = sessionKey;
        that.globalData.openId = openId;
        let data = {
          sessionKey: sessionKey,
          openId: openId
        }
        wxLogin(data).then(res => {
          console.log('自动登录');
          // that.globalData.userInfo = res.userInfo;
          that.globalData.userInfo = { role: 'maintain'}
          // that.globalData.userInfo = { role: 'inspector' }
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }).catch(err=>{
          wx.showToast({
            title: '自动登录失败',
            duration: 1000
          })
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log('无效');
        wx.showToast({
          title: '登录状态过期，请手动登录',
          duration: 1000
        })
      }
    })
  },
  globalData: {
    // 用户身份
    userInfo: {
      role:'maintain', 
      // role:'inspector'
    },
    openId: '',
    sessionKey: '',
    baseURL: 'https://www.oyhdo.com',
  }
})