//app.js
import {
  wxLogin
} from './utils/api.js'

App({
  onLaunch: function() {

   
  },
  // 判断是否过期是否直接登录
 
  globalData: {
    // 用户身份
    role: 'maintain',
    userInfo: {},
    openId: '',
    sessionKey: '',
    baseURL: 'https://www.oyhdo.com',
  }
})