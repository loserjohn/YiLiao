// pages/components/accessoryItem/accessoryItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: { // 属性名
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {}, // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 是否显示删除按钮
    delectabled:{
      type: Boolean,
      value:true
    },
    // 是否显示配用数量
    dosagabled:{
      type: Boolean,
      value: true
    },
    // 是否可以选择
    choosabled:{
      type: Boolean,
      value: false
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选用备件
    choose:function(){
      this.triggerEvent('choose', this.properties.item)
      // this.properties.choosabledHandler('135435135')
    },
    // 删除备件
    delect:function(){
      this.triggerEvent('delect', this.properties.item)
    }
  }
})
