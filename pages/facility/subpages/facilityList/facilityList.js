// pages/facility/subpages/facilityList/facilityList.js
import {
  getFacilityList
} from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showoption:false,
    limit:0,
    size:8,
    list: [],
    loading:false,
    nomore:false
  },
  modalToggle(){
    console.log(1)
    this.setData({
      show:true
    })
  }, 
  handler(){
    this.setData({
      showoption: true
    })
  },
  onClose(){
    this.setData({
      show:false,
    })
  },
  onCancel(){
    this.setData({
      showoption: false,
    })
  },
  onConfirm(){
    this.setData({
      showoption: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  loadData(){
    let data = {
      limit: this.data.limit,
      size: this.data.size,
    }
    getFacilityList(data).then(res=>{
      // console.log(res)
      this.setData({
        list:res.data
      })
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