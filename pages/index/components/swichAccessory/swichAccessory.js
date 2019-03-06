// pages/index/components/swichFacility/swichFacility.js
import Dialog from '../../../vant/dialog/dialog';
import Toast from '../../../vant/toast/toast';
import {
  matingAccessory,
  delectAccessory
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
    height: 0,
    list: [],
    repairCode:'',
    facilityId:'',
    repairDetailData:''
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
    initData(val){
      let that = this
      if (!val || !val.DEVICE_CODE) { return }
      that.setData({
        repairDetailData: val,
        facilityId: val.DEVICE_CODE,
        repairCode: val.REPAIRS_CODE
      });
      // 加载数据
      this.loadData()
    },
    // 删除备件
    delectHandler(item) {
     
      let that = this
      console.log(item)
      debugger
      // let accessory = item.detail
      let accessory = item.target.dataset.item
      Dialog.confirm({
        title: '删除备件',
        message: '您确认要删除该备件？'
      }).then(() => {
        // api操作
        let data = {
          CHANGER_CODE: accessory.CHANGER_CODE
        }
        delectAccessory(data).then(res=>{
          if(res.Success){
            Toast.success('删除成功');
            that.loadData()
          }else{
            Toast.fail(res.Msg ? res.Msg:'操作失败')  
          }
        }).catch(err=>{
          
        })

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
      // debugger
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
        url: `/pages/accessory/subpages/accessoryList/accessoryList?repairCode=${this.data.repairCode}`
      })
    }
    
  }
})