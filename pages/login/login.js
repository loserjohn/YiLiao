// pages/login/login.js
const app = getApp()
import {
  wxLogin,
  accountLogin,
  getSystemInfo
} from '../../utils/api.js'
import Dialog from '../vant/dialog/dialog';
import Utils from '../../utils/util.js'
import { ROLE_INSPECTOR, ROLE_MAINTAIN } from '../../utils/permision.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      userName: {
        // value: '',
        // value: 'fhosp',
        value: 'SL002',
        valid: true
      },
      userPass: {
        value: '888888',
        // value: '',
        // value: '',
        valid: true
      }
    },
    show: false,
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    systemInfo:{}
  },
  // 登录判断
  login(e) {
    // console.log('表单id',e.detail);
    // const formid = e.detail.formId
    // return 
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
   
    // 先获取code
    app.getCode(code => {
      let data = {
        username: this.data.form.userName.value,
        password: this.data.form.userPass.value,
        code: code,
        IsDebug: true
      }
      // console.log(data)
      // 登录api
      accountLogin(data).then(res => {
        // console.log(data)
        app.globalData.userAccount = this.data.form.userName.value //username保存下
        wx.setStorageSync('userAccount', this.data.form.userName.value);
        if (res.Success) {
          console.log('登录成功', res)
          // 有效用户
          // 身份判定
          if (res.Data.USER_TYPE == "1") {
            app.globalData.role = ROLE_INSPECTOR //巡检人员
            wx.setStorageSync('openId', res.Data.openid);
            wx.setStorageSync('sessionKey', res.Data.session_key);
          } else if (res.Data.USER_TYPE == "2") {
            app.globalData.role = ROLE_MAINTAIN //维修人员
            wx.setStorageSync('openId', res.Data.openid);
            wx.setStorageSync('sessionKey', res.Data.session_key);
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
          wx.reLaunch({
            url: '/pages/index/index',
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
        // console.log('err', err);
      })
    })


  },
  // 表单验证
  valid(e) {
    let key = e.target.id;
    let val = e.detail.value;

    switch (key) {
      case 'userName':
        this.data.form.userName.value = val;
        this.data.form.userName.valid = true;
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
  getUserMsg(callback) {
    let that = this
    //判断授权状态
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log('已授权');
          app.globalUserInfo(callback)
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
              if (callback) callback()
              wx.showToast({
                title: '获取成功',
                duration: 1000
              })
            })
          }
        }
      }
    })
  },
  // 获取用户信息点击事件回调
  bindGetUserInfo(e) {
    console.log('用户微信基本信息', e);
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
    let autoLogin = wx.getStorageSync('openId') || false;
    if (autoLogin) {
      console.log('自动开启')
      try {
        let openId = wx.getStorageSync('openId')
        // 自动登录
        this.autoLoin(openId)
      } catch (e) {
        // 用户正常手动登录
        return false
      }
    } else {
      console.log('自动未开启')
    }
  },
  // 自动登录
  autoLoin(openId) {
    let that = this
    // 先获取code
    app.getCode(code => {
      wx.checkSession({
        success() {
          // session_key 未过期，并且在本生命周期一直有效
          console.log('有效');
          let data = {
            // openId: openId,
            code:code
          }
          // console.log('自动登录',data)
          wx.showLoading({
            title: '自动登录中',
          })
          // console.log(data)
          wxLogin(data).then(res => {
            console.log('自动登录', res);
            wx.hideLoading()
            if (res.Success) {
              // 身份判定
              if (res.Data.USER_TYPE == "1") {
                app.globalData.role = ROLE_INSPECTOR //巡检人员
                wx.setStorageSync('openId', res.Data.openid);
                wx.setStorageSync('sessionKey', res.Data.session_key);
              } else if (res.Data.USER_TYPE == "2") {
                app.globalData.role = ROLE_MAINTAIN //维修人员
                wx.setStorageSync('openId', res.Data.openid);
                wx.setStorageSync('sessionKey', res.Data.session_key);
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
            } else {
              Dialog.alert({
                message: res.Msg ? res.Msg:'登陆失败',
                overlay: true,
              }).then(() => {
                that.setData({
                  loading: false
                });
              });
              wx.clearStorageSync();
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
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 记录全局的页面高度
    let that = this
     wx.getSystemInfo({
      success(res) {
        app.globalData.winHeight = res.windowHeight - res.statusBarHeight
      }
    })
    getSystemInfo({}).then(res => {
      // console.log(0,res)
      app.globalData.systemInfo = res.Data;
      that.setData({
        systemInfo: res.Data.SystemInfo[0]
      })
    })

    // 先获取用户微信信息
    this.getUserMsg(()=>{
      this.ifAutoLogin()
    })
    
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