// pages/index/components/complete/complete.js

import Utils from '../../../../utils/util.js'
import Notify from '../../../vant/notify/notify';
import Toast from '../../../vant/toast/toast';


const app = getApp()

import {
  completeRepair,
  getWarrantyInfo,
  getKeepList,
  getFacilityDetail
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
        console.log(val)
        this.initData(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    completeTime: Utils.formatTime(new Date()).split(' ')[0], //完成时间
    switchAccessory: '0', //是否维保
    // 维保共公司信息
    extra: {
      name: '',
      menber: '',
      phone: '',
      repairType: ''
    },
    facilityId: '',  //设备id
    facilityDetail:'',//设备详情
    repairDetailData: '',  //保修订单详情
    textArea1: false, //维修内容显示切换
    textArea2: false, //维修类型显示切换
    // 表单内容
    form: {
      repairTime: {
        val: '',
        unit: '天'
      },
      closeTime: {
        val: 1,
        unit: '天'
      },
      emergency: {
        val: 2,
        text: '中级'
      },
      ifClosing: '1',
      descript: '',
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
    showCompany: false,
    columns: []
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
      // 预加载默认的维保公司信息
      getFacilityDetail({
        DEVICE_CODE: val.DEVICE_CODE
      }).then(res => {
        console.log('####',res)
        if (res.Success) {
          that.setData({
            facilityDetail: res.Data
          })
        }
      }).catch(err => {

      })

      // 预加载本医院的可选择维保公司
      // console.log(app.globalData.userInfo)
      getKeepList({
        UNIT_CODE: app.globalData.userInfo.USER_UNIT
      }).then(res => {
        console.log(res)
        if (res.Success) {
          that.setData({
            columns2: res.Data.ListInfo
          })
        }
      }).catch(err => {

      })
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
      // console.log(e.target.id, e.detail)
      let key = e.target.id
      if (key == 'descript') {
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
    // 是否维保  若是 则自动填写表单
    onSwitch(e) {
      let that = this
      let val = parseInt(e.detail);
      // 1是维保 0是不维保
      switch (val) {
        case 1:
          // 维保
          that.data.extra.name = that.data.facilityDetail.KEEP_COMPANY;
          that.data.extra.menber = that.data.facilityDetail.KEEP_NAME;
          that.data.extra.phone = that.data.facilityDetail.KEEP_PHONE;
          that.data.extra.repairType = that.data.facilityDetail.WARRANTY_TYPE;
          that.setData({
            extra: that.data.extra,
            switchAccessory: e.detail
          })
          break;
        case 0:
          // 不维保
          that.data.extra.name = '';
          that.data.extra.menber = '';
          that.data.extra.phone = '';
          that.data.extra.repairType = '';
          that.setData({
            extra: that.data.extra,
            switchAccessory: e.detail
          })
          break;
        default:
      }

    },
    // 选择时间
    // bindDateChange(e) {
    //   // console.log(e.detail)
    //   let time = e.detail.value;
    //   this.data.extra.repairTime = time
    //   this.setData({
    //     extra: this.data.extra
    //   })
    // },
    // 完成报修
    submitComplete() {
      let that = this;
      let form = this.data.form

      if (!this.data.form.descript) {
        Notify({
          text: '请输入维修内容',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }
      if (!this.data.form.repairTime.val) {
        Notify({
          text: '请输入维修耗时',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }

      if (this.data.form.ifClosing == 2 && !this.data.form.closeTime.val) {
        Notify({
          text: '请输入停机时间',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
      }
      // 若委托第三方
      if (!this.data.extra.name) {
        Notify({
          text: '请选择维保机构',
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
        MAINTAIN_TYPE: this.data.extra.repairType,
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
          app.event.emit('indexRefresh', '');
          setTimeout(() => {
            wx.navigateBack({})
          }, 1000)
        } 
        that.setData({
          loading: false
        })
      }).catch(err => {
       
        that.setData({
          loading: false
        })
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
    // 显示维保公司
    showCompany(e) {
      this.setData({
        showCompany: !this.data.showCompany
      })
    },
    // 选择维保公司
    selectCompany(e) {
      console.log(e.detail.value.Value);
      let that = this
      let val = e.detail.value.Value;
      // 自动保定维保信息
      Toast.loading({
        mask: true,
        message: '自动匹配中...'
      });

      getWarrantyInfo({
        KEEP_CODE: val
      }).then(res => {
        Toast.clear();
        if (res.Success) {
          res = res.Data;
          that.data.extra.name = res.KEEP_COMPANY;
          that.data.extra.menber = res.KEEP_NAME;
          that.data.extra.phone = res.KEEP_PHONE;
          that.data.extra.repairType = res.WARRANTY_TYPE;
          that.setData({
            extra: that.data.extra,
            showCompany: false
          })
        }
      }).catch(err => {
        Toast.clear();
      })

    }
  }
})