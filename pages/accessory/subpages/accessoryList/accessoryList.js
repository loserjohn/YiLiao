// pages/accessory/subpages/accessory/accessoryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    show:false,
    typeAction:'',
    typeList: [{
      key: 0,
      text: '全部'
    }, {
      key: 1,
      text: '二极sda管'
    }, {
      key: 2,
      text: '二a第三方极管'
    }, {
      key: 3,
      text: '二极第三方管'
    }, {
      key: 4,
      text: '二士大夫极管'
    }, {
      key: 5,
      text: '二十大发极管'
    }, {
      key: 6,
      text: '二电饭锅极管'
    }, {
      key: 7,
      text: '二极管'
    }, {
      key: 8,
      text: '二极管'
    }],
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
      setTimeout(() => {
        this.setData({
          show: false
        });
        wx.navigateBack({
          delta:1
        })
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  },
  // 点击选择备件数量
  setNum:function(res){
    // console.log(22)
    this.setData({
      show:true
    })
  },
  // 添加新的配件
  addAccessory:function(){
    wx.navigateTo({
      url: '../addAccessory/addAccessory',
    })
  }
})