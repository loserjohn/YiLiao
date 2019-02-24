// pages/components/scan/scan.js

import Utils from '../../../utils/util.js'
Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    background: {
      type: String,
      value: 'transparent'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handler() {
      Utils.scanCode().then(code => {
        if (code) {
          this.triggerEvent('scanCode', code)
        } else {

        }
      }).catch(err => {
        wx.showToast({
          title: '无效的二维码',
          icon: 'none',
          duration: 1000
        })
      })
    }
  }
})