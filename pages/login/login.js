// pages/login/login.js
const app = getApp()
import {
  wxLogin,
  accountLogin,
  getIdentity
} from '../../utils/api.js'
import Dialog from '../vant/dialog/dialog';
import Utils from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      userName: {
        value: 'mainhosp',
        valid: true
      },
      userPass: {
        value: '123456',
        valid: true
      }
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
    if (!form.userName.value || !form.userPass.value) {
      wx.showToast({
        title: '请完善登录信息',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    // 并且通过验证
    if (!form.userName.valid || !form.userPass.valid) {
      return false
    }

    this.setData({
      loading: true
    })
    let data = {
      username: this.data.form.userName.value,
      password: this.data.form.userPass.value
    }
    // 登录api
    accountLogin(data).then(res => {
      console.log('promise成功', res);
      app.globalData.userAccount = this.data.form.userName.value //username保存下
      if (res.Success) {
        // 有效用户
        // 身份判定
        if (res.Type == "1") {
          app.globalData.role = 'inspector' //巡检人员
        } else if (res.Type == "2") {
          app.globalData.role = 'maintain' //维修人员
        } else {
          Dialog.alert({
            message: '身份错误，请联系管理员',
            overlay: true,
          }).then(() => {
            this.setData({
              loading: false
            })
          });
          return false
        }
        // 快速绑定微信账户
        this.bouding(() => {
          // 登录跳转
          wx.reLaunch({
            url: '/pages/index/index',
          })
        })
      } else {
        Dialog.alert({
          message: res.Msg,
          overlay: true,
        }).then(() => {
          this.setData({
            loading: false
          });
        });
      }
    }).catch(err => {
      // 登录失败
      this.setData({
        loading: false
      });
      console.log('err', err);
    })
  },
  // 快速绑定微信账号opnenid
  bouding(callback) {
    let that = this
    wx.login({
      success: res => {
        // app.globalData.code = res.code; 
        console.log('code ' + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId;储存在全局
        let data = {
          username: that.data.form.userName.value,
          code: res.code
        }
        getIdentity(data).then(res => {
          console.log(111, res.Data);
          wx.setStorageSync('openId', res.Data.openid)
          wx.setStorageSync('sessionKey', res.Data.session_key);
          this.setData({
            loading: false
          });
          if (callback) callback()
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
          console.log('已授权');
          app.globalUserInfo(() => {
            that.ifAutoLogin()
          })
        } else {
          console.log('未授权');
          if (that.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 唤醒用户的手动授权按钮
            that.setData({
              show: true
            });
          } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            app.globalUserInfo(() => {
              wx.showToast({
                title: '获取成功',
                duration: 1000
              })
              that.ifAutoLogin()
            })
          }
        }
      }
    })
  },
  // 获取用户信息点击事件回调
  bindGetUserInfo(e) {
    console.log('用户基本信息', e);
    app.globalData.wxUserInfo = e.detail
    wx.showToast({
      title: '获取成功',
      duration: 1000
    })
    this.setData({
      show: false
    });
    this.ifAutoLogin()
  },
  // 判断是否自动登录
  ifAutoLogin() {
    // 判断是否是自动登录
    let autoLogin = wx.getStorageSync('autoLogin') || false;
    if (autoLogin) {
      console.log('自动开启')
      try {
        let openId = wx.getStorageSync('openId')
        let sessionKey = wx.getStorageSync('sessionKey');
        // debugger
        if (openId && sessionKey) {
          // Do something with return value;
          console.log(openId + '------' + sessionKey)
          // 调用自动登录接口
          this.autoLoin(openId)
        }
      } catch (e) {
        // Do something when catch error
        wx.showToast({
          title: '自动登录失败,请手动登录',
          // icon: 'success',
          duration: 1000
        })
      }
    } else {
      console.log('自动未开启')
    }
  },
  // 自动登录
  autoLoin(openId) {
    let that = this
   
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log('有效');
        let data = {
          openId: openId
        }
        wx.showLoading({
          title: '自动登录中',
        })

        wxLogin(data).then(res => {
          console.log('自动登录', res);
          wx.hideLoading()
          if (res.Success) {
            // 身份判定
            if (res.Type == "1") {
              app.globalData.role = 'inspector' //巡检人员
            } else if (res.Type == "2") {
              app.globalData.role = 'maintain' //维修人员
            } else {
              Dialog.alert({
                message: '身份错误，请联系管理员',
                overlay: true,
              }).then(() => {
                that.setData({
                  loading: false
                })
              });
              return false
            };
            wx.reLaunch({
              url: '/pages/index/index',
            }) 
          }else{
            Dialog.alert({
              message: res.Msg,
              overlay: true,
            }).then(() => {
              this.setData({
                loading: false
              });
            });
          }
        
        }).catch(err => {
          wx.hideLoading()
          wx.showToast({
            title: '自动登录失效,请手动登录',
            icon: 'none',
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
  onLoad: function(options) {
    // 记录全局的页面高度
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#scrollBox').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {

      let H = res[0].height;
      // console.log(H);
      app.globalData.winHeight = H
    })
    // wx.login({
    //   success: res => {
    //     console.log('测试code', res.code)
    //   }
    // })
    // return

    // 先获取用户微信信息
    this.getUserMsg()


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