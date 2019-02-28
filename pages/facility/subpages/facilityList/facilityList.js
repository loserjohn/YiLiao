// pages/facility/subpages/facilityList/facilityList.js

import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
import {
  getFacilityList,
  facilityOptions,
  getFacilityDetail
} from '../../../../utils/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',//搜索关键字
    index:1,
    size:8,
    list: [],
    rest:true,//是否有剩余条目

    currentOptions:{},//选项数组
    options:{}, //默认的所有选项
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
    // debugger
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
    // debugger
    // console.log(res, key)

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
      title: '查找设备中',
    })
    // 判断是否存在该设备    
    getFacilityDetail({ DEVICE_CODE: code }).then(res => {
      console.log(res)
      if(res.Success){
        wx.hideLoading()
        wx.navigateTo({
          url: `/pages/facility/subpages/facilityDetail/facilityDetail?facilityId=${code}`,
        })
      }else{
        wx.hideLoading();
        Toast.fail('没有找到该设备的相关信息');  
      }
    }).catch(err => {
      wx.hideLoading();
      
    })  
   
  },
  // 同步keyword的值
  syncVal(e){
    // console.log(e.detail);
    this.data.keyword = e.detail
  },
  // 开始搜索
  onSearch(){
    let condition = this.data.condition  
    if (!this.data.keyword && !condition.type.Value && !condition.office.Value && !condition.status.Value){
      Notify({
        text: '请输入关键字或者选择筛选条件',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return 
    }

    this.setData({
      list:[],
      index:1,
      rest:true
    })
    Toast.loading({
      mask: true,
      message: '搜索中...'
    });
    this.loadData((total)=>{        
      Toast.clear();
      Notify({
        text: '搜索到一共' + total + '条数据',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1989fa'
      }); 
    })
  },
  // 加载设备列表
  loadData(callback){
    let that = this
    let data = {
      pageIndex: this.data.index,
      pageSize: this.data.size,
      // UNIT_CODE: app.globalData.userInfo.USER_UNIT
      UNIT_CODE: '7c818b8fcbd5473b91580b91926cef3d'   
    }
    // debugger
    // 判断是否条件筛选
    let condition = this.data.condition  
    if (condition.type && condition.type.length>0){
      data.DEVICE_TYPE = condition.type.Value
    }
    if (condition.office && condition.office.length > 0) {
      data.SOURCE_UNIT = condition.office.Value
    }
    if (condition.status && condition.status.length > 0) {
      data.DEVICE_STATUS = condition.status.Value
    }
    if (this.data.keyword && this.data.keyword.length > 0) {
      data.keyword = this.data.keyword
    }

    let rest = that.data.rest ;
    if (!rest) {return}

    this.setData({
      loading: true
    })
    // api请求
    getFacilityList(data).then(res=>{
      // console.log(data)
        // 后面还有数据
        that.data.list = that.data.list.concat(res.Data.ListInfo);
        // 后面y有没有数据了
        if (that.data.list.length >= res.Data.Total){
          that.setData({
            list: this.data.list,
            loading: false,
            rest: false
          })  
        }else{
          that.setData({
            list: that.data.list,
            loading: false
          })
        }   
      console.log(that.data.index, that.data.list.length);
      if (callback) callback(res.Data.Total)
    }).catch(err=>{

    })
  },
  // 加载更多
  loadMore(){
   
    if (this.data.loading || !this.data.rest){
      return
    }
    this.data.index += 1;
    
    this.loadData()
  },
  // 初始化设备列表的筛选条件
  initFilterOption(){
    let that = this
    facilityOptions().then(res=>{
     
      // 添加  '全部' 选择项
      let Obj = res.Data;
      let keyArr = Object.keys(Obj);
      // console.log(keyArr)
      keyArr.forEach(item=>{
        Obj[item].options.unshift({
          Value:"",
          Text:"全部"
        })
      })
      // console.log(Obj)
      this.setData({
        options:Obj
      })
      // debugger

    }).catch(err=>{})
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.initFilterOption()
    this.loadData((total)=>{
      Notify({
        text: '搜索到一共' + total + '条数据',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1989fa'
      }); 
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