import wxRequest from './request.js';
export const baseURL = 'http://wx.fjdmll.com'

// 登录部分

// 用户密码登录
export const accountLogin = function(data) {
  return wxRequest('POST', '/api/XCXAuth/Login', data)
}

// 用户微信登录
export const wxLogin = function(data) {
  return wxRequest('POST', '/api/XCXAuth/OpenIdLogin', data)
}

// 换取openID 与sessionID
export const getIdentity = function(data) {
  return wxRequest('POST', '/api/XCXAuth/Code2Session', data)
}

// 获取服务器上的个人信息
export const getUserMsg = function(data) {
  return wxRequest('GET', '/api/User/GetUserInfo', data)
}


// 设备部分

// 获取设备列表的条件筛选选项
export const facilityOptions = function(data) {
  return wxRequest('GET', '/api/Device/GetSelect', data)
}
// 获取设备列表
export const getFacilityList = function(data) {
  return wxRequest('GET', '/api/Device/GetDeviceList', data)
}

// 获取设备详情
export const getFacilityDetail = function(data) {
  return wxRequest('GET', '/api/Device/GetDevice', data)
}

// 修改设备图片信息
export const editedFacility = function (data) {
  return wxRequest('POST', '/api/Device/UpdateDevice', data)
}



// 备件部分
// 获取备件列表
export const getAccessoryList = function(data) {
  return wxRequest('GET', '/api/Part/GetPartList', data)
}

// 报修工单部分

// 获取报修工单列表
export const getHistoryList = function(data) {
  return wxRequest('GET', '/api/Repairs/GetRepairsList', data)
}


// 其他
// 上传图片操作
export const uploadImags = function(data) {
  // return wxRequest('POST', '/api/Upload/UploadImg', data);
  let fileArr = data.tempFilePaths;
  let alls = []
  fileArr.forEach(item => {
    alls.push(promiseWork(item))
  });
  Promise.all(alls).then((result) => {
    console.log(result) // [ '3秒后醒来', '2秒后醒来' ]
  }).catch((error) => {
    console.log(error)
  })

}

function promiseWork(filePath) {
  return new Promise((resolve, reject) => {
    // wx.uploadFile({
    //   url: baseURL + '/api/Upload/UploadImg', // 仅为示例，非真实的接口地址
    //   filePath: filePath,
    //   name: 'file',
    //   formData: {
    //     folder: 'Device/65a449eb381b4a559c665840266f1cf3'
    //   },
    //   success(res) {
    //     const data = res.data
    //     console.log(data);
    //     resolve(data)
    //   }
    // })
    const uploadTask = wx.uploadFile({
      url: baseURL + '/api/Upload/UploadImg', // 仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData: {
        folder: 'Device/65a449eb381b4a559c665840266f1cf3'
      },
      success(res) {
        const data = JSON.parse(res.data).Data
        console.log(data);
      }
    })
    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
    })

  })
}