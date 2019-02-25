// pages/components/preImgGallery/preImgGallery.js
import Notify from '../../vant/notify/notify';
import Dialog from '../../vant/dialog/dialog'; 
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
        //  return 
          this.setData({
            prePicArr: val,
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
      value: 5,
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
    // 上传图片
    upload(){
      let count = this.properties.num - this.data.prePicArr.length;
      // console.log(this.data.prePicArr)
      if(count<0){
        count=0
        Notify({
          text: '超过最大数量,请适当删除',
          duration: 1000,
          selector: '#van-notify',
        });
        return 
      }
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res.tempFilePaths)
          const tempFilePaths = res.tempFilePaths;
        }
      })
    },
    // 删除指定图片
    delect(e){
      let key = e.currentTarget.dataset.key;
      // console.log(key);
      Dialog.confirm({
        title: '确认删除',
        message: '您确定要删除该图片？'
      }).then(() => {
        // on confirm
        this.data.prePicArr.splice(key,1);
        // debugger
        this.setData({
          prePicArr: this.data.prePicArr
        })

      }).catch(() => {
        // on cancel
      });
    },
    // 预览图片
    preview(e){
      // console.log(e.currentTarget.dataset.src);
      let url = e.currentTarget.dataset.src;
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: this.data.prePicArr // 需要预览的图片http链接列表
      })
    }
  }
})
