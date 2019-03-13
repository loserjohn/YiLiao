// pages/components/faultMsg/faultMsg.js
import {
  getRepairDetail,
  beginRepair
} from '../../../utils/api.js'
const app = getApp()

Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    canShow: {
      type: Boolean,
      value: false
    },
    repairDetail: {
      type: Object,
      value: '',
      observer: function(val, old) { 
        this.initData(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    repairDetail: '',
    prePic: [],
    facilityId: '',
    repairCode:'',
    clientWidth: '',
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化数据
    initData(val) {
      let that = this
      if (!val || !val.DEVICE_CODE) { return }
      wx.getSystemInfo({
        success: function (res) {
          let clientHeight = res.windowHeight;
          let clientWidth = res.windowWidth;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          that.setData({          
              repairDetailData: val,
              facilityId: val.DEVICE_CODE,
              repairCode: val.REPAIRS_CODE,
              prePic: val.REPAIRS_IMGLIST ? val.REPAIRS_IMGLIST.split(',') : [],
              clientWidth: clientWidth
          });
        }
      });
      
    },
    // 查看信息
    linkTo() {
      let that = this
      wx.navigateTo({
        url: `/pages/facility/subpages/facilityDetail/facilityDetail?facilityId=${that.data.facilityId}`,
      })
    },
    // 报修响应
    toRepair() {
      let that = this;
      let data = {
        REPAIRS_CODE: this.data.repairCode
      }
      this.setData({
        loading: true
      })
      beginRepair(data).then(res => {
        if (res.Success) {
          wx.showToast({
            title: '响应成功',
          })
          setTimeout(() => {
            app.event.emit('refresh', '')
            wx.navigateBack({});
            that.setData({
              loading: false
            });
          }, 1000)

        }
      }).catch(err => {

      })
    },
    // 查看维修报告
    reportDetail(){
      wx.navigateTo({
        url: '/pages/facility/subpages/report/report?repairCode=' + this.data.repairCode,
      })
    }
  }
})