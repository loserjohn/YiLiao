// pages/facility/components/relevant/relevant.js
import {
  getAccessoryList
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
    list: [
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{ key: 0, text: '二极管' }, { key: 1, text: '小零件' }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择数量
    setNum(res){
      console.log(res)
      this.triggerEvent('choose', '备件id135435135')
    },
    // 加载数据
    loadData(val) {
      let that = this
  
      getAccessoryList({ DEVICE_CODE: val }).then(res => {
        // debugger
        that.setData({
          list: res.Data.ListInfo,
          // prePic: res.Data.DEVICE_IMGLIST.split(',')
        })
      }).catch(err => { })
    } 
  } 
})
