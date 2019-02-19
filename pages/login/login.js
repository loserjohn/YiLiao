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
    show: false,
    loading: false,
    username: '',
    password: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 登录判断
  login() {
    console.log('登录');
    this.setData({
      loading: true
    })
    // 登录操作
    let data = {
      useraccount: this.data.username,
      userpassword: this.data.password,
    }
    accountLogin(data).then(res => {
      console.log('promiser成功', res);
      // 保存全局的用户身份
      app.globalData.userInfo = res.userInfo
      // 快速绑定微信账户
      this.bouding()
    }).catch(err => {
      console.log('err', err);
    })

  },
  // 快速绑定微信账号
  bouding() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        getIdentity(res.code).then(res => {
          console.log(111,res);
          app.globalData.sessionKey = res.sessionKey
          wx.setStorageSync('openId', res.openId)
          wx.setStorageSync('sessionKey', res.sessionKey);
          this.setData({
            loading: false
          });
          wx.reLaunch({
            url: '/pages/index/index', 
          })
        })
      }
    })
  },
  bindGetUserInfo(e) {
    // console.log(e.detail);
    // 授权后解密获取电话号码
    this.decodeNumber(e.detail.encryptedData);
    this.setData({
      show: false
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    //判断授权状态
    wx.getSetting({
      success(res) {
        // console.log('授权状态', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success(res) {
          //     console.log('用户基本信息', res)
          //   }
          // })
          that.decodeNumber()
        } else {
          console.log('未授权');
          this.setData({
            show: true
          });
        }
      }
    })
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