// pages/mine.js
import Dialog from '../vant/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:'小大寒',
      gender:0,
      level:'维修部' 
    },
    checked: wx.getStorageSync('autoLogin') || false,
    loading:false
  },
  // 修改自动登录
  onChange(event){
    // console.log(event.detail)
    this.setData({ checked: event.detail });
    wx.setStorageSync('autoLogin', event.detail)
  },
  // 登出用户
  loginOut(){
    let that = this
    Dialog.confirm({
      title: '确认操作',
      message: '您确定退出登录？'
    }).then(() => {
      try {
        that.setData({
          loading:true
        })
        wx.clearStorageSync();
        setTimeout(()=>{
          that.setData({
            loading: false
          })
          wx.reLaunch({
            url: '/pages/login/login'
          })
        },2000)
        
      } catch (e) {
        // Do something when catch error
      }
    }).catch(() => {
      // on cancel
    });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('autoLogin'))
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