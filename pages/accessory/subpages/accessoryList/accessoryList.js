// pages/accessory/subpages/accessory/accessoryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    show:false,
    typeAction:'',
    height:'300px',
    currentType:2,
    list: [
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{ key: 0, text: '二极管' }, { key: 1, text: '小零件' }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '圆周离心机底片（o）',
        facilityId: '12448-12',
        num: 1,
        model: '52sd',
        type: [{ key: 4, text: '机械配件' }, { key: 2, text: '大零件' }],
        thumb: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=331643808,2083727353&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{ key: 0, text: '二极管' }, { key: 1, text: '小零件' }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '圆周离心机底片（o）',
        facilityId: '12448-12',
        num: 1,
        model: '52sd',
        type: [{ key: 4, text: '机械配件' }, { key: 2, text: '大零件' }],
        thumb: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=331643808,2083727353&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{ key: 0, text: '二极管' }, { key: 1, text: '小零件' }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '圆周离心机底片（o）',
        facilityId: '12448-12',
        num: 1,
        model: '52sd',
        type: [{ key: 4, text: '机械配件' }, { key: 2, text: '大零件' }],
        thumb: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=331643808,2083727353&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{ key: 0, text: '二极管' }, { key: 1, text: '小零件' }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '圆周离心机底片（o）',
        facilityId: '12448-12',
        num: 1,
        model: '52sd',
        type: [{ key: 4, text: '机械配件' }, { key: 2, text: '大零件' }],
        thumb: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=331643808,2083727353&fm=26&gp=0.jpg'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    let action = options.action ? options.action:false;
    this.setData({
      typeAction:action
    })
    let  that = this
    const query = wx.createSelectorQuery()
    query.select('#scrollBox').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
     
      let H = res[0].height;
      that.setData({
        height: H -44 + 'px'
      })
      // console.log(H + 'px')
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

  },
  // 关闭弹窗
  onClose(event) {
    if (event.detail === 'confirm') {
      // 异步关闭弹窗
      // console.log(event)
      console.log(this.data.num)
      setTimeout(() => {
        this.setData({
          show: false,
          num: 0
        });
        // api操作，对设备添加备件
        wx.navigateBack({
          delta:1
        })
      }, 1000);
    } else {
      this.setData({
        show: false,
        num:0
      });
    }
  },
  // 点击选择备件数量
  setNum:function(res){
    console.log(res)
    this.setData({
      show:true
    })
  },
  // 添加新的配件
  addAccessory:function(){
    wx.navigateTo({
      url: '../addAccessory/addAccessory',
    })
  },
  // 同步选择的数量
  syncVal(event){
    console.log(event.detail);
    this.setData({
      num: event.detail
    });
  }
})