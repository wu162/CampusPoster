// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    see:1,
    posterRec:[
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postContent/postContent'
      }
    ],
    posterFol:[
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postContent/postContent'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postContent/postContent'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onEye:function(e){
    if(this.data.see==1)
    {
      this.setData({
        see:0
      })
    }
    else{
      this.setData({
        see: 1
      })
    }
  },

  onSearch:function(e){
    wx.navigateTo({
      url: '../search/search'
    })
  }
})