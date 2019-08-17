// pages/mentions/mentions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: [{
      head: '../../images/zhang/bg.png',
      name: 'Alice1',
      fan:'../../images/ma/fan.png',
      mention:'不错',
      time: '2019-07-22',
      timepic:'../../images/ma/time.png',
      isFan:true,
    },
    {
      head: '../../images/zhang/bg.png',
      name: 'Alice3',
      fan:'../../images/ma/fan.png',
      mention:'不错',
      time: '2019-07-22',
      timepic:'../../images/ma/time.png',
      isFan:false,
    },
    {
      head: '../../images/zhang/bg.png',
      name: 'Alice4',
      fan:'../../images/ma/fan.png',
      mention:'不错',
      time: '2019-07-22',
      timepic:'../../images/ma/time.png',
      isFan:false,
    },
    {
      head: '../../images/zhang/bg.png',
      name: 'Alice2',
      fan:'../../images/ma/fan.png',
      mention:'不错',
      time: '2019-07-22',
      timepic:'../../images/ma/time.png',
      isFan:true,
    },
    ]

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})