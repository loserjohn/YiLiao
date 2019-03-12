// pages/index/subpages/repairOrder/repairOrder.js
const app = getApp()
import {
  getRepairDetail
} from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['故障信息','更换配件','维修进度'],
    currentType: 0,
    height: '',
    repairCode:'',
    animationData:{},
    repairDetail:''  //基本信息的详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let H = app.globalData.winHeight;
    // console.log('刷新', options)
    this.setData({
      height: H - 44 -44 + 'px',
      repairCode: options.repairCode,
      facilityId: options.facilityId
    });
    // 加载基本数据
    this.loadData()
    // 添加全局事件
    app.event.on('partRefresh', this.partRefresh, this)

  },

  // 刷新已选的备件列表
  partRefresh(){
    this.selectComponent("#swichAccessory").loadData();
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
          repairDetail: res.Data
        })
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
      }
    }).catch(err => {

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
    let pages = getCurrentPages();
    const currentPage = pages[pages.length - 1]
    console.log('刷新的参数',currentPage.options);
    if (currentPage.options.refresh){
      this.onLoad({ repairCode: currentPage.options.repairCode, facilityId: currentPage.options.facilityId })
    }
   
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