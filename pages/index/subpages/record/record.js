// pages/index/subpages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        status: 2,
        statusText: '已完成',
        title: '10吨冲边液压机',
        repairId: '2013124D',
        facilityId: '12448-12',
        createTime: '2017-12-24',
        thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550988485&di=27f1230df6be487ddd403d4e4e2422e9&imgtype=jpg&er=1&src=http%3A%2F%2Fsem.g3img.com%2Fsite%2F50021089%2Fimage%2Fc2_20190110133636_29352.jpg'
      }
    ] ,
    loading:false,
    nomore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loading: true
    })
    console.log(this.data.loading)
    let arr = [...this.data.list] ; 
    arr = arr.concat(this.data.list)
    setTimeout(() => {
      this.setData({
        list: arr,
        loading: false,
        nomore:false
      })
      console.log(this.data.loading)
    },2000)
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})