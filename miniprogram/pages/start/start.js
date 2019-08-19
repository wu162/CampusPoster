// pages/start/start.js
const app = getApp()
var that
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    image: '',
    user: {},
    name: '新用户',
    gender: 0,
    region: [],//provice-city
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    //获得授权
    if (this.data.canIUse) {
      console.log('已授权')
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log('getuser内')
                console.log(res.userInfo)
                that.data.user = res.userInfo;
                that.data.name = res.userInfo.nickName;
                that.data.image = res.userInfo.avatarUrl;
                that.data.gender = res.userInfo.gender;
                that.data.region.push(res.userInfo.province);
                that.data.region.push(res.userInfo.city);
                //下载头像图片            注：要把thirdwx.qlogo.cn和wx.qlogo.cn添加到downloadFile的合法域名里
                wx.downloadFile({
                  url: that.data.image,
                  success(res) {
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    that.data.image = res.tempFilePath
                  }
                })
                that.setData({
                  user: that.data.user,
                  name: that.data.name,
                  image: that.data.image,
                  gender: that.data.gender,
                  region: that.data.region,
                })
              }
            })
          }
        }
      })
    } else {
      console.log('未授权')
      this.jugdeUserLogin();
    }
  },


  //在user库里查找用户
  getuser: function () {
    that = this
    // 判断用户是否第一次使用，不是则创建新用户
    db.collection('user')
      .where({
        _openid: app.globalData.openid,
      })
      .get({
        success: function (res) {
          console.log(res.data)
          if (res.data[0] == undefined) {
            console.log('无此用户');
            // that.upLoadImage();    //函数调用顺序问题
            // that.addUser(db);
            that.upLoadImage().then(result => {
              that.addUser(db);
            })
          }
          else {
            console.log('已有此用户')
          }
        },
        fail: function (res) {
          console.log('获取数据失败')
        }
      })
    wx.switchTab({
      url: '../index/index',
    })
  },


  // 上传头像图片
  upLoadImage: function () {
    return new Promise(resolve => {
      that = this,
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定要上传的文件的小程序临时文件路径
          cloudPath: that.timetostr(new Date()),
          filePath: that.data.image,
          // 成功回调
          success: res => {
            that.data.image = res.fileID
            that.setData({
              image: res.fileID,
            })
            console.log('image已为fileid')
            console.log(that.data.image)
            return resolve();
          },
          fail: res => {
            console.log('上传失败')
            return resolve();
          }
        })
    });
  },


  /**
   * 图片路径格式化
   */
  timetostr(time) {
    var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    var str = randnum + "_" + time.getMilliseconds() + ".png";
    return str;
  },


  //向user库里添加新用户
  addUser: function (db) {
    //调试用
    console.log('this.data.user内容')
    console.log(this.data.user)
    console.log(this.data.name)
    console.log(this.data.image)
    console.log(this.data.gender)
    console.log(this.data.region)
    console.log('that.data.user内容')
    console.log(that.data.user)
    console.log(that.data.name)
    console.log(that.data.image)
    console.log(that.data.gender)
    console.log(that.data.region)

    db.collection('user').add({
      // 向user数据库添加新用户，数据为初始数据
      data: {
        name: that.data.name,
        avatar: that.data.image,
        birth: { year: 2000, month: 1, day: 1 },
        age: 19,
        region: that.data.region,
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
  },


  /**
   * 判断用户是否登录
   */
  jugdeUserLogin: function (event) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('judgeUserLogin内')
              console.log(res.userInfo)
              that.data.user = res.userInfo;
              that.data.name = res.userInfo.nickName;
              that.data.image = res.userInfo.avatarUrl;
              that.data.gender = res.userInfo.gender;
              that.data.region.push(res.userInfo.province);
              that.data.region.push(res.userInfo.city);
              //下载头像图片            注：要把thirdwx.qlogo.cn和wx.qlogo.cn添加到downloadFile的合法域名里
              wx.downloadFile({
                url: that.data.image,
                success(res) {
                  // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                  that.data.image = res.tempFilePath
                }
              })
              that.setData({
                user: that.data.user,
                name: that.data.name,
                image: that.data.image,
                gender: that.data.gender,
                region: that.data.region,
              })
            }
          })
        }
      }
    })
  },

})