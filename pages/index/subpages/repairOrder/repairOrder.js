// pages/index/subpages/repairOrder/repairOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['故障信息','更换配件','维修进度'],
    currentType: 0,
    height: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    let H = app.globalData.winHeight;
    // console.log(this.data.height)
    this.setData({
      height: H - 44 + 'px'
    })
      // console.log(H - 44  + 'px')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})