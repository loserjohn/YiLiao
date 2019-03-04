// pages/accessory/subpages/accessory/accessoryList.js
const app = getApp()
import {
  getAccessoryList,
  addAccessory
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
    size: 8,
    rest: true, //是否有剩余条目
    loading: false,
    num: 0,
    show: false,
    typeAction: '',
    height: '300px',
    currentType: 2,
    list: [],

    currentAccessory: {}, //当前弹窗选择的备件
    selectForm: {
      selectNum: 1,
      selectDes: '',
      selectPrize: 0
    }
  },
  // 同步keyword的值
  syncValkeyword(e) {
    // console.log(e.detail);
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
      // console.log(data)
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
    if (this.data.loading || ! this.data.rest) {
      return
    }
    this.data.index += 1;

    this.loadData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let typeAction = options.facilityId?true:false
    // 传进来的facilityId
    let facilityId = options.facilityId || ''
    let repairCode = options.repairCode || ''
    // debugger
    let H = app.globalData.winHeight
    // debugger
    this.setData({
      height: H - 44 - 44 + 'px',
      typeAction: typeAction,
      facilityId: facilityId,
      repairCode: repairCode
    });

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
  // 关闭弹窗  用户点击判断
  onClose(event) {
    console.log(this.data.selectForm)
    let that = this
    if (event.detail === 'confirm') {
      if (!this.data.selectForm.selectNum){
        that.setData({
          show: false
        });
        Toast.fail('请输入数量');
        return;
      }
      if (!this.data.selectForm.selectPrize) {
        that.setData({
          show: false
        });
        Toast.fail( '请输入备件价格');
        
        return;
      }
      // 异步关闭弹窗
      let data = {
        REPAIRS_CODE: this.data.repairCode,
        PART_CODE: this.data.currentAccessory.PART_CODE,
        PART_NUM: this.data.selectForm.selectNum,
        PART_PRICE: this.data.selectForm.selectPrize,
        PART_DESCRIBE: this.data.selectForm.selectDes
      }
      // console.log('表单数据',data)
      addAccessory(data).then(res => {
        if (res.Success){
          Toast.success( '添加备件成功');
          
        }
        that.setData({
          show: false
        });
        app.event.emit('partRefresh', '')
      }).catch(err => {

      })

    } else {
      this.setData({
        show: false,
        num: 0
      });
    }
  },
  // 点击选择备件数量
  setNum: function(res) {
    // res为选择的备件
    let data = res.detail
    this.data.selectForm.selectPrize = data.PART_PRICE
    // this.data.selectForm.selectPrize = data.PART_PRICE
    this.setData({
      currentAccessory: data,
      selectForm: this.data.selectForm,
      show: true
    })
  },
  // 添加新的配件
  addAccessory: function() {
    wx.navigateTo({
      url: '../addAccessory/addAccessory',
    })
  },
  // 同步输入框数据
  syncVal(e) {
    // console.log(e.detail)
    let key = e.target.id;
    this.data.selectForm[key] = e.detail
  },

  syncNumVal(event) {
    console.log(event.detail);
  }
})