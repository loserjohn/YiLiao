//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    meuns:[
      {
        icon:'icon-dici',
        title:'快速报修',
        badge:1,
        roles:[]
      },
      {
        icon: 'icon-gaojing',
        title: '备件查询',
        
        roles: []
      },
      {
        icon: 'icon-wumoxing',
        title: '扫码识别',
        roles: []
      },
      {
        icon: 'icon-yunyingguanli',
        title: '备件登记',
        roles: []
      }
    ],
    panels:[
      {
        icon: 'icon-ceshishenqing',
        title: '待维修',
        badge: 0,
        roles: []
      },
      {
        icon: 'icon-renjijiaohu',
        title: '维修中',
        badge: 1,
        roles: []
      },
      {
        icon: 'icon-changjingguanli',
        title: '历史记录',
        roles: []
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
