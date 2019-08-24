const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    image: '',
    user: {},
    name: '新用户',
    gender: 0,
    region: [],//provice-city,


    _openid: '',
    topics: [],
    icons: ['../../images/wu/share.png',
      '../../images/wu/review.png',
      '../../images/wu/like.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   that = this
  //   that.getOpenid();     //获取用户_openid
  // },

  onLoad: function () {
    that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                }
              });
              that.getOpenid(); 
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.data.isHide=true
          that.setData({
            isHide: that.data.isHide
          });
        }
      }
    });
  },

  //页面显示时刷新数据
  onShow: function () {
    that.getTopics();   //获取帖子
  },



  //获取用户的_openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取的openid', res.result.openId)
        // console.log('云函数获取的openid,res.result.userInfo.openid', res.result.userInfo.OPENID)
        app.globalData.openId = res.result.openId;
        console.log('app.globalData.openId', app.globalData.openId)
        that.data._openid = res.result.openId
        that.setData({
          _openid: that.data._openid
        })
      }
    })
  },

  // //在user库里查找用户
  // getuser: function () {
  //   that = this
  //   // 判断用户是否第一次使用，不是则创建新用户
  //   db.collection('user')
  //     .where({
  //       _openid: app.globalData.openid,
  //     })
  //     .get({
  //       success: function (res) {
  //         console.log(res.data)
  //         if (res.data[0] == undefined) {
  //           console.log('无此用户');
  //           // that.upLoadImage();    //函数调用顺序问题
  //           // that.addUser(db);
  //           that.upLoadImage().then(result => {
  //             that.addUser(db);
  //           })
  //         }
  //         else {
  //           console.log('已有此用户')
  //         }
  //       },
  //       fail: function (res) {
  //         console.log('获取数据失败')
  //       }
  //     })
  //   // wx.switchTab({
  //   //   url: '../index/index',
  //   // })
  // },

  //获取帖子(未限制数量)
  getTopics: function () {
    db.collection('topic').get({
      success: function (res) {
        that.data.topics = res.data
        that.setData({
          topics: that.data.topics
        })
        console.log('that.data.topics', that.data.topics)
      }
    })
  },





  onSearch: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.data.isHide=false
      that.setData({
        isHide: that.data.isHide
      });

      
      that.data.user = e.detail.userInfo;
      that.data.name = e.detail.userInfo.nickName;
      // that.data.image = e.detail.userInfo.avatarUrl;
      that.data.gender = e.detail.userInfo.gender;
      that.data.region = new Array(e.detail.userInfo.province, e.detail.userInfo.city);
      // //下载头像图片            注：要把thirdwx.qlogo.cn和wx.qlogo.cn添加到downloadFile的合法域名里
      // wx.downloadFile({
      //   url: that.data.image,
      //   success(res) {
      //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      //     that.data.image = res.tempFilePath
      //   }
      // })
      that.setData({
        user: that.data.user,
        name: that.data.name,
        // image: that.data.image,
        gender: that.data.gender,
        region: that.data.region,
      })

      that.addUser(db);

      // that.upLoadImage().then(result => {
      //   that.addUser(db);
      // })

      that.getOpenid(); 

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  // // 上传头像图片
  // upLoadImage: function () {
  //   return new Promise(resolve => {
  //     that = this,
  //       // 将图片上传至云存储空间
  //       wx.cloud.uploadFile({
  //         // 指定要上传的文件的小程序临时文件路径
  //         cloudPath: that.timetostr(new Date()),
  //         filePath: that.data.image,
  //         // 成功回调
  //         success: res => {
  //           that.data.image = res.fileID
  //           that.setData({
  //             image: res.fileID,
  //           })
  //           console.log('image已为fileid')
  //           console.log(that.data.image)
  //           return resolve();
  //         },
  //         fail: res => {
  //           console.log('上传失败')
  //           return resolve();
  //         }
  //       })
  //   });
  // },


  // /**
  //  * 图片路径格式化
  //  */
  // timetostr(time) {
  //   var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  //   var str = randnum + "_" + time.getMilliseconds() + ".png";
  //   return str;
  // },

  //向user库里添加新用户
  addUser: function (db) {
    //调试用
    console.log('this.data.user内容')
    console.log(this.data.user)
    console.log(this.data.name)
    // console.log(this.data.image)
    console.log(this.data.gender)
    console.log(this.data.region)
    console.log('that.data.user内容')
    console.log(that.data.user)
    console.log(that.data.name)
    // console.log(that.data.image)
    console.log(that.data.gender)
    console.log(that.data.region)

    db.collection('user').add({
      // 向user数据库添加新用户，数据为初始数据
      data: {
        name: that.data.name,
        user: that.data.user,
        // avatar: that.data.image,
        birth: { year: 2000, month: 1, day: 1 },
        age: 19,
        region: ['广东省', '广州市'],
        sex: that.data.gender,
        sign: '我的个性签名',
      },
      success: function (res) {
        console.log('成功创建用户')
      },
      fail: function (res) {
        console.log('创建用户失败')
      }

    })
  }
})