// pages/index/components/swichFacility/swichFacility.js
import Dialog from '../../../vant/dialog/dialog';
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    list: [{
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },

      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '发光二极管（225）',
        facilityId: '12448-12',
        model: '2152s',
        type: [{
          key: 0,
          text: '二极管'
        }, {
          key: 1,
          text: '小零件'
        }],
        num: 3,
        thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4154563837,520368770&fm=26&gp=0.jpg'
      },
      {
        status: 0,
        title: '圆周离心机底片（o）',
        facilityId: '12448-12',
        num: 1,
        model: '52sd',
        type: [{
          key: 4,
          text: '机械配件'
        }, {
          key: 2,
          text: '大零件'
        }],
        thumb: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=331643808,2083727353&fm=26&gp=0.jpg'
      }
    ]
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
    }
  }
})