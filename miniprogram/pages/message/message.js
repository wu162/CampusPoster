// pages/message/message.js
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
    test: [{
      head:'../../images/bg.png',
      username:'Alice1',
      time:'15:50',
      title:'帖子1',
      reply:'Alice1回复的内容',
      bereply:'被Alice1回复的内容',
    },
    {
      head: '../../images/bg.png',
      username: 'Alice2',
      time: '昨天 15:12',
      title: '帖子2',
      reply: 'Alice2回复的内容',
      bereply: '被Alice2回复的内容',
    },
    {
      head: '../../images/bg.png',
      username: 'Alice3',
      time: '2000年1月1日',
      title: '帖子3',
      reply: 'Alice3回复的内容',
      bereply: '被Alice3回复的内容',
    }]
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