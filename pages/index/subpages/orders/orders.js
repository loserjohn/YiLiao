// pages/index/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    list: {
      repair: [
          {
            status: 0,
            statusText: '待维修',
            title: '10吨冲边液压机',
            repairId: '2013124D',
            facilityId: '12448-12',
            createTime: '2017-12-24',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550988485&di=27f1230df6be487ddd403d4e4e2422e9&imgtype=jpg&er=1&src=http%3A%2F%2Fsem.g3img.com%2Fsite%2F50021089%2Fimage%2Fc2_20190110133636_29352.jpg'
          }
        ],
      inRepair: [
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb:'http://img3.imgtn.bdimg.com/it/u=4154363465,2639807834&fm=11&gp=0.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550393767182&di=024c9402c9bc9ba7069db7f077219dd3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fpv%2Finfo%2Fimages%2F201005%2F201005140844078549.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'http://img3.imgtn.bdimg.com/it/u=4154363465,2639807834&fm=11&gp=0.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550393767182&di=024c9402c9bc9ba7069db7f077219dd3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fpv%2Finfo%2Fimages%2F201005%2F201005140844078549.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'http://img3.imgtn.bdimg.com/it/u=4154363465,2639807834&fm=11&gp=0.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550393767182&di=024c9402c9bc9ba7069db7f077219dd3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fpv%2Finfo%2Fimages%2F201005%2F201005140844078549.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'http://img3.imgtn.bdimg.com/it/u=4154363465,2639807834&fm=11&gp=0.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550393767182&di=024c9402c9bc9ba7069db7f077219dd3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fpv%2Finfo%2Fimages%2F201005%2F201005140844078549.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'http://img3.imgtn.bdimg.com/it/u=4154363465,2639807834&fm=11&gp=0.jpg'
        },
        {
          status: 1,
          statusText: '维修中',
          title: '80吨冲边液压机（加强版）',
          repairId: '2015785426359Y',
          facilityId: '63522548-12',
          createTime: '2017-12-23',
          thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550393767182&di=024c9402c9bc9ba7069db7f077219dd3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fpv%2Finfo%2Fimages%2F201005%2F201005140844078549.jpg'
        }
      ],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let key = parseInt(options.active) ;
    if (key == 0){
      return
    }else{
      // console.log(1111)
      this.setData({ active: 1 });
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})