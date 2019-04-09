// pages/accessory/subpages/addRepair/addRepair.js
import Toast from '../../../vant/toast/toast';
import Notify from '../../../vant/notify/notify';
import {
  getFacilityDetail,
  submitRepairs,
  getFacilityList,
  getMaintainList
} from '../../../../utils/api.js'
import Utils from '../../../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    columns: [{
      text: '低级',
      val: 0
    }, {
      text: '中级',
        val: 1
    }, {
      text: '高级',
        val: 2
    }],
    clientWidth: '',
    form: {
      facilityId:'',
      emergency: {
        val: 2,
        text: '中级'
      },
      // ifClosing: '1',
      describe: '',
      maintain:''
    },
    canEdited: app.globalData.role == 'inspector' ? true : false,
    repairPic: [], //报修问题图片
    date: '',
    facility: '', //当前匹配的设备信息
    facilityList:[],
    createTime: '',

    currentUnit: 'repairTime',
    loading:false,
    facilityNum:'',
    show2:false, //搜索结果列表显示
    show3:false,//维修人员显示
    maintainList:[], //维修员列表
    textArea:false
  },
  // 二维码扫码设备
  scanCode(res) {
    let that = this
    // Toast.loading('加载中')
    Utils.scanCode().then(code => {
      // Toast.clear();
      if (code) {
        that.data.form.facilityId = code;
        that.setData({
          form: that.data.form
        })
        // 自动匹配设备信息
        that.match()

      } else {
        wx.showToast({
          title: '无效的二维码',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(err => {
      Toast.clear();
    })
  },
  // 匹配设备信息
  match() {
    let id = this.data.form.facilityId;
    let that = this
    if (!id) {
      Notify({
        text: '请输入设备编号，或者使用快速扫码识别设备',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    Toast.loading({
      message: '匹配中'
    });
    getFacilityDetail({
      DEVICE_CODE: id
    }).then(res => {
      Toast.clear();
      if (res.Success) {
        console.log(res.Data)
        that.setData({
          facility: res.Data,
          facilityNum: res.Data.DEVICE_NUM
        })
      } else {
        Notify({
          text: '没有匹配到相关设备',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        that.setData({
          facility: ''
        })
      }
    }).catch(err => {})
  },
  // 设备编号搜索详情
  search(){
    //SL00000001
    let facilityNum = this.data.facilityNum;
    let that = this
    if (!facilityNum) {
      Notify({
        text: '请输入设备编号，或者使用快速扫码匹配设备',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    Toast.loading({
      message: '匹配中'
    });
    // debugger
    getFacilityList({
      DEVICE_NUM: facilityNum,
      UNIT_CODE: app.globalData.userInfo.USER_UNIT
    }).then(res => {
      Toast.clear();
      if (res.Success && res.Data.ListInfo.length>0) {
        that.setData({
          facilityList: res.Data.ListInfo,
          show2:true
        })
        console.log(res.Data)
      } else {
        Notify({
          text: '没有匹配到相关设备',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        that.setData({
          facility: ''
        })
      }
    }).catch(err => { })
  },
  // 同步输入信息
  syncVal(e) {
    let key = e.target.id
    let val = e.detail;
    switch (key) {
      case 'repairTime':
        this.data.form.repairTime.val = val
        break;
      case 'closeTime':
        this.data.form.closeTime.val = val
        break;
      case 'facilityNum':
        this.data.facilityNum = val
        this.setData({
          facility:''
        })
        break;
      case 'btn':
        this.setData({
          textArea: true
        })
        break;
      case 'describe':
        // console.log(e)
        this.data.form.describe = e.detail.value
        this.setData({
          form:this.data.form,
          textArea: false
        })
        break;
      default:
        this.data.form[key] = val
        break;
    }
    
  },
  
  onClose2(){
    this.setData({
      show2: false
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  // 选择维修员
  selectMaintain(e){
    let data = e.currentTarget.dataset.item;
    this.data.form.maintain = data
    this.setData({
      show3: false,
      form: this.data.form,
    })
  },
  // 选择某一条结果
  selectFacility(e){
    console.log(e.currentTarget.dataset.item);
    let data = e.currentTarget.dataset.item;
    this.data.form.facilityId = data.DEVICE_CODE
    this.setData({
      facility:data,
      show2:false,
      form: this.data.form,
    })
  },

  // 显示紧急程度选项
  handler: function() {
    this.setData({
      show: true
    })
  },
  // 显示维修员选项
  handler3: function () {
    this.setData({
      show3: true
    })
  },
  // 选择紧急程度
  onConfirm: function(e) {
    console.log(e.detail.value)
    this.data.form.emergency = e.detail.value
    this.setData({
      show: false,
      form: this.data.form
    })
  },
  // 取消紧急程度选择
  onCancel: function() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        // 生成保修时间
        let time = Utils.formatTime(new Date()).split(' ')[0]
        // debugger
        // 同步个人信息
        let u = app.globalData.userInfo;
        // debugger
        that.setData({
          clientWidth: clientWidth,
          createTime: time,
          userInfo: u
        });
      }
    });

    // 获取可指派的维修员
   
    getMaintainList({ UNIT_CODE: app.globalData.userInfo.USER_UNIT}).then(res=>{
      if(res.Success){
        console.log(res.Data.ListInfo)
        that.setData({
          maintainList: res.Data.ListInfo
        })
      }
    }).catch(err=>{})
  },
  // 上传故障图片回调
  notifyToSave(res) {
    // console.log(res.detail);
    this.setData({
      repairPic: res.detail.arr
    })
  },
  // 提交报修操作
  submit() {
    let form = this.data.form
    if (!form.facilityId) {
      Notify({
        text: '请输入设备编号，或者使用快速扫码识别设备',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: 'red'
      });
      return
    }
    // if (!form.maintain.Value) {
    //   Notify({
    //     text: '请务必选择维修员',
    //     duration: 1000,
    //     selector: '#van-notify',
    //     backgroundColor: 'red'
    //   });
    //   return
    // }

    if (!this.data.repairPic.length || this.data.repairPic.length<=0) {   
        Notify({
          text: '请务必上传故障图片',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: 'red'
        });
        return
    }
    // 验证通过
    let that = this;
    let data = {
      DEVICE_CODE: form.facilityId,
      REPAIRS_DESCRIBE: form.describe,
      REPAIRS_IMGLIST: this.data.repairPic.join(','),
      URGENT_TYPE: form.emergency.val,
      MAKE_USER: form.maintain.Value
    }
  
    console.log(data)
    this.setData({ loading:true})
    // 提交表单
    submitRepairs(data).then(res=>{
      this.setData({ loading: false })
        if(res.Success){
          wx.showToast({
              title:'报修成功'
          })
          setTimeout(()=>{
            wx.redirectTo({
              url: '/pages/index/subpages/orders/orders?active=0'
            })
          },1000)
         
        }else{
          wx.showToast({
            title: res.Msg ? res.Msg:'报修失败',
            icon:'none'
          })
        }

    }).catch(err=>{
      this.setData({ loading: false })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  onClickButton: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})