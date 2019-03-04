// pages/index/orders/orders.js

import {
  getRepairList
} from '../../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    pageIndex: 1,
    pageSize: 100,
    repairList: [],
    inRepairList: [],
    height: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let H = app.globalData.winHeight;
    // console.log(H)
    this.setData({
      height: H - 44 + 'px'
    })
    let key = parseInt(options.active);
    if (key == 1) {
      this.setData({
        active: 1
      });
    }
    // 加载数据
    this.loadData();
    // 添加全局事件
    app.event.on('refresh', this.refresh, this)

  },
  // 重新刷新
  refresh(data){
    // console.log('woshoudaola#############' + data)
    
    this.loadData()
  },
  loadData() {
    let that = this
    let data = {
      pageIndex: 1,
      pageSize: 100,
      // MAKE_USER: app.globalData.userInfo.USER_NAME, //维修人 
      UNIT_CODE: app.globalData.userInfo.USER_UNIT
    }
    
    data.REPAIRS_STATUS =  1
    // console.log(data)
    getRepairList(data).then(res => {
      // console.log(res.Data.ListInfo.length)
      this.setData({
        repairList: res.Data.ListInfo
      })
    }).catch(err => {

    })
    data.REPAIRS_STATUS = 2
    getRepairList(data).then(res => {
      // console.log(res)
      this.setData({
        inRepairList: res.Data.ListInfo
      })
    }).catch(err => {

    })

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

    app.event.off('refresh')
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