// pages/likes/likes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: [{
      head: '../../images/bg.png',
      username: 'Alice1',
      time: '15:50',
      typeisreply: true,
      reply: 'Alice1回复的内容',
      image: '../../images/bg.png',
      title: '帖子1',
      barname: '所属吧名1',
    },
    {
      head: '../../images/bg.png',
      username: 'Alice2',
      time: '昨天 15:12',
      typeisreply: false,
      reply: '',
      image: '../../images/bg.png',
      title: '帖子2',
      barname: '所属吧名2',
    },
    {
      head: '../../images/bg.png',
      username: 'Alice3',
      time: '2000年1月1日',
      typeisreply: true,
      reply: 'Alice3回复的内容',
      image: '../../images/bg.png',
      title: '帖子3',
      barname: '所属吧名2',
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