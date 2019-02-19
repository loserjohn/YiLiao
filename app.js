//app.js

App({
  onLaunch: function () {


    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.checkSession({
    //   success() {
    //     // session_key 未过期，并且在本生命周期一直有效
    //     console.log('有效')
    //   },
    //   fail() {
    //     // session_key 已经失效，需要重新执行登录流程
    //     // wx.login() // 重新登录
    //     console.log('无效')
    //   }
    // })
    // 判断是否是自动登录
    let autoLogin = wx.getStorageSync('autoLogin') || false;
    if (autoLogin){
      try {
        let openId = wx.getStorageSync('openId')
        let sessionKey = wx.getStorageSync('sessionKey');
        if (openId && sessionKey) {
          // Do something with return value;
          // 调用自动登录接口

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
  globalData: {
    // 用户身份
    userInfo:'',
    openId:'',
    sessionKey:'',
    baseURL: 'https://www.oyhdo.com',
  }
})