// pages/components/preImgGallery/preImgGallery.js
Component({
  options: {
    "addGlobalClass": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
     prePic:{
       type:Object,
       value: [],
       observer: function (val,old){
         let l = val.length;
         let s = parseInt(l / 4) * 4;
        //  console.log(s)
        //  return s
          this.setData({
            max:s
          }) 
       }
     },
    clientWidth:{
      type: Number,
      value: 0,
      observer: function (val, old) {
        // let l = val.length;
        let width = parseInt(val / this.properties.num) ;

        this.setData({
          width: width
        })
      }
    },
    num: {
      type: Number,
      value: 4,
    },
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    max:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
