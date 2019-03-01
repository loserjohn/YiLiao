// pages/components/preImgGallery/preImgGallery.js
import Notify from '../../vant/notify/notify';
import Dialog from '../../vant/dialog/dialog'; 
import {
  baseURL
} from '../../../utils/api.js'

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
        //  console.log(val)
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
        let width = parseInt(val / 3) ;

        this.setData({
          width: width
        })
      }
    },
    num: {
      type: Number,
      value: 5,
    },
    canEdited:{
      type:Boolean,
      value:true
    },
    facilityId:{
      type: String,
      value: ''
    },
    title:{
      type:String,
      value:'设备图片'
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    prePicArr:[], //预制的图片
    max:0,
    inUpload:[] //正在上传的图片数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择上传图片
    upload(){
      let that = this
      let count = this.properties.num - this.data.prePicArr.length;
      // let count = 10
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
          // console.log(res.tempFilePaths)
          const tempFilePaths = res.tempFilePaths;  //目标数组

          let inUploadArr = new Array(tempFilePaths.length).fill(0);
          that.setData({
            inUpload:inUploadArr
          })
          // 上传api操作
          let data = {
            tempFilePaths: tempFilePaths
          }
          that.uploadImags(data)
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
        this.notify(false)
      }).catch(() => {
        // on cancel
      });
    },
    // 预览图片
    preview(e){
      // console.log(e.currentTarget.dataset.src);
      let url = e.currentTarget.dataset.src;
      url = url.replace(/_mini/g,"_original");
      // console.log(url)
      let pre = [url]
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: pre // 需要预览的图片http链接列表
      })
    },
    // 上传操作
    uploadImags(data) {
      // return wxRequest('POST', '/api/Upload/UploadImg', data);
      let fileArr = data.tempFilePaths;
      let alls = []
      let that = this
      fileArr.forEach((item,index) => {  
        alls.push(this.promiseWork(index,item))
      });
      Promise.all(alls).then((result) => {
        // console.log('哈勒',result) //上传结束
        that.data.prePicArr = this.data.prePicArr.concat(result)
        that.setData({
          prePicArr: that.data.prePicArr,
          inUpload: []
        })
        // 回调函数
        that.notify(true)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 创建上传队列
    promiseWork(index,filePath) {
      let that = this
      return new Promise((resolve, reject) => {
        const uploadTask = wx.uploadFile({
          url: baseURL + '/api/Upload/UploadImg', // 仅为示例，非真实的接口地址
          filePath: filePath,
          name: 'file',
          formData: {
            folder: 'Device\\' + that.properties.facilityId
          },
          success(res) {
            const data = JSON.parse(res.data).Data
            resolve(data)
            // console.log(data);
          }
        })
        uploadTask.onProgressUpdate((res) => {
          // console.log('上传进度', res.progress);
          that.renderProgress(index,res.progress)
        })
      })
    },
    // 更新上传进度条
    renderProgress(index,val){
      // console.log(index, val)
      if( !val )return;
      this.data.inUpload[index] = val
      this.setData({
        inUpload:this.data.inUpload
      })
    },
    // 回调上级组件的函数
    notify(bool){
      if(bool){
        // 提示用户保存
        this.triggerEvent('updatedHandle', { notify: true, arr: this.data.prePicArr}) 
      }else{
        // console.log(this.data.prePicArr)
        this.triggerEvent('updatedHandle', { notify: false, arr: this.data.prePicArr }) 
      }
      
    }
  }
})
