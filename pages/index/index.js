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
  // 处理数组添加badage
  renderPanels(callback){  
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
    console.log('身份',role)
    if (!role) return
    this.setData({
      role: role
    })
    
    // 权限判断
    permisionFilter(role, (res) => {
      permissionObj = res  
      this.renderPanels((arr)=>{
        console.log(arr)
        this.setData({
          role: role,
          meuns: MainMenus,
          panels: arr
        })
      })
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onShow: function () {
    // console.log(1111)
   
  }, 
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
