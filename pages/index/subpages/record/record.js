// pages/index/subpages/record/record.js
const app = getApp()
import {
  getHistoryList
} from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:10,
    list: [] ,
    loading:false,
    rest:true
  },
  // 加载数据
  loadData(callback){
    let role = this.data.role
    let that = this
    let data={
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      REPAIRS_STATUS:3,
      UNIT_CODE: this.data.userInfo.USER_UNIT
    }
    
    if (role =="maintain"){
      // 维修人员
      data.MAKE_USER = this.data.userInfo.USER_NAME
    } else if (role == "inspector"){
      // 巡检员
      data.REPAIRS_USER = this.data.userInfo.USER_NAME
    }
    // debugger
    let rest = that.data.rest;
    if (!rest) { return }

    this.setData({
      loading: true
    })
    console.log(data)
    // api
    getHistoryList(data).then(res => {
     
      // 后面还有数据
      that.data.list = that.data.list.concat(res.Data.ListInfo);
      // 后面y有没有数据了
      if (that.data.list.length >= res.Data.Total) {
        that.setData({
          list: this.data.list,
          loading: false,
          rest: false
        })
      } else {
        that.setData({
          list: that.data.list,
          loading: false
        })
      }
      // console.log(that.data.index, that.data.list.length);
      if (callback) callback(res.Data.Total)
    }).catch(err => {
      console.log(1111)
    })

  },
  // 加载更多
  loadMore() {
    if (this.data.loading || !this.data.rest) {
      return
    }
    this.data.index += 1;

    this.loadData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      role: app.globalData.role,
      userInfo: app.globalData.userInfo
    })
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
   
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loading: true
    })
    console.log(this.data.loading)
    let arr = [...this.data.list] ; 
    arr = arr.concat(this.data.list)
    setTimeout(() => {
      this.setData({
        list: arr,
        loading: false,
        nomore:false
      })
      console.log(this.data.loading)
    },2000)
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})