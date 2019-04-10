// pages/facility/components/relevant/relevant.js
import {
  getLinkPartList
} from '../../../../utils/api.js'
Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    canchoose:{
      type:Boolean,
      value:false
    },
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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择数量
    setNum(e){
      
      let data = e.target.dataset.item
      // debugger
      this.triggerEvent('choose', data)
    },
    // 加载数据
    loadData(val) {
      let that = this
      let data = {
        pageIndex: 1,
        pageSize: 100,
        DEVICE_CODE: val
      }
      getLinkPartList(data).then(res => {      
        that.setData({
          list: res.Data.ListInfo,
          // prePic: res.Data.DEVICE_IMGLIST.split(',')
        })
        // debugger
      }).catch(err => { })
    } 
  } 
})
