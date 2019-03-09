// pages/components/orderBlocks/orderBlocks.js
const app = getApp()
import {
  getRepairList
} from '../../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 10,
    list: [],
    loading: false,
    rest: true,
    height: '',
  },
  /**
     * 生命周期函数--监听页面加载
     */
  attached() {
    let H = app.globalData.winHeight;
    this.setData({
      height: H - 44 -44+ 'px',
      role: app.globalData.role,
      userInfo: app.globalData.userInfo
    })
    this.loadData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData(callback) {
      let role = this.data.role
      let that = this
      let data = {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        REPAIRS_STATUS: this.properties.type,
        // UNIT_CODE: this.data.userInfo.USER_UNIT
      }

      // if (role == "maintain") {
      //   // 维修人员
      //   data.MAKE_USER = this.data.userInfo.USER_NAME
      //   // data.REPAIRS_STATUS = 3
      // } else if (role == "inspector") {
      //   // 巡检员
      //   data.REPAIRS_USER = this.data.userInfo.USER_NAME
      // }
      // debugger
      let rest = that.data.rest;
      if (!rest) { return }

      this.setData({
        loading: true
      })
      console.log(data)
      // api
      getRepairList(data).then(res => {
          
        // 后面还有数据
        that.data.list = that.data.list.concat(res.Data.ListInfo);
        console.log(that.data.list)
        // 后面y有没有数据了
        if (that.data.list.length >= res.Data.Total) {
          that.setData({
            list: this.data.list,
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
      this.data.index += 1;

      this.loadData()
    }
    
  }
})
