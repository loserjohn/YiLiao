// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceName:'未知设备',
    connectedDeviceId:'',
    services:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log(0,res)
          /* 获取本机的蓝牙状态 */
          setTimeout(() => {
            that.getBluetoothAdapterState()
          }, 1000)
        },
        fail: function(err) {
          // 初始化失败
          console.log(-1, err)
        }
      })
    } else {
      console.log('没有蓝野模块')
    }
  },
  // 检测本机蓝牙是否可用
  getBluetoothAdapterState() {
    var that = this;
    that.toastTitle = '检查蓝牙状态'
    wx.getBluetoothAdapterState({
      success: function(res) {
        console.log(1,res)
        that.startBluetoothDevicesDiscovery()
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  // #3. 开始搜索蓝牙设备：
  startBluetoothDevicesDiscovery() {
    var that = this;
    setTimeout(() => {
      wx.startBluetoothDevicesDiscovery({
        success: function(res) {
          console.log(2,res)
          /* 获取蓝牙设备列表 */
          that.getBluetoothDevices()
        },
        fail(res) {}
      })
    }, 1000)
  },
  // 获取设备
  getBluetoothDevices() {
    var that = this;
    setTimeout(() => {
      wx.getBluetoothDevices({
        // services: [],
        // allowDuplicatesKey: false,
        // interval: 0,
        success: function(res) {
          console.log(4,res)
          if (res.devices.length > 0) {
            if (JSON.stringify(res.devices).indexOf(that.data.deviceName) !== -1) {
              for (let i = 0; i < res.devices.length; i++) {
                if (that.data.deviceName === res.devices[i].name) {
                  /* 根据指定的蓝牙设备名称匹配到deviceId */
                  that.deviceId = that.devices[i].deviceId;
                  setTimeout(() => {
                    that.connectTO();
                  }, 2000);
                };
              };
            } else {}
          } else {}
        },
        fail(res) {
          console.log(res, '获取蓝牙设备列表失败=====')
        }
      })
    }, 2000)
  },
  // #5.连接蓝牙
  connectTO() {
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        console.log(5, res)
        that.data.connectedDeviceId = deviceId;
        /* 4.获取连接设备的service服务 */
        that.getBLEDeviceServices();
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res, '停止搜索')
          },
          fail(res) {
          }
        })
      },
      fail: function (res) {
      }
    })
  },
  // #6. 获取蓝牙设备的service服务,获取的serviceId有多个要试着连接最终确定哪个是稳定版本的service 获取服务完后获取设备特征值
  getBLEDeviceServices() {
    setTimeout(() => {
      wx.getBLEDeviceServices({
        deviceId: that.data.connectedDeviceId,
        success: function (res) {
          that.data.services = res.services
          console.log(6, res)
          /* 获取连接设备的所有特征值 */
          // that.getBLEDeviceCharacteristics()
        },
        fail: (res) => {
        }
      })
    }, 2000)
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