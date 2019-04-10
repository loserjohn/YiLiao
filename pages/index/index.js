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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    role:-1,
    meuns:[],
    panels:[],
    waitting:true,
    animationData:{},
    systemInfo:{}
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
  // 处理数组添加badage
  renderPanels(callback){ 
    getUserMsg().then(res=>{   
      if (res.Data.waitingRepair>=0 && permissionObj.waitingRepair){
        permissionObj.waitingRepair.badge = res.Data.waitingRepair
      }
      if (res.Data.inRepair>=0 && permissionObj.inRepair) {
        permissionObj.inRepair.badge = res.Data.inRepair
      }   
      let permissionArr = Object.values(permissionObj);
      console.log("用户信息", res, permissionArr)
      app.globalData.userInfo = res.Data.user
      this.setData({
        userInfo: res.Data.user
      })
      if (callback) {
        callback(permissionArr) 
      }    
    }).catch(err=>{
      // debugger
      callback([])
    })
    
  },
  // 重新刷新
  indexRefresh(data, callback) {
    console.log('首页刷新')
    permissionObj = {}
    this.init()
    if (callback) callback()

  },
  // 初始化数据显示
  init(){
    let role = app.globalData.role
    permisionFilter(role, (res) => {
      permissionObj = res
      // debugger
      this.renderPanels((arr) => {
        this.setData({
          role: role,
          meuns: MainMenus,
          panels: arr,

        })
        setTimeout(() => {
          const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
          });
          animation.opacity(0).step();
          this.setData({
            // waitting: false,
            animationData: animation.export()
          })
        }, 1000)
        // wx.hideLoading()
      })
    })
  },
  onLoad: function () {
    let role = app.globalData.role;
    if (!role) return
    this.setData({
      role: role,
      systemInfo: app.globalData.systemInfo?app.globalData.systemInfo.IndexBgImg[0]:''
    })
    // 添加全局事件
    app.event.on('indexRefresh', this.indexRefresh, this)
    // 权限判断
    this.init()

  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onShow: function () {
    // console.log(1111)
   
  }, 
  onUnload: function () {

    app.event.off('indexRefresh')
  },
})
