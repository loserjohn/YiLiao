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
    role:'',
    extraShow:true,
    timesample:new Date().getTime(),
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showLoading({
    //   title: 'waiting',
    // })
    let H = app.globalData.winHeight;
    this.setData({
      height: H - 44 -44 + 'px',
      extraShow:app.globalData.role === 'maintain' ? false : true,
    })
    let key = parseInt(options.active);
    if (key  ) {
      if (app.globalData.role !== 'inspector'){
        key = key-1
      }
      this.setData({
        active: key,
        role: app.globalData.role
      });
    }
    // 添加全局事件
    app.event.on('refresh', this.refresh, this)
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
  // 重新刷新
  refresh(data,callback){
    // this.onLoad({ active:this.data.active});
    this.setData({
      timesample:new Date().getTime()
    })
    if (callback) callback()
    // this.selectComponent("#block1").loadData();
    // this.selectComponent("#block2").loadData();
    // this.selectComponent("#block3").loadData();
    // this.selectComponent("#block4").loadData();
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
  //  wx.hideLoading()
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
    this.refresh('',()=>{
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
      
    })
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