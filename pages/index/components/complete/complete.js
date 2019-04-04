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
      observer: function(val, old) {
        this.initData(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    completeTime: Utils.formatTime(new Date()).split(' ')[0],
    switchAccessory: '0',
    extra: {
      repairTime: Utils.formatTime(new Date()).split(' ')[0],
      name: '',
      menber: '',
      phone: ''
    },
    repairDetailData: '',
    textArea1: false, //维修内容显示切换
    textArea2: false, //维修类型显示切换
    form: {
      facilityId: '',
      repairTime: {
        val: '',
        unit: '天'
      },
      closeTime: {
        val: '',
        unit: '天'
      },
      emergency: {
        val: 2,
        text: '中级'
      },
      ifClosing: '1',
      descript: '',
      repairType: ''
    },
    timeShow: false,
    currentUnit: 'repairTime', //当前的时间单位的匹配表单项
    actions: [{
      name: '分'
    }, {
      name: '时'
    }, {
      name: '天'
    }, {
      name: '月'
    }, {
      name: '年'
    }],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initData(val) {
      let that = this
      if (!val || !val.DEVICE_CODE) {
        return
      }
      that.setData({
        repairDetailData: val,
        facilityId: val.DEVICE_CODE,
        repairCode: val.REPAIRS_CODE,
      });
    },
    // 显示原本的文本域
    showTextArea(e) {
      if (e.target.id == 'btn1') {
        this.setData({
          textArea1: true
        })
      } else if (e.target.id == 'btn2') {
        this.setData({
          textArea2: true
        })
      } else {
        this.data.form.descript = e.detail.value
        this.setData({
          textArea2: false,
          textArea1: false,
          form: this.data.form
        })
      }
    },
    syncVal(e) {
      console.log(e.target.id, e.detail)
      let key = e.target.id
      if (key == 'descript' || key == 'repairType') {
        this.data.form[key] = e.detail
        this.setData({
          form: this.data.form
        })
      } else if (key == 'repairTime' || key == 'closeTime') {
        this.data.form[key].val = e.detail
        // this.setData({
        //   form: this.data.form
        // })   
      } else {
        this.data.extra[key] = e.detail
      }
    },
    // 是否停机
    ifClosed(e) {
      this.data.form.ifClosing = e.detail
      this.setData({
        form: this.data.form
      })
    },
    // 是否委托第三方
    onSwitch(e) {
      this.setData({
        switchAccessory: e.detail
      })
    },
    // 选择时间
    bindDateChange(e) {
      // console.log(e.detail)
      let time = e.detail.value;
      this.data.extra.repairTime = time
      this.setData({
        extra: this.data.extra
      })
    },
    // 完成报修
    submitComplete() {
      let that = this;
      let form = this.data.form

      if (!this.data.form.descript || !this.data.form.repairType ) {
        Notify({
          text: '请输入维修内容和维修类型',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }
      // 若委托第三方
      if (!this.data.extra.name) {
        Notify({
          text: '请输入机构名称',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }
      if (!this.data.extra.menber) {
        Notify({
          text: '请输入机构联系人',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }
      if (!this.data.extra.phone) {
        Notify({
          text: '请输入机构联系方式',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }



      let data = {
        REPAIRS_CODE: this.data.repairCode,
        IS_THIRDPARTY: this.data.switchAccessory,
        MAKE_DESCRIBE: this.data.form.descript,
        MAINTAIN_TYPE: this.data.form.repairType,
        IS_CLOSING: this.data.form.ifClosing,
        THIRDPARTY_NAME: this.data.extra.name,
        MAINTAIN_USER: this.data.extra.menber,
        MAKE_PHONE: this.data.extra.phone,
        MAKE_MEND_DATE: form.repairTime.val + form.repairTime.unit
      }

      if (this.data.form.ifClosing == 2) {
        data.CLOSING_TIME = form.closeTime.val + form.closeTime.unit
      }

      this.setData({
        loading: true
      })
      console.log(data)
      completeRepair(data).then(res => {
        // console.log(res)
        if (res.Success) {
          Toast.success('维修完成')
          app.event.emit('refresh', '');
          setTimeout(() => {
            wx.navigateBack({})
          }, 1000)
        } else {
          Toast.fail(res.Msg ? res.Msg : '操作失败')
        }
        that.setData({
          loading: false
        })
      }).catch(err => {

      })
    },
    // 关闭文本域
    textareaClose() {
      this.setData({
        textArea2: false,
        textArea1: false
      })
    },
    // 切换时间单位选择
    switchUnit(e) {
      // console.log(e.target.id)
      let current = e.target.id
      this.setData({
        timeShow: true,
        currentUnit: current
      })
    },
    // 选择时间单位后关闭时间弹窗
    onSelectTime(e) {
      // console.log(e.detail.name, this.data.currentUnit);
      let unit = e.detail.name
      let name = this.data.currentUnit
      this.data.form[name].unit = unit
      this.setData({
        form: this.data.form,
        timeShow: false
      })
    },
    // 关闭时间弹框
    onCloseTime(e) {
      this.setData({
        timeShow: false
      })
    },
  }
})