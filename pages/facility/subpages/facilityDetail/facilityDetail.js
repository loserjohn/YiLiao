// pages/facility/subpages/facilityDetail/facilityDetail.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    facility:'',
    animationData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let H = app.globalData.winHeight;
    let that = this
    this.setData({
      height: H - 44 -44 + 'px',
      facilityId: options.facilityId
    })
    // 获取facilityId的设备详情
    // console.log(options.facilityId);
    if (!options.facilityId){    
      return 
    }
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
    }, 2000)
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