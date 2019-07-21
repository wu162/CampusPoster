// pages/me/me.js
Page({
  /**
    * 收藏列表
    */
  onCollectClick: function (event) {
    wx.navigateTo({
      url: '../meCollect/meCollect',
    })
  },
  /**
   * 浏览历史
   */
  onHistoryClick: function (event) {
    wx.navigateTo({
      url: '../meHistory/meHistory',
    })
  },

  /**
   * 关于
   */
  onAboutClick: function (event) {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 修改资料
   */
  onChangeClick: function (event) {
    wx.navigateTo({
      url: '../meInfo/meInfo',
    })
  },

  /**
  * 更多
  */
  onMoreClick: function (event) {

  },
})