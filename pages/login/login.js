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
    // 快速绑定微信账户
    this.bouding(() => {
      let data = {
        useraccount: this.data.form.userName.value,
        userpassword: this.data.form.userPass.value,
        code: app.globalData.code
      }
      // 登录api
      accountLogin(data).then(res => {
        console.log('promise成功');
        app.globalData.role = res.role;
        app.globalData.sessionKey = res.sessionKey
        wx.setStorageSync('openId', res.openId)
        wx.setStorageSync('sessionKey', res.sessionKey);
        this.setData({
          loading: false
        });
        // 微信获取公共信息
        this.getUserMsg()

      }).catch(err => {
        // 登录失败
        this.setData({
          loading: false
        });
        console.log('err', err);
      })
    })
  },
  // 快速绑定微信账号
  bouding(callback) {
    wx.login({
      success: res => {
        app.globalData.code = res.code; 
        // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd463568812190ae4&secret=35a59467027fe0bdcced80a4994d3b9d&js_code=' + res.code + '&grant_type=authorization_code';
        // wx.request({
        //   url: l,
        //   data: {},
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        //   // header: {}, // 设置请求的 header  
        //   success: function (res) {
            
        //     console.log('结果', res);
        //     // wx.setStorageSync('user', obj);//存储openid  
        //   }
        // });
        console.log('code '+res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        // getIdentity(res.code).then(res => {
        //   // console.log(111, res);   
        // })
        if (callback) callback()
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
  clear(e) {
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
  // 获取微信公共的用户信息
  getUserMsg() {
    let that = this
    //判断授权状态
    wx.getSetting({
      success(res) {
       
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log('授权');
              app.globalData.userInfo = res;
              wx.showToast({
                title: '欢迎登录',
                duration: 1000
              })
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        } else {
          console.log('未授权');
          // 唤醒用户的手动授权按钮
          that.setData({
            show: true
          });
        }
      }
    })
  },
  bindGetUserInfo(e) {
    // 授权后解密获取电话号码
    console.log('用户基本信息', e);
    app.globalData.userInfo = e.detail
    this.setData({
      show: false
    });
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
 
  autoLoin(openId, sessionKey) {
    let that = this
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log('有效');
        app.globalData.sessionKey = sessionKey;
        app.globalData.openId = openId;
        let data = {
          sessionKey: sessionKey,
          openId: openId
        }
        wxLogin(data).then(res => {
          console.log('自动登录', res.role);
          app.globalData.role = res.role;
          // that.globalData.userInfo = { role: 'maintain'}
          // that.globalData.userInfo = {
          //   role: 'inspector'
          // }
          that.getUserMsg()
          // wx.reLaunch({
          //   url: '/pages/index/index',
          // })
        }).catch(err => {
          wx.showToast({
            title: '自动登录失效,请手动登录',
            icon:'none',
            duration: 1000
          })
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log('无效');
        wx.showToast({
          title: '登录状态过期，请手动登录',
          duration: 1000
        })
      }
    })
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // 记录全局的页面高度
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#scrollBox').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {

      let H = res[0].height;
      // console.log(H);
      app.globalData.winHeight = H
    })

    // 判断是否是自动登录
    let autoLogin = wx.getStorageSync('autoLogin') || false;
    if (autoLogin) {
      console.log('自动开启')
      try {
        let openId = wx.getStorageSync('openId')
        let sessionKey = wx.getStorageSync('sessionKey');
        if (openId && sessionKey) {
          // Do something with return value;
          console.log(openId +'------'+ sessionKey)
          // 调用自动登录接口
          this.autoLoin(openId, sessionKey)
        }
      } catch (e) {
        // Do something when catch error
        wx.showToast({
          title: '自动登录失败,请手动登录',
          // icon: 'success',
          duration: 1000
        })
      }
    }else{
      console.log('自动未开启')
    }
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