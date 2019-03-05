// pages/index/components/complete/complete.js

import Utils from '../../../../utils/util.js'
import Notify from '../../../vant/notify/notify';
import Toast from '../../../vant/toast/toast';
const app = getApp()

import {
  completeRepair
} from '../../../../utils/api.js'

Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  
  properties: {

    repairDetail: {
      type: Object,
      value: '',
      observer: function (val, old) {
        this.initData(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    completeTime: Utils.formatTime(new Date()).split(' ')[0],
    switchAccessory:0,
    extra:{
      repairTime: Utils.formatTime(new Date()).split(' ')[0],
      name:'',
      menber:'',
      phone:''
    },
    descript:'',
    repairDetailData:''
  },
  attached(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    initData(val){
      let that = this
      if (!val || !val.DEVICE_CODE) { return } 
      that.setData({
        repairDetailData: val,
        facilityId: val.DEVICE_CODE,
        repairCode: val.REPAIRS_CODE,
      });
    },
    syncVal(e){
      this.data.descript = e.detail
      this.setData({
        descript: e.detail
      }) 
    },
    syncVal2(e) {
      // console.log(e.target.id, e.detail)
      let key = e.target.id
      this.data.extra[key]= e.detail
    },
    // 是否委托第三方
    onSwitch(e){
      // console.log(e.detail);
      this.setData({
        switchAccessory:e.detail
      })
    },
    // 选择时间
    bindDateChange(e){
      // console.log(e.detail)
      let time =  e.detail.value;
      this.data.extra.repairTime = time
      this.setData({
        extra: this.data.extra
      })
    },
    // 完成报修
    submitComplete(){
      let that = this;
      // 若委托第三方
      if (this.data.switchAccessory == 1) {
        if (!this.data.extra.name) {
          Notify({
            text: '请输入第三方机构名称',
            duration: 1000,
            selector: '#van-notify',
            backgroundColor: 'red'
          });
          return
        }
        if (!this.data.extra.menber) {
          Notify({
            text: '请输入第三方机构联系人',
            duration: 1000,
            selector: '#van-notify',
            backgroundColor: 'red'
          });
          return
        }
        if (!this.data.extra.phone) {
          Notify({
            text: '请输入第三方机构联系方式',
            duration: 1000,
            selector: '#van-notify',
            backgroundColor: 'red'
          });
          return
        } 
      }

     
      let data = {
        REPAIRS_CODE: this.data.repairCode,
        IS_THIRDPARTY: this.data.switchAccessory,
        MAKE_DESCRIBE: this.data.descript
      }

      if (this.data.switchAccessory==1){
        data.THIRDPARTY_NAME = this.data.extra.name;
        data.MAINTAIN_USER = this.data.extra.menber;
        data.MAKE_PHONE = this.data.extra.phone
      } 
      this.setData({
        loading: true
      })
      completeRepair(data).then(res => {
        // console.log(res)
        if (res.Success){
          Toast.success('维修完成')
          app.event.emit('refresh', '');
          setTimeout(()=>{
            wx.navigateBack({}) 
          },1000)        
        }else{
          Toast.fail(res.Msg ? res.Msg:'操作失败')
        }
        that.setData({
          loading: false
        })
      }).catch(err => {

      })
    }
  }
})
