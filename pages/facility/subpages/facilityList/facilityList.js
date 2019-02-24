// pages/facility/subpages/facilityList/facilityList.js
import {
  getFacilityList,
  facilityOptions
} from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    limit:0,
    size:8,
    list: [],

    currentOptions:{},//选项数组
    options: [],//数组
    condition:{
      type:'',
      office:'',
      status:''
    },//当前的筛选条件

    show: false,
    showoption: false,
    loading:false,
    nomore:false
  },
  // 显示筛选界面
  modalToggle(){
    console.log(1)
    this.setData({
      show:true
    })
  }, 
  // 显示选项
  handler(e){    
    let id = e.target.id;
    console.log(id,this.data.options);
    this.data.options[id].key = id
    this.setData({
      currentOptions:this.data.options[id],
      showoption: true
    })
  },
  // 关闭筛选界面
  onClose(){
    this.setData({
      show:false,
    })
  },
  // 取消选择
  onCancel(){
    this.setData({
      showoption: false,
    })
  },
  // 选中选项
  onConfirm(e){
    
    let res = e.detail.value
    let key = this.data.currentOptions.key
    console.log(res, key)
    this.data.condition[key] = res
    this.setData({
      condition: this.data.condition,
      showoption: false,
    })
  },
  // 扫描回调
  scanCode(res){
    // console.log(res);
    let code = res.detail;
    wx.showLoading({
      title: '设备查找中',
    })
    setTimeout(()=>{  
      wx.hideLoading()
      wx.navigateTo({
        url: `/pages/facility/subpages/facilityDetail/facilityDetail?facilityId=${code}`,
      })
    },1000)
   
  },

  // 加载设备列表
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
  // 初始化设备列表的筛选条件
  initFilterOption(){
    let that = this
    facilityOptions().then(res=>{
      // console.log(res);
      this.setData({
        options:res
      })

    }).catch(err=>{})
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.initFilterOption()
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