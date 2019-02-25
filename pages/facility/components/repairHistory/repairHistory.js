// pages/facility/components/repairHistory/repairHistory.js
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
    active: 0,
    steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ],
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
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
