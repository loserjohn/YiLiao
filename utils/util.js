const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 手机格式校验
const checkPhone = str => {
  let r = (/^1[3456789]\d{9}$/.test(str))
  return r
}
// 密码格式校验
//校验密码：只能输入6-20个字母、数字、下划线  
const checkPass = str => {
  var patrn = /^(\w){5,20}$/;
  if (!patrn.exec(str)) return false
  return true

}
// 对象拷贝
const copyObj = obj => {
  let o = Object.assign({},obj)
  return o
}

// 扫描二维码
const  scanCode = (callback)=>{
  return new Promise((resolve,reject)=>{
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        if(res && res.result){
          resolve(res.result)
        }else{
          reject('没有检测到相关设备信息')
        }   
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  checkPass: checkPass,
  copyObj: copyObj,
  scanCode: scanCode
}
