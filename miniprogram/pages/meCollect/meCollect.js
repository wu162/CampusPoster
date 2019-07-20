const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
collects:{},
topics:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData(this.data.page);
  },
  /**
     * 获取列表数据
     * 
     */
  getData: function (page) {
    db.collection('collect')
      .where({
        _openid: app.globalData.openid, // 填入当前用户 openid
      })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          this.data.collects = res.data;
          this.getTopicFromCollects();
        },
      })
  },
  /**
    * 获取收藏中的 id 的话题
    */
  getTopicFromCollects: function (event) {
    var tempTopics = {};
    for (var i in this.data.collects) {
      var topicId = this.data.collects[i]._id;
      db.collection('topic')
        .doc(topicId)
        .get({
          success: function (res) {
            this.data.topics.push(res.data);
           this.setData({
              topics: this.data.topics,
            })
          },
          fail: console.log
        })
    }
  },
})