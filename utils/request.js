const baseURL = 'http://wx.fjdmll.com'
const app = getApp()
import {
  wxLogin
} from './api.js'


const wxRequest =  function (method, url, data) {
  let Authorization = 'Bearer ' + wx.getStorageSync('sessionKey')
  let header = {
    'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
  if (Authorization){
    header.Authorization = Authorization
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: header,
      dataType: 'json',
      success: function (res) {
       
        if (res.data.Success){
          // console.log('请求success,结果true');
          resolve(res.data) 
        }else{
          console.log('请求success,结果false',res)
          if (res.statusCode==401){
            // 没有权限错误
            wx.showLoading({
              title: '重新连接中',
            })
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
                let data = {
                  code: res.code
                }
                wxLogin(data).then(res => {
                  wx.setStorageSync('openId', res.Data.openid)
                  wx.setStorageSync('sessionKey', res.Data.session_key);
                  setTimeout(function () {
                    wx.hideLoading()
                  }, 1000);
                })

              }
            })
          }
          resolve(res.data.Msg ? res.data : { Msg: '服务器未知错误'})
        }      
      },
      fail: function (err) {
        console.log('请求错误处理', err)
        reject(err)
        // errFun(res); 
      }
    }) 
  })
}

export default wxRequest