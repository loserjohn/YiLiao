const baseURL = 'http://rest.apizza.net/mock/6eba8757261592f70332fff1a14d530e'
const wxRequest =  function (method, url, data) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        console.log('请求success')  
        resolve(res.data) 
      },
      fail: function (err) {
        console.log('请求错误处理')
        reject(err)
        // errFun(res); 
      }
    }) 
  })
}

export default wxRequest