// pages/postCreat/postCreat.js
const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid:'',
    b_name: '',
    haveNotChooseImage: true,
    isbit: false,
    b_avatar:[],
    temp: [],
    b_id: '',
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    that = this
    that.data._openid = options._openid;
    that.setData({
      openid: that.data._openid,
    })
  },
  /**
 * 获取填写的吧名
 */
  getNameAreaContent: function (event) {
    that.data.b_name = event.detail.value;
  },

  /**
   * 选择图片
   */
  chooseImage: function (event) {
    console.log('调用chooseimage函数')
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 设置图片
        that.data.temp = res.tempFilePaths
        that.data.haveNotChooseImage = false
        that.setData({
          temp: that.data.temp,
          haveNotChooseImage: that.data.haveNotChooseImage
        })
      },
    })
  },
  /**
   * 图片路径格式化
   */
  timetostr(time) {
    var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    var str = randnum + "_" + time.getMilliseconds() + ".png";
    return str;
  },

  /**
   * 发布
   */
  formSubmit: function (e) {
    if(!that.data.isbit){
      that.data.isbit = true;
      that.data.b_name = e.detail.value['input-name'];
      that.setData({
        isbit: that.data.isbit,
        b_name: that.data.b_name,
      })
      if (this.data.temp.length > 0 && this.data.b_name.trim() != '') {
        that.upLoadImage().then(result => {
          that.saveDataToServer();
        })
      }
      else {
        wx.showToast({
          icon: 'none',
          title: '请完善信息',
        })
        that.data.isbit=false
        that.setData({
          isbit: that.data.isbit
        })
      }
    }
  },

  upLoadImage:function (){
    return new Promise(resolve => {
      for (var i in that.data.temp) {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定要上传的文件的小程序临时文件路径
          cloudPath: that.timetostr(new Date()),
          filePath: that.data.temp[i],
          // 成功回调
          success: res => {
            that.data.b_avatar.push(res.fileID)
            that.setData({
              b_avatar: that.data.b_avatar,
            })
            console.log('上传成功')
            return resolve();
          },
          fail: res => {
            console.log('上传失败')
            return resolve();
          }
        })
      } 
    })
  },

  /**
   * 保存到发布集合中
   */
  saveDataToServer: function (event) {
    db.collection('bar').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        b_name: that.data.b_name,
        b_avatar: that.data.b_avatar[0],
        b_follow: [],
        b_postList: [],
      },
      success: function (res) {
        that.data.b_id=res._id
        that.addBarFollow(res._id)
        that.setData({
          b_id: that.data.b_id
        })
      },
    })

    
  },



  //增加吧关注记录
  addBarFollow: function (b_id){
    db.collection('barFollow').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        b_id: b_id,
        b_name: that.data.b_name,
        b_avatar: that.data.b_avatar[0],
      },
      success: function (res) {
        that.showTipAndSwitchTab().then(result => {
          that.jump();
        })
      },
    })
  },







  /**
   * 添加成功添加提示，切换页面
   */
  showTipAndSwitchTab: function (event) {
    return new Promise(resolve => {
      wx.showToast({
        title: '建吧成功',
      })
      return resolve();
    })
  },

  jump:function (){
    var _openid = that.data._openid
    var b_id = that.data.b_id;
    console.log('_openid', _openid,'b_id',b_id)
    wx.redirectTo({
      url: "../postIndex/postIndex?b_id=" + b_id + "&_openid=" + _openid
    })
  },


  /**
   * 删除图片
   */
  removeImg: function (event) {
    var position = event.currentTarget.dataset.index;
    that.data.temp.splice(position, 1);
    that.data.haveNotChooseImage=true
    // 渲染图片
    that.setData({
      temp: that.data.temp,
      haveNotChooseImage: that.data.haveNotChooseImage
    })
  },
  // 预览图片
  previewImg: function (e) {
    wx.previewImage({
      //当前显示图片
      current: that.data.b_avatar[0],
      //所有图片
      urls: that.data.b_avatar
    })
  },

})