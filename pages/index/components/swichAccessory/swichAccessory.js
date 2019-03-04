// pages/index/components/swichFacility/swichFacility.js
import Dialog from '../../../vant/dialog/dialog';
import {
  matingAccessory
} from '../../../../utils/api.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    "addGlobalClass": true
  },
  properties: {
    winheight: {
      type: Number,
      value: 0
    },
    // 报修编码
    repairCode: {
      type: String,
      value: '',
      observer: function (val, old) {
        this.setData({
          repairCode:val
        })
        // this.loadData()
      }
    },
    // 设备编码
    facilityId: {
      type: String,
      value: '',
      observer: function (val, old) {
        this.setData({
          facilityId: val
        })
        this.loadData()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    list: [],
    repairCode:''
  },
  attached() {
    let H = app.globalData.winHeight;
    // console.log(H - 44 - 44 + 'px')
    this.setData({
      height: H - 44 - 44 + 'px'
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 删除备件
    delectHandler() {
      Dialog.confirm({
        title: '删除备件',
        message: '您确认要删除该备件？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    // 加载备件列表
    loadData(){
      let that = this
      let data = {
        pageIndex: 1,
        pageSize:100,
        REPAIRS_CODE: this.data.repairCode
      }

      // 判断是否条件筛选

      this.setData({
        loading: true
      })
     
      // api请求
      matingAccessory(data).then(res => {       
        // 后面还有数据
        that.data.list = res.Data.ListInfo;
        console.log('已选的备件', res.Data.ListInfo.length)
        that.setData({
          list:that.data.list,
          loading: false
        })
      }).catch(err => {

      })
    },
    // 跳转
    link(){
      wx.navigateTo({
        url: '/pages/accessory/subpages/accessoryList/accessoryList?repairCode=' + this.data.repairCode + '&facilityId=' + this.data.facilityId
      })
    }
    
  }
})