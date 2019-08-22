const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    totalCount: 0,
    topics: {},
    openid:'',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getData();
    that.setData({
      openid:app.globalData.openid
    })
  },
  /**
   * 获取列表数据
   * 
   */
  getData:function(){
  db.collection('collect')
      .where({
        _openid: app.globalData.openid, // 填入当前用户 openid
      })
      .orderBy('date', 'desc')
      .get({
        success: function (res) {
          that.setData({
            topics: res.data,
          })
          for (var i = 0; i < res.data.length; i++) {
            that.getTopic(res,i)
            that.getBarInfo(res,i)
          }
        }
      })
  },
  getTopic: function (res, i) {
    db.collection('topic').doc(res.data[i]._id).get({
      success: function (res) {
        var topics = "topics[" + i + "]";
        that.setData({
          [topics]: res.data
        })
        console.log(that.data.topics)
      }

    })
  },
  getBarInfo: function (res, i) {
    db.collection('bar').where({
      _id: res.data[i].bar
    }).get({
      success: function (res) {
        var bar = "bar[" + i + "]";
        that.setData({
          [bar]: res.data,
        })
      }

    })
  },
  /**
   * topic 点击
   */
  onTopicClick: function (event) {
    var t_id = event.currentTarget.dataset.t_id;
    var b_id = event.currentTarget.dataset.b_id;
    var _openid = event.currentTarget.dataset._openid;
    console.log(t_id)
    console.log(_openid)
    wx.navigateTo({
      url: '../postContent/postContent?t_id=' + t_id + '&_openid=' + _openid + '&b_id=' + b_id
    })
  },

})