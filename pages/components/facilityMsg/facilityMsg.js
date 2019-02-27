// pages/components/facilityMsg/facilityMsg.js
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
    facilityId:{
      type:String,
      value:'',
      observer:function(val,old){
        // console.log(val);
        this.loadData(val)     
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    facility:{},
    prePic:[
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3329288042,2952547843&fm=15&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3329288042,2952547843&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2398114811,2331663261&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=930564983,1390301969&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1526559757,3333528363&fm=15&gp=0.jpg'
    ],
    clientWidth:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 保存编辑页面
    toEdite:function(){
      console.log(1)
      // wx.navigateTo({
      //   url: '/pages/facility/subpages/facilityEdite/facilityEdite',
      // })
    },
    // 加载数据
    loadData(val){
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          let clientHeight = res.windowHeight;
          let clientWidth = res.windowWidth;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          that.setData({
            clientWidth: clientWidth
          });
          // console.log(clientHeight)
        }
      });

      getFacilityDetail({ DEVICE_CODE: val }).then(res => {
        // debugger/
        that.setData({
          facility: res.Data,
          // prePic: res.Data.DEVICE_IMGLIST.split(',')
        })
      }).catch(err => { })  
    }
  }
})
