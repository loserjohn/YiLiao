// pages/components/facilityMsg/facilityMsg.js
import Dialog from '../../vant/dialog/dialog';
import {
  getFacilityDetail,
  editedFacility
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
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3329288042,2952547843&fm=15&gp=0.jpg'
    ],
    clientWidth:'',
    canEdited: app.globalData.role == 'inspector'?true:false,
    // canEdited: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 手动保存
    toSave(){
      Dialog.confirm({
        title: '提醒',
        message: '您确定保存修改？'
      }).then(() => {
        // on confirm
        this.toEdite()
      }).catch(() => {
        // on cancel
      });
    },
    // 保存编辑页面
    toEdite(){
      // console.log(this.properties.facilityId)
      if (!this.properties.facilityId)return;
         let arr = this.data.prePic;
        let data = {
          DEVICE_CODE: this.properties.facilityId,
          DEVICE_IMGLIST: arr.join(',')
        }
        // console.log(data)
        editedFacility(data).then(res=>{
          // console.log(res)
          if(res.Success){
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(()=>{
              wx.navigateBack()
            },500)
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 2000
            }) 
          }
        })
  
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
        // debugger
        // console.log(res.Data.DEVICE_IMGLIST.split(','));
        let arr = []
        if (res.Data.DEVICE_IMGLIST){
          arr = res.Data.DEVICE_IMGLIST.split(',')
        }
        that.setData({
          facility: res.Data,
          prePic: arr
        })
      }).catch(err => { })  
    },
    // 提醒用户保存
    notifyToSave(res){
      // console.log(res.detail);
      let that = this
      let notify = res.detail.notify
      let arr = res.detail.arr;
      this.data.prePic = arr
      if (notify){
        // 提示保存
        Dialog.confirm({
          title: '提醒',
          message: '当前信息发生修改，请立即保存'
        }).then(() => {
          // on confirm
          // debugger
          that.toEdite(arr)
        }).catch(() => {
          // on cancel
        });
      }
    }
  }
})
