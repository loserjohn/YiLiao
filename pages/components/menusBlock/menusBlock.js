// pages/components/menusBlock/menusBlock.js
import Utils from '../../../utils/util.js'
import {
  getFacilityDetail
} from '../../../utils/api.js'

Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
      observer: function(val, old) {
        // console.log(this.data.menusList[val])
        this.setData({
          current: this.data.menusList[val]
        })
      }
    },
    block:{
      type: Boolean,
      value: false,
    },
    badge:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menusList: {
      "repair": {
        name: 'repair',
        icon: 'icon-dici',
        title: '快速报修',
        handle: 'repairs',
        handle: () => {
          wx.navigateTo({
            url: '/pages/facility/subpages/repairs/repairs'
          })
        },
      },
      "waitingRepair": {
        name: 'waitingRepair',
        icon: 'icon-ceshishenqing',
        title: '待维修',
        handle: () => {
          wx.navigateTo({
            url: '/pages/index/subpages/orders/orders?active=0'
          })
        }
      },
      "inRepair": {
        name: 'inRepair',
        icon: 'icon-renjijiaohu',
        title: '维修中',
        handle: () => {
          wx.navigateTo({
            url: '/pages/index/subpages/orders/orders?active=1'
          })
        }
      },
      "repairHistory": {
        name: 'repairHistory',
        icon: 'icon-changjingguanli',
        title: '历史记录',
        handle: () => {
          wx.navigateTo({
            url: '/pages/index/subpages/record/record'
          })
        }
      },
      "accessoryList": {
        name: 'accessoryList',
        icon: 'icon-gaojing',
        title: '备件列表',
        handle: 'accessoryList',
        handle: () => {
          wx.navigateTo({
            url: '/pages/accessory/subpages/accessoryList/accessoryList'
          })
        },
      },
      "facilityList": {
        name: 'facilityList',
        icon: 'icon-jichuguanli',
        title: '设备列表',
        handle: () => {
          wx.navigateTo({
            url: '/pages/facility/subpages/facilityList/facilityList'
          })
        },
      },
      "accessoryCheck": {
        name: 'accessoryCheck',
        icon: 'icon-gaojing',
        title: '备件查询',
        handle: () => {
          wx.navigateTo({
            url: '/pages/accessory/subpages/accessoryList/accessoryList'
          })
        },
      },
      "facilityCheck": {
        name: 'facilityCheck',
        icon: 'icon-jichuguanli',
        title: '设备查询',
        handle: () => {
          wx.navigateTo({
            url: '/pages/facility/subpages/facilityList/facilityList'
          })
        },
      },
      "scanCode": {
        name: 'scanCode',
        icon: 'icon-saoma',
        title: '扫码识别',
        handle: () => {
          Utils.scanCode().then(code => {
            wx.showLoading({
              title: '查找设备中',
            })
            console.log(0, code)
            // 判断是否存在该设备    
            getFacilityDetail({ DEVICE_CODE: code }).then(res => {
              if (res.Success) {
                wx.hideLoading()
                wx.navigateTo({
                  url: `/pages/facility/subpages/facilityDetail/facilityDetail?facilityId=${code}`,
                })
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '没有找到该设备的相关信息!!',
                  icon:'none'
                })
                // Toast.fail('没有找到该设备的相关信息');
              }
            }).catch(err => {
              wx.hideLoading();
            })  
          }).catch(err => {
            return false
          })
        },
      },
      "updatedPass": {
        name: 'updatedPass',
        icon: 'icon-hezuohuobanmiyueguanli',
        title: '修改密码',
        handle: () => {
          wx.navigateTo({
            url: '/pages/mine/subpages/updatedPass/updatedPass'
          })
        },
      },
      "set": {
        name: 'set',
        icon: 'icon-icon_zhanghao',
        title: '个人信息',
        handle: () => {
          wx.navigateTo({
            url: '/pages/mine/subpages/set/set'
          })
        },
      },
      "about": {
        name: 'about',
        icon: 'icon-fuwudiqiu',
        title: '关于我们',
        handle: () => {
          wx.navigateTo({
            url: '/pages/mine/subpages/about/about'
          })
        },
      },
      "chooseAccessory": {
        name: 'chooseAccessory',
        icon: 'icon-gaojing',
        title: '选择备件',
        handle: () => {
          wx.navigateTo({
            url: '/pages/accessory/subpages/accessoryList/accessoryList?action=choose'
          })
        },
      }, 
    },
    current: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    link() {
      // console.log(1)
      this.data.current.handle()
    }
  }
})