// pages/components/facilityMsg/facilityMsg.js
Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    prePic:[
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3329288042,2952547843&fm=15&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3329288042,2952547843&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2398114811,2331663261&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=930564983,1390301969&fm=15&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1526559757,3333528363&fm=15&gp=0.jpg'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toEdite:function(){
      wx.navigateTo({
        url: '/pages/facility/subpages/facilityEdite/facilityEdite',
      })
    }
  }
})
