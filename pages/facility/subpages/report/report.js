// pages/facility/subpages/report/report.js
import {
  getRepairDetail,
  matingAccessory
} from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairCode:'',
    repairDetailData:{},
    list:[],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let repairCode = options.repairCode
    console.log(repairCode)
    this.setData({
      repairCode: repairCode
    })
    this.loadData()
  },
  // 加载数据
  loadData() {
    let that = this
    let code = this.data.repairCode;

    // 获取报修信息
    let data = {
      REPAIRS_CODE: code,
    }
    getRepairDetail(data).then(res => {
      // console.log(res)
      if (res.Success) {
        that.setData({
          repairDetailData: res.Data
        })
       
      }
    }).catch(err => {

    })
    // 获取已使用的备件列表
    let data2 = {
      pageIndex: 1,
      pageSize: 100,
      REPAIRS_CODE: this.data.repairCode
    }
    // api请求
    matingAccessory(data2).then(res => {
      // 后面还有数据
      that.data.list = res.Data.ListInfo;
      that.setData({
        list: that.data.list
      })
    }).catch(err => {

    })
  },
  toPreview(){
    // this.setData({
    //   show:true
    // })
    wx.navigateTo({
      url: '/pages/facility/subpages/reportPreview/reportPreview?repairCode=' + this.data.repairCode,
    })
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