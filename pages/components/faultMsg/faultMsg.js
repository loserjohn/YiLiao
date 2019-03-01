// pages/components/faultMsg/faultMsg.js
import {
  getRepairDetail
} from '../../../utils/api.js'
Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    repairCode:{
      type:String,
      value:'',
      observer:function(val,old){
        this.loadData()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    repairDetail:'',
    prePic:[],
    facilityId:'',
    clientWidth:''
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData(){
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

      let code = this.properties.repairCode;
      let data = {
        REPAIRS_CODE: code,
      }
      getRepairDetail(data).then(res=>{
        if(res.Success){
          console.log(-1,res.Data)
          that.setData({
            repairDetail: res.Data,
            facilityId: res.Data.DEVICE_CODE,
            prePic: res.Data.REPAIRS_IMGLIST ? res.Data.REPAIRS_IMGLIST.split(','):[]
          })
          console.log(0, res.Data.REPAIRS_IMGLIST.split(','))
        }
      }).catch(err=>{
        
      })
    },
    // 查看设备详情
    linkTo(){
      console.log(1111,this.data.facilityId)
      wx.navigateTo({
        url: '/pages/facility/subpages/facilityDetail/facilityDetail?facilityId=' + this.data.facilityId
      })
    }
  }
})
