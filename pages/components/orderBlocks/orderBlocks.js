// pages/components/orderBlocks/orderBlocks.js
const app = getApp()
import Dialog from '../../vant/dialog/dialog';
import Toast from '../../vant/toast/toast';
import {
  getRepairList,
  doneRepairsTest
} from '../../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:Number,
      value:0
    },
    refreshCode:{
      type: Number,
      value: 0,
      observer:function(val,old){
        
        if (val!==old) {
          this.setData({
            pageIndex: 1,
            list: [],
            loading: false,
            rest: true,
          })
          this.loadData()
        }  
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageIndex: 1,
    list: [],
    loading: false,
    rest: true,
    height: '',
    role: app.globalData.role
  },
  /**
     * 生命周期函数--监听页面加载
     */
  attached() {
    let H = app.globalData.winHeight;
    // console.log(app.globalData.role)
    this.setData({
      height: H - 44 -44+ 'px',
      role: app.globalData.role
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    
    loadData(callback) {
      let that = this
      let data = {
        pageIndex: this.data.pageIndex,
        pageSize: 10,
        REPAIRS_STATUS: this.properties.type,
        UNIT_CODE: app.globalData.userInfo.USER_UNIT
      }
      let rest = that.data.rest;
      if (!rest) { return }

      this.setData({
        loading: true
      })
      // console.log(data)
      // api
      getRepairList(data).then(res => {
          
        // 后面还有数据
        that.data.list = that.data.list.concat(res.Data.ListInfo);
        // console.log(res.Data.Total)
        // 后面y有没有数据了
        if (that.data.list.length >= res.Data.Total) {
          that.setData({
            list: that.data.list,
            loading: false,
            rest: false
          })
        } else {
          that.setData({
            list: that.data.list,
            loading: false,
            rest:true
          })
        }
        // console.log(that.data.index, that.data.list.length);
        if (callback) callback(res.Data.Total)
      }).catch(err => {
        console.log(1111)
      })

    },
    // 加载更多
    loadMore() {
      if (this.data.loading || !this.data.rest) {
        return
      }
      this.data.pageIndex += 1;

      this.loadData()
    },
    // 完成测试
    doneRepairsTest(e){
      let that = this;   
      let key = e.target.id;
      Dialog.confirm({
        title: '确认操作',
        message: '确认该设备已完成维修并且正常运行'
      }).then((res) => {
        // api操作
        doneRepairsTest({ REPAIRS_CODE: key }).then(res => {
          console.log(res)
          if (res.Success) {
              Toast.success('维修完成');
            }
          }).catch(err => {
            Toast.fail(res.Msg ? res.Msg : '操作失败')
          })
      
      }).catch(() => {
        // on cancel
      });
    }
    
  }
})
