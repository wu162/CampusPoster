// pages/mefans/mefans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_text_unpressed: '十 关注',
    btn_text_pressed: ' 已关注',
    fans_num: 3,
    fans: [
      {
        thumb: '../../images/follow/thumb.jpg',
        thumb_link: '../meInfo/meInfo',
        title: '物162',
        desc: '软件学院学生',
        btn_state: 1
      },
      {
        thumb: '../../images/follow/thumb.jpg',
        thumb_link: '../meInfo/meInfo',
        title: '物172',
        desc: '软件学院学生',
        btn_state: 0
      },
      {
        thumb: '../../images/follow/thumb.jpg',
        thumb_link: '../meInfo/meInfo',
        title: '物182',
        desc: '软件学院学生',
        btn_state: 0
      }
    ]
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