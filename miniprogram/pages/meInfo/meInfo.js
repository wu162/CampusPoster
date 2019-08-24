// pages/meInfo/meInfo.js
const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg:'../../images/bg.png',
    male:'../../images/male.png',      
    female: '../../images/female.png',     
    fans_num:3,
    follow_num:3,
    poster_num:3,
    sign:'软件学院学生',
    age:19,
    birth: [],
    region:'广州',
    _openid: '',
    u_id: 'null',
    user: {},
    judge: false,
    _id: '',
    topicLength: '',
    followLength: '',
    fanLength: '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
 
    that.getOpenid(options).then(result => {
      console.log('that.data.u_id test', that.data.u_id)
      that.getInfo(that.data.u_id);
      console.log(that.data.u_id)
    })
  

  },


  //页面显示时刷新数据
  onShow: function () {
    // this.getInfo(that.data.u_id);   
  },

  //获取用户信息
  getInfo: function (u_id) {
    db.collection('user').where({
      _openid: u_id
    })
      .get({
        success: function (res) {
          console.log('res', res.data[0])
          that.data._id = res.data[0]._id
          that.data.user = res.data[0].user
          that.data.sign = res.data[0].sign
          that.data.age = res.data[0].age
          that.data.birth = res.data[0].birth
          that.data.region = res.data[0].region
          that.setData({
            _id: that.data._id,
            user: that.data.user,
            sign: that.data.sign,
            age: that.data.age,
            birth: that.data.birth,
            region: that.data.region,
          })
          console.log('that.data.user', that.data.user)

        }
      })
  },

  //获取用户的_openid
  getOpenid(options) {
    return new Promise(resolve => {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          console.log('云函数获取的openid', res.result.openId)
          that.data._openid = res.result.openId
          if (options.u_id == undefined) {
            console.log('options.u_id undefined', options.u_id)
            that.data.judge = true
            that.data.u_id = that.data._openid
          }
          else if (options.u_id == that.data._openid) {
            that.data.u_id = options.u_id
            that.data.judge = true
            console.log('options.u_id == that.data._openid', options.u_id)
          }
          else{
            that.data.u_id = options.u_id
            console.log('options.u_id != that.data._openid', options.u_id)
          }
          that.setData({
            _openid: that.data._openid,
            u_id: that.data.u_id,
            judge: that.data.judge
          })
          //获取帖子列表
          db.collection('topic')
            .where({
              _openid: that.data.u_id, // 填入当前用户 openid
            })
            .get({
              success: function (res) {
                that.setData({
                  topicLength: res.data.length
                })
                console.log('res.data.length', res.data.length)
              }
            })


          //获取关注列表
          db.collection('fan')
            .where({
              _openid: that.data.u_id, // 填入当前用户 openid
            })
            .get({
              success: function (res) {
                that.setData({
                  followLength: res.data.length
                })

              }
            })
          //获取粉丝列表
          db.collection('fan')
            .where({
              _id: that.data.u_id, // 填入当前用户 openid
            })
            .get({
              success: function (res) {
                that.setData({
                  fanLength: res.data.length
                })

              }
            })
          return resolve();
        }
      })
    });
  },



  editInfo:function(e){
    wx.navigateTo({
      url: '../meInfoEdit/meInfoEdit?_openid=' + that.data._openid + '&_id=' + that.data._id + '&avatar=' + that.data.user.avatarUrl + '&name=' + that.data.user.nickName + '&sex=' + that.data.user.gender + '&sign=' + that.data.sign + '&age=' + that.data.age + '&year=' + that.data.birth.year + '&month=' + that.data.birth.month + '&day=' + that.data.birth.day +'&region='+that.data.region
    })
  }
})