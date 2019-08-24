// pages/message/message.js
var that
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
      * @我的
      */
  onMentionsClick: function (event) {
    wx.navigateTo({
      url: '../mentions/mentions',
    })
  },

  /**
    * 点赞
    */
  onLikesClick: function (event) {
    wx.navigateTo({
      url: '../likes/likes',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    reply:{},
    message:{},
    test: [{
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head:'../../images/zhang/bg.png',
      username:'Alice1',
      time: new Date(2019,7,1,6,30,0).getTime(),
      title:'帖子1',
      reply:'Alice1回复的内容,由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      beReply:'被Alice1回复的内容,由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      barname:'所属吧名',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head: '../../images/zhang/bg.png',
      username: 'Alice2',
      time: new Date(2019, 6, 26, 10, 28, 4).getTime(),
      title: '帖子2',
      reply: 'Alice2回复的内容',
      beReply: '被Alice2回复的内容',
      barname: '所属吧名',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head: '../../images/zhang/bg.png',
      username: 'Alice3',
      time: new Date(2019, 5, 28, 8, 18, 6).getTime(),
      title: '帖子3',
      reply: 'Alice3回复的内容',
      beReply: '被Alice3回复的内容',
      barname: '所属吧名',
    }],
  },
  onLoad: function (options) {
    that = this
  },
  onShow: function (options) {

    that.jugdeUserLogin();
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
              that.data.user = res.userInfo;
              console.log(res)
              that.getMessage();
            }
          })
        }
      }
    })
  },
  // 获取消息
  getMessage: function () {
    db.collection('message').orderBy('date', 'desc').where({
      u_id: app.globalData.openId
    }).get({
      success: function (res) {
        that.setData({
          message: res.data,
        })
        for (var i = 0; i < res.data.length; i++) {
          if(res.data.type==1)
          that.getTopic(res, i)
          else
          that.getReply(res, i)
        }
      }
    })
  },
  getTopic: function (res,i) {
    db.collection('topic').where({
    _id:res.data[i].t_id
    }).get({
      success: function (res) {
        var reply = "reply[" + i + "]";
        that.setData({
          [reply]: res.data,
        })
  }

})
  },
  getReply: function (res, i) {
    db.collection('reply').where({
      _id: res.data[i].r_id
    }).get({
      success: function (res) {
        var reply = "reply[" + i + "]";
        that.setData({
          [reply]: res.data,
        })
      }

    })
  },
  /**
*message 点击
*/
  onMessageClick: function (event) {
    var r_id = event.currentTarget.dataset.r_id;
    var openid = event.currentTarget.dataset.openid;
    var t_id = event.currentTarget.dataset.t_id;
    var type = event.currentTarget.dataset.type;
   
if(type==1)
    wx.navigateTo({
      url: "../postContent/postContent?t_id=" + t_id + "&openid=" + openid 
    })
    else
  wx.navigateTo({
    url: "../reply/reply?r_id=" + r_id + "&openid=" + openid 
  })
  },
})