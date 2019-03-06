// pages/index/subpages/repairMsg/repairMsg.js
import {
  getRepairDetail,
  beginRepair
} from '../../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairCode:'',
    canShow:false,
    repairDetail:{}
  },

  // 加载数据
  loadData() {
    let that = this
    let code = this.data.repairCode;
    let data = {
      REPAIRS_CODE: code,
    }
    getRepairDetail(data).then(res => {
      console.log(res)
      if (res.Success) {
        that.setData({
          repairDetail: res.Data,
        })
        if (res.Data.REPAIRS_STATUS == 1){

          that.setData({
            canShow: app.globalData.role == "maintain" ? true : false
          })
        }
      }
    }).catch(err => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let repairCode = options.repairCode
 
    this.setData({
      repairCode: repairCode,
      
    })
    // 加载数据
    this.loadData()
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