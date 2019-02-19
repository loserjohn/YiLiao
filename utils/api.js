import wxRequest from './request.js';


// 登录部分

// 用户密码登录
export const accountLogin = function (data) {
  return wxRequest('POST', '/api/accountLogin',data)
} 

// 用户微信登录
export const wxLogin = function (data){
  return wxRequest('POST', '/api/wxLogin', data)
} 

// 换取openID 与sessionID
export const getIdentity = function (data) {
  return wxRequest('POST', '/api/getIdentity', data)
} 
