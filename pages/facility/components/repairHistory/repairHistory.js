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
      let data = {
        pageIndex:1,
        pageSize:100,
        DEVICE_CODE: val 
      }
      getHistoryList(data).then(res => {
        console.log(res)
        that.setData({
          steps: res.Data.ListInfo
        })
      }).catch(err => { })
    } 
  }
})
