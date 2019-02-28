// pages/facility/components/repairHistory/repairHistory.js
import {
  getHistoryList
} from '../../../../utils/api.js'

Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    facilityId: {
      type: String,
      value: '',
      observer: function (val, old) {
        // console.log(val);
        this.loadData(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    steps: []  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData(val) {
      let that = this
      getHistoryList({ DEVICE_CODE: val }).then(res => {
  
        that.setData({
          steps: res.Data.ListInfo,
          // prePic: res.Data.DEVICE_IMGLIST.split(',')
        })
      }).catch(err => { })
    } 
  }
})
