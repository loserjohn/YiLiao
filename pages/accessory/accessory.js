// pages/accessory/accessory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meuns: [
      {
        icon: 'icon-guanfangbanben',
        title: '报修设备',
        roles: [],
        path: 'addRepair'
      },
      {
        icon: 'icon-guize',
        title: '添加设备',
        roles: [],
       
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 跳转
  linkTo: function (event) {
    let to = event.currentTarget.dataset['to'];

    let url = ''
    switch (to) {
      case 'addRepair':
        url = './subpages/addRepair/addRepair'
        break;
      case 'order2':
        url = './subpages/orders/orders?active=1'
        break;
      case 'record':
        url = './subpages/record/record'
        break;
      default:

    }
    wx.navigateTo({
      url: url
    })
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