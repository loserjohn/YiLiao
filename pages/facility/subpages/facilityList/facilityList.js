// pages/facility/subpages/facilityList/facilityList.js

import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
import {
  getFacilityList,
  facilityOptions
} from '../../../../utils/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',//搜索关键字
    limit:0,
    size:8,
    list: [],
    rest:true,//是否有剩余条目

    currentOptions:{},//选项数组
    options: [],//数组
    condition:{
      type:{},
      office: {},
      status: {}
    },//当前的筛选条件

    show: false,
    showoption: false,
    loading:false,
    nomore:false
  },
  // 显示筛选界面
  modalToggle(){
    this.setData({
      show:true
    })
  }, 
  // 显示选项
  handler(e){    
    let id = e.target.id;
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
  // 同步keyword的值
  syncVal(e){
    // console.log(e.detail);
    this.data.keyword = e.detail
  },
  // 开始搜索
  onSearch(){
    let condition = this.data.condition  
    if (!this.data.keyword && !condition.type.key && !condition.office.key && !condition.status.key){
      Notify({
        text: '请输入关键字或者选择筛选条件',
        duration: 1000,
        selector: '#van-notify',
        // backgroundColor: '#1989fa'
      });
      return 
    }
    this.data.list = [];
    Toast.loading({
      mask: true,
      message: '搜索中...'
    });
    this.loadData(()=>{
      Toast.clear();
    })
  },
  // 加载设备列表
  loadData(callback){
    
    let data = {
      limit: this.data.limit,
      size: this.data.size,
      UNIT_CODE: app.globalData.userInfo.USER_UNIT
      // UNIT_CODE: '7c818b8fcbd5473b91580b91926cef3d'   
    }
    // debugger
    // 判断是否条件筛选
    let condition = this.data.condition  
    if (condition.type && condition.type.length>0){
      data.DEVICE_TYPE = condition.type.key
    }
    if (condition.office && condition.office.length > 0) {
      data.SOURCE_UNIT = condition.office.key
    }
    if (condition.status && condition.status.length > 0) {
      data.DEVICE_STATUS = condition.status.key
    }
    if (this.data.keyword && this.data.keyword.length > 0) {
      data.keyword = this.data.keyword
    }
    this.setData({
      loading: true
    })
    console.log(data)
    // api请求
    getFacilityList(data).then(res=>{
      // wx.hideLoading();
      // debugger
      console.log(res)
      if(!res.rest){
        // 后面还有数据
        this.data.list = this.data.list.concat(res.Data.ListInfo);
        
        this.setData({
          // 后面没有数据了
          list: this.data.list,
          loading:false
        })
        // debugger
      }else{
        this.setData({
          // 后面没有数据了
          loading: false,
          rest:false
        })
      }
      if (callback) callback()
    }).catch(err=>{

    })
  },
  // 加载更多
  loadMore(){
    console.log(this.data.limit);
    if (!this.data.rest){
      return
    }
    this.data.limit += this.data.size;
    this.loadData()
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