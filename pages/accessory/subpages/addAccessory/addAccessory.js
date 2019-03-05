// pages/accessory/subpages/addAccessory/addAccessory.js
import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
const app = getApp()
import {
  addNewAccessory
} from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    props:'',  //上级页面传进来的基本值
    form:{},
    loading:false
  },
  
  // 同步值
  syncVal(e){
    let key = e.target.id;
    let val = e.detail;
    this.data.form[key] = val;
    this.setData({
      form: this.data.form
    })
  },
  onChange(event){
    // console.log(event.detail);
    let val = event.detail;
    this.data.form.accessoryCreate = val
    this.setData({ form: this.data.form })

  },
  // 添加新的备件
  submit(){
    let that = this;
    let form = this.data.form
        //  accessoryCreate
    if (!form.accessoryName){
      Notify({
        text: '请输入设备名称',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!form.accessoryNo) {
      Notify({
        text: '请输入设备序列号',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!form.accessoryType) {
      Notify({
        text: '请输入设备型号',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!form.accessoryNum) {
      Notify({
        text: '请输入设备数量',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!form.accessoryPrize) {
      Notify({
        text: '请输入设备价格',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!form.accessoryDes) {
      Notify({
        text: '请输入设备更换描述',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    let data = {
      REPAIRS_CODE: this.data.props.repairCode,
      DEVICE_CODE: this.data.props.facilityId,
      PART_NAME:this.data.form.accessoryName,
      PART_NO: this.data.form.accessoryNo,
      PART_TYPE: this.data.form.accessoryType,
      PART_NUM: this.data.form.accessoryNum,
      PART_PRICE: this.data.form.accessoryPrize,
      PART_DESCRIBE: this.data.form.accessoryDes,
      IS_Create: this.data.form.accessoryCreate?1:0   
    }
    // console.log(data)
    this.setData({
      loading:true
    })
    addNewAccessory(data).then(res=>{
      this.setData({
        loading: false
      })
      if(res.Success){
        Toast.success('添加成功')  
        setTimeout(()=>{
          app.event.emit('partRefresh', '')
          wx.navigateBack({
            delta: 2 
          })
        },1000)
      }
    }).catch(res=>{
      this.setData({
        loading: false
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      props: options  
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