// pages/facility/subpages/relevantAccessory/relevantAccessory.js
import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
import {
  relevantAccessory
} from '../../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessoryId:'',
    detail:'',
    totalPrices:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.changerId;
    // console.log(id)
    this.loadData(id)
  },

  loadData(id){
    let that =this
    relevantAccessory({ CHANGER_CODE: id}).then(res=>{
      console.log(res)
      if(res.Success){
        that.setData({
          detail: res.Data.partModel,
          totalPrices: res.Data.TotalPrices
        })
      }    
    }).catch(err=>{

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