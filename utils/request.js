const baseURL = 'http://wx.fjdmll.com'
const app = getApp()

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
          console.log('请求success,结果true');
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
                  username: wx.getStorageSync('userAccount'),
                  code: res.code
                }
                identity(data).then(res => {
                  // wx.setStorageSync('openId', res.Data.openid)
                  console.log(res)
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
const identity = function(data){
  debugger
  return new  Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + '/api/XCXAuth/Code2Session', // 仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'// 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.Success) {
          resolve(res.data)
        }
       
      },
      fail(err){
        console.log('请求错误处理', err)
        reject(err)
      }
    })
  })
  

}

export default wxRequest