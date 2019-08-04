// pages/postIndex/postIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:{
      thumb:'../../images/bg.png',
      title:'吧名',
      desc:'关注 10w    帖子 10w',
      btn_text:'已关注'
    },
    top: ['帖子标题','帖子标题'],

    icons: ['../../images/wu/share.png',
      '../../images/wu/review.png',
      '../../images/wu/like.png'],
    postList: [
      {
        thumb: '../../images/bg.png',
        thumb_link: '../meInfo/meInfo',
        content_link: '../postContent/postContent',
        name: '作者名',
        time: new Date(2019, 6, 28, 10, 28, 2).getTime(),
        title: '帖子标题',
        content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
        thumbs: ['../../images/bg.png', '../../images/bg.png', '../../images/bg.png', '../../images/bg.png'],
        nums: ['20', '20', '20']
      },
      {
        thumb: '../../images/bg.png',
        thumb_link: '../meInfo/meInfo',
        content_link: '../postContent/postContent',
        name: '作者名',
        time: new Date(2019, 6, 30, 11, 25, 2).getTime(),
        title: '帖子标题',
        content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
        thumbs: [],
        nums: ['20', '20', '20']
      },
      {
        thumb: '../../images/bg.png',
        thumb_link: '../meInfo/meInfo',
        content_link: '../postContent/postContent',
        name: '作者名',
        time: new Date(2019, 6, 30, 2, 21, 2).getTime(),
        title: '帖子标题',
        content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
        thumbs: ['../../images/bg.png'],
        nums: ['20', '20', '20']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onpost:function(e){
    wx.navigateTo({
      url: '../post/post'
    })
  }
})