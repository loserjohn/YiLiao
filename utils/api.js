import wxRequest from './request.js';

// 获取系统信息
export const getSystemInfo = function (data) {
  return wxRequest('GET', '/api/XCXAuth/GetPublicData', data)
}


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
// export const getIdentity = function(data) {
//   return wxRequest('POST', '/api/XCXAuth/Code2Session', data)
// }

// 获取服务器上的个人信息
export const getUserMsg = function(data) {
  return wxRequest('GET', '/api/User/GetUserInfo', data)
}

// 修改密码
export const updatedPass = function (data) {
  return wxRequest('POST', '/api/User/SetUserPass', data)
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
  return wxRequest('GET', '/api/Part/GetPublicPartList', data)
}

// 关联备件列表
export const getLinkPartList = function (data) {
  return wxRequest('GET', '/api/Part/GetLinkPartList', data)
}



// 报修工单部分

// 获取报修工单列表
export const getHistoryList = function(data) {
  return wxRequest('GET', '/api/Repairs/GetRepairsList', data)
}

export const getRepairList = function (data) {
  return wxRequest('GET', '/api/Repairs/GetRepairsList', data)
}

// 故障报修详细信息
export const getRepairDetail = function (data) {
  return wxRequest('GET', '/api/Repairs/GetRepairs', data)
}

// 获取可指派的维修员列表
export const getMaintainList = function (data) {
  return wxRequest('GET', '/api/Repairs/GetMakeUserList', data)
}

// 快速报修
export const submitRepairs = function (data) {
  return wxRequest('POST', '/api/Repairs/SubmitRepairs', data)
}

// 完成试机
export const doneRepairsTest = function (data) {
  return wxRequest('POST', '/api/Repairs/DoneRepairsTest', data)
}

// 添加存在的公共备件 
export const addAccessory = function (data) {
  return wxRequest('POST', '/api/PartChanger/SubmitPublicBePart', data)
}
// 添加存在的关联备件 
export const addLinkAccessory = function (data) {
  return wxRequest('POST', '/api/PartChanger/SubmitLinkBePart', data)
}



// 添加不存在的备件 
export const addNewAccessory = function (data) {
  return wxRequest('POST', '/api/PartChanger/SubmitNotPart', data)
}

// 删除已经添加的备件 
export const delectAccessory = function (data) {
  return wxRequest('POST', '/api/PartChanger/DeletePart', data)
}

//领取报修
export const beginRepair = function (data) {
  return wxRequest('POST', '/api/Repairs/AffirmRepairs', data)
}

// 获取该订单下的已选备件
export const matingAccessory = function (data) {
  return wxRequest('GET', '/api/PartChanger/GetUsePartList', data)
}

// 自动绑定维保信息
export const getWarrantyInfo = function (data) {
  return wxRequest('POST', '/api/Repairs/GetKeepInfo', data)
}


// 完成报修
export const completeRepair = function (data) {
  return wxRequest('POST', '/api/Repairs/SubmitFinish', data)
}

// 获取已被使用的备件的详情
export const relevantAccessory = function (data) {
  return wxRequest('GET', '/api/PartChanger/GetPartModel', data)
}

// // 获取售后公司列表
// export const relevantAccessory = function (data) {
//   return wxRequest('GET', '/api/PartChanger/GetPartModel', data)
// }

// 加载本医院的维保公司
export const getKeepList = function (data) {
  return wxRequest('GET', '/api/Repairs/GetKeepList', data)
}


