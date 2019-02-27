const baseURL = 'http://wx.fjdmll.com'
const Authorization = 'Bearer ' + wx.getStorageSync('sessionKey')
const wxRequest =  function (method, url, data) {
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
          console.log('请求success,结果false')
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