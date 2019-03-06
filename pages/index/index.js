//index.js
//获取应用实例
import { MainMenus, permisionFilter } from '../../utils/permision.js';
const app = getApp()
const Utils = require('../../utils/util.js')

let permissionObj = {}
import {
  getUserMsg
} from '../../utils/api.js'


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    role:-1,
    meuns:[],
    panels:[]
  },
  errImg(e) {
    // console.log('pic', e)
    // app.errImg(e)
  },
  // 跳转
  linkTo:function(event){
    Utils.pageLink(event)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  test() {
    console.log(22222)
  },
  // 处理数组添加badage
  renderPanels(callback){  
    // username: that.data.form.userName.value,
    // let username =app.globalData.userAccount
    getUserMsg().then(res=>{    
      if (res.waitingRepair && permissionObj.waitingRepair){
        permissionObj.waitingRepair.badge = res.waitingRepair
      }
      if (res.inRepair && permissionObj.inRepair) {
        permissionObj.inRepair.badge = res.inRepair
      }   
      let permissionArr = Object.values(permissionObj);
      console.log("用户信息",res)
      app.globalData.userInfo = res.Data
      this.setData({
        userInfo: res.Data
      })
      if (callback) {
        callback(permissionArr)
      }    
    }).catch(err=>{
      // debugger
      callback([])
    })
    
  },
  onLoad: function () {
    let role = app.globalData.role;
    // wx.showNavigationBarLoading()
    console.log('身份',role)
    if (!role) return
    this.setData({
      role: role
    })
    
    // 权限判断
    permisionFilter(role, (res) => {
      permissionObj = res  
      this.renderPanels((arr)=>{
        // console.log(arr)
        this.setData({
          role: role,
          meuns: MainMenus,
          panels: arr
        })
      })
    })

  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onShow: function () {
    // console.log(1111)
   
  }, 
})
