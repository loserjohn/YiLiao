// pages/login/login.js
const app = getApp()
import {
  wxLogin,
  accountLogin,
  getIdentity
} from '../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      userName: {
        value: '',
        valid: true
      },
      userPass: {
        value: '',
        valid: true
      },
    },
    show: false,
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 登录判断
  login() {
    // console.log(this.data.form);
    let form = this.data.form
    // 不能为空
    // if (!form.userName.value || !form.userPass.value){
    //   wx.showToast({
    //     title: '请完善登录信息',
    //     icon:'none',
    //     duration: 1000
    //   })
    //   return false
    // }
    // 并且通过验证
    if (!form.userName.valid || !form.userPass.valid) {
      return false
    }

    this.setData({
      loading: true
    })
    // 登录操作
    let data = {
      useraccount: this.data.form.userName.value,
      userpassword: this.data.form.userPass.value,
    }
    this.bouding()
    // accountLogin(data).then(res => {
    //   console.log('promiser成功', res);
    //   // 保存全局的用户身份
    //   app.globalData.userInfo = res.userInfo
    //   // 快速绑定微信账户
    //   this.bouding()
    // }).catch(err => {
    //   console.log('err', err);
    // })

  },
  // 快速绑定微信账号
  bouding() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        // getIdentity(res.code).then(res => {
        //   console.log(111, res);
        //   app.globalData.sessionKey = res.sessionKey
        //   wx.setStorageSync('openId', res.openId)
        //   wx.setStorageSync('sessionKey', res.sessionKey);
        //   this.setData({
        //     loading: false
        //   });
        //   wx.reLaunch({
        //     url: '/pages/index/index',
        //   })
        // })
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })
  },
  // 表单验证
  valid(e) {   
    let key = e.target.id;
    let val = e.detail.value;
  
    switch (key) {
      case 'userName':
        this.data.form.userName.value = val;
        if (!Utils.checkPhone(val)) {
          // 格式错误       
          this.data.form.userName.valid = false;
        } else {
          this.data.form.userName.valid = true;
        }
        this.setData({
          form: Utils.copyObj(this.data.form)
        })
        break;
      case 'userPass':
        this.data.form.userPass.value = val;
        // console.log(this.data.form.userPass.value)
        if (!Utils.checkPass(val)) {
          // 格式错误       
          this.data.form.userPass.valid = false;
        } else {
          this.data.form.userPass.valid = true;
        }
        this.setData({
          form: Utils.copyObj(this.data.form)
        })
        break;
    }   
  },
  // 清除重写
  clear(e){
    let key = e.target.id;
    switch (key) {
      case 'userName':
        this.data.form.userName.value = '';
        this.data.form.userName.valid = true;
        this.setData({
          form: Utils.copyObj(this.data.form)
        })
        break;
      case 'userPass':
        this.data.form.userPass.value = '';
        this.data.form.userPass.valid = true;
        this.setData({
          form: Utils.copyObj(this.data.form)
        })
        break;
    }  
  },
  bindGetUserInfo(e) {
    // console.log(e.detail);
    // 授权后解密获取电话号码
    this.decodeNumber(e.detail.encryptedData);
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let that = this
    // //判断授权状态
    // wx.getSetting({
    //   success(res) {
    //     // console.log('授权状态', res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       // wx.getUserInfo({
    //       //   success(res) {
    //       //     console.log('用户基本信息', res)
    //       //   }
    //       // })
    //       that.decodeNumber()
    //     } else {
    //       console.log('未授权');
    //       this.setData({
    //         show: true
    //       });
    //     }
    //   }
    // })
  },
  // 解密电话
  decodeNumber: function() {

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

  }
})