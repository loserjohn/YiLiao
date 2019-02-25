// pages/accessory/subpages/addRepair/addRepair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    clientWidth:''
  },
  // 二维码扫码回调
  scanCode(res){
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.setData({
          clientWidth: clientWidth
        });
        // console.log(clientHeight)
      }
    });
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
  handler: function() {
    this.setData({
      show: true
    })
  },
  onConfirm: function() {
    this.setData({
      show: false
    })
  },

  onCancel: function() {
    this.setData({
      show: false
    })
  },

  onClickButton:function(){
    
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