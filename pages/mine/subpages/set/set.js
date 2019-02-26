// pages/mine/subpages/set/set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      wxUserInfo: app.globalData.wxUserInfo
    })
  
    //  {
    //   UNIT_ADDR: "福建省五四路口100号"
    //   UNIT_NAME: "福建省立医院"
    //   USER_FULL_NAME: "郑云生"
    //   USER_HEAD: null
    //   USER_MAIL: ""
    //   USER_MOBLIE: ""
    //   USER_NAME: "mainhosp"
    //   USER_OpenId: "owRL60HOFkFSKDhmI0Ur7U-jNBJ0"
    //   USER_PWD: "057F2F883EE1ADC3949BA59ABBE56E"
    //   USER_REMARK: "mFVP4CDOkMUmJTw363p2OA=="
    //   USER_SEX: null
    //   USER_STATUS: "1"
    //   USER_TYPE: "2"
    //   USER_UNIT: "7c818b8fcbd5473b91580b91926cef3d"
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})