// pages/mine/subpages/updatedPass/updatedPass.js
const app = getApp()
import Notify from '../../../vant/notify/notify';
import Toast from '../../../vant/toast/toast';
import {
  updatedPass
} from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    oldPass:'',
    newPass:'',
    reNewPass:''
  },
  // 提交修改  
  submit(){
    let that = this
    if (!this.data.oldPass){
      Notify({
        text: '请输入旧密码',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return  
    }
    if (!this.data.newPass) {
      Notify({
        text: '请输入新密码',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (!this.data.reNewPass) {
      Notify({
        text: '请输入核对新密码',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    if (this.data.reNewPass != this.data.newPass) {
      Notify({
        text: '两次密码不一致，请重新输入',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    } 
    let data={
      username: this.data.userName,
      password: this.data.oldPass,
      newpassword: this.data.newPass,
      newpass: this.data.reNewPass
    }
    that.setData({
      loading: true
    })
    // api
    updatedPass(data).then(res=>{
      that.setData({
        loading: false
      })
      if(res.Success){
        // Toast.success('');
        Toast.loading('修改成功，请稍后')
        wx.clearStorageSync();
        setTimeout(()=>{         
          wx.reLaunch({
            url: '/pages/login/login'
          }) 
        },1000)
      }else{
        Toast.fail(res.Msg ? res.Msg:'修该失败');
      }
    }).catch(err=>{

    })

  },
  // 同步表单
  syncVal(e){
    // console.log(e)
    let key = e.target.id
    this.data[key] = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: app.globalData.userInfo.USER_NAME
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