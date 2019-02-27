import wxRequest from './request.js';


// 登录部分

// 用户密码登录
export const accountLogin = function (data) {
  return wxRequest('POST', '/api/XCXAuth/Login',data)
} 

// 用户微信登录
export const wxLogin = function (data){
  return wxRequest('POST', '/api/XCXAuth/OpenIdLogin', data)
} 

// 换取openID 与sessionID
export const getIdentity = function (data) {
  return wxRequest('POST', '/api/XCXAuth/Code2Session', data)
} 

// 获取服务器上的个人信息
export const getUserMsg = function (data) {
  return wxRequest('GET', '/api/User/GetUserInfo', data)
} 


// 设备部分

// 获取设备列表的条件筛选选项
export const facilityOptions = function (data) {
  return wxRequest('GET', '/api/Device/GetSelect', data)
} 
// 获取设备列表
export const getFacilityList = function (data) {
  return wxRequest('GET', '/api/Device/GetDeviceList', data)
} 

// 获取设备详情
export const getFacilityDetail = function (data) {
  return wxRequest('GET', '/api/Device/GetDevice', data)
} 