// pages/me/me.js
const app = getApp()
var that
const db = wx.cloud.database();
Page({
  data: {

    openid: '',
    topicLength:'',
    followLength: '',
    fanLength: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getOpenid();
    that.getData();
  },

  //获取用户的_openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取的openid', res.result.openId)
        that.data.openid = res.result.openId
        that.setData({
          openid: that.data.openid
        })

      }
    })
  },


getData:function(){
//获取帖子列表
  db.collection('topic')
    .where({
      _openid: app.globalData.openId, // 填入当前用户 openid
    })
    .get({
      success: function (res) {
        that.setData({
          topicLength:res.data.length
        })
        console.log('res.data.length', res.data.length)
      }
    })
    
    
  //获取关注列表
  db.collection('fan')
    .where({
      _openid: app.globalData.openid, // 填入当前用户 openid
    })
    .get({
      success: function (res) {
        that.setData({
          followLength: res.data.length
        })

      }
    })
  //获取粉丝列表
  db.collection('fan')
    .where({
      _id: app.globalData.openid, // 填入当前用户 openid
    })
    .get({
      success: function (res) {
        that.setData({
          fanLength: res.data.length
        })

      }
    })

},
  /**
   * 关注列表
   */
  onFollowClick: function (event) {
    wx.navigateTo({
      url: '../mefollow/mefollow',
    })
  },
  /**
 * 粉丝列表
 */
  onFanClick: function (event) {
    wx.navigateTo({
      url: '../mefans/mefans',
    })
  },
  /**
 * 帖子列表
 */
  onPosterClick: function (event) {
    wx.navigateTo({
      url: '../mePoster/mePoster?openid='+that.data.openid,
    })
  },
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
    wx.navigateTo({
      url: '../meInfo/meInfo',
    })
  },
})