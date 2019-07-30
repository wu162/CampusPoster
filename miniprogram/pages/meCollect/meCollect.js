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
    test: [{
      head:'../../images/tian/head.png',
      name:'帖子作者名',
      barname: '贴吧1',
      collect:'../../images/tian/collect.png',
      collected: '../../images/tian/collected.png',
      images: '../../images/tian/bg.png',
      title: '标题1',
      isCollected:true,
    },
      {
        head: '../../images/tian/head.png',
        name: '帖子作者名',
        barname: '贴吧1',
        collect: '../../images/tian/collect.png',
        collected: '../../images/tian/collected.png',
        title: '标题1',
        isCollected: true,
      },
      {
        head: '../../images/tian/head.png',
        name: '帖子作者名',
        barname: '贴吧1',
        collect: '../../images/tian/collect.png',
        collected: '../../images/tian/collected.png',
        images: '../../images/tian/bg.png',
        title: '标题1',
        isCollected: false,
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getData(that.data.page);
  },
  /**
   * 获取列表数据
   * 
   */
  getData: function (page) {
    // 获取总数
    db.collection('topic').count({
      success: function (res) {
        that.data.totalCount = res.total;
      }
    })
    // 获取前十条
    try {
      db.collection('topic')
        .where({
          _openid: app.globalData.openid, // 填入当前用户 openid
        })
        .orderBy('date', 'desc')
        .get({
          success: function (res) {
            that.data.topics = res.data;
            that.setData({
              topics: that.data.topics,
            })
            wx.hideNavigationBarLoading();//隐藏加载
            wx.stopPullDownRefresh();

          },
          fail: function (event) {
            wx.hideNavigationBarLoading();//隐藏加载
            wx.stopPullDownRefresh();
          }
        })
    } catch (e) {
      wx.hideNavigationBarLoading();//隐藏加载
      wx.stopPullDownRefresh();
      console.error(e);
    }
  },
  /**
   * item 点击
   */
  onItemClick: function (event) {
    var id = event.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: '../postContent/postContent',
    })
  },
  /**
 * writer 点击
 */
  onWriterClick: function (event) {
    var id = event.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: '../meInfo/meInfo',
    })
  },
  /**
   *collect 点击
   */
  OnCollectClick: function (event) {
   var index=event.currentTarget.dataset.index;
   console.log(index)
    var up = "test[0].collect";
    if(![up])
   that.setData({
     [up]:true,
   })
   else
      that.setData({
        [up]:false,
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log('pulldown');
    that.getData(that.data.page);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var temp = [];
    // 获取后面十条
    if (that.data.topics.length < that.data.totalCount) {
      try {
        const db = wx.cloud.database();
        db.collection('topic')
          .where({
            _openid: app.globalData.openid, // 填入当前用户 openid
          })
          .skip(5)
          .limit(that.data.pageSize) // 限制返回数量为 10 条
          .orderBy('date', 'desc')
          .get({
            success: function (res) {
              // res.data 是包含以上定义的两条记录的数组
              if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                  var tempTopic = res.data[i];
                  console.log(tempTopic);
                  temp.push(tempTopic);
                }

                var totalTopic = {};
                totalTopic = that.data.topics.concat(temp);

                console.log(totalTopic);
                that.setData({
                  topics: totalTopic,
                })
              } else {
                wx.showToast({
                  title: '没有更多数据了',
                })
              }


            },
          })
      } catch (e) {
        console.error(e);
      }
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }

  },

})