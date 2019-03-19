// pages/accessory/subpages/accessory/accessoryList.js
const app = getApp()
import {
  getAccessoryList
} from '../../../../utils/api.js'
import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', //搜索关键字
    index: 1,
    size: 10,
    rest: true, //是否有剩余条目
    loading: false,

    height: '',

    list: [],

  },
  // 同步keyword的值
  syncValkeyword(e) {
    this.data.keyword = e.detail
  },

  // 开始搜索
  onSearch() {
    if (!this.data.keyword) {
      Notify({
        text: '请输入关键字',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }

    this.setData({
      list: [],
      index: 1,
      rest: true
    })
    Toast.loading({
      mask: true,
      message: '搜索中...'
    });
    this.loadData((total) => {
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
  loadData(callback) {
    let that = this
    let data = {
      pageIndex: this.data.index,
      pageSize: this.data.size,
      // UNIT_CODE: app.globalData.userInfo.USER_UNIT
      UNIT_CODE: '7c818b8fcbd5473b91580b91926cef3d'
    }
    if (this.data.keyword && this.data.keyword.length > 0) {
      data.keyword = this.data.keyword
    }
    // 判断是否条件筛选
    let rest = that.data.rest;
    if (!rest) {
      return
    }

    this.setData({
      loading: true
    })
    // api请求
    getAccessoryList(data).then(res => {
      console.log(res.Data.ListInfo)
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
  onLoad: function(options) {
    let H = app.globalData.winHeight
    this.setData({
      height: H - 44 - 44 + 'px'
    })
    this.loadData()
  },
  // 刷新数据
  refresh() {
    this.setData({
      keyword: '', //搜索关键字
      index: 1,
      size: 8,
      rest: true, //是否有剩余条目
      loading: false,


      height: '',
      list: [],
    })
    this.loadData()
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  },

})