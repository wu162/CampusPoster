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
    bar:{},
    month:{},
    day:{},
    openid:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getData();
  },
  /**
   * 获取列表数据
   * 
   */
  getData: function () {

    db.collection('topic')
      .where({
        _openid: app.globalData.openId, // 填入当前用户 openid
      })
      .orderBy('date', 'desc')
      .get({
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var date = res.data[i].date
          
            var m = date.getMonth()
            var d = date.getDate()
            var month = "month[" + i + "]";
            var day = "day[" + i + "]";
            switch(m){
              case 0: m = "一月"
                break;
              case 1: m= "二月"
                break;
              case 2: m= "三月"
                break;
              case 3: m= "四月"
                break;
              case 4: m= "五月"
                break;
              case 5: m= "六月"
                break;
              case 6: m= "七月"
                break;
              case 7: m= "八月"
                break;
              case 8: m= "九月"
                break;
              case 9:m = "十月"
                break;
              case 10:m = "十一月"
                break;
              case 11:m = "十二月"
                break;
            }
            that.setData({
              [month]:m,
              [day]:d
            })

          }
          that.setData({
            topics: res.data,
          })

          for (var i = 0; i < res.data.length; i++) {
            that.getBarInfo(res,i)
          }
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
        console.log(that.data.bar)
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
