// pages/postIndex/postIndex.js
const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    b_id: '',
    _openid: '',
    barmessage: [],    //放本吧信息
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

    topics: [],

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
      // {
      //   thumb: '../../images/bg.png',
      //   thumb_link: '../meInfo/meInfo',
      //   content_link: '../postContent/postContent',
      //   name: '作者名',
      //   time: new Date(2019, 6, 30, 11, 25, 2).getTime(),
      //   title: '帖子标题',
      //   content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      //   thumbs: [],
      //   nums: ['20', '20', '20']
      // },
      // {
      //   thumb: '../../images/bg.png',
      //   thumb_link: '../meInfo/meInfo',
      //   content_link: '../postContent/postContent',
      //   name: '作者名',
      //   time: new Date(2019, 6, 30, 2, 21, 2).getTime(),
      //   title: '帖子标题',
      //   content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      //   thumbs: ['../../images/bg.png'],
      //   nums: ['20', '20', '20']
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.data.b_id = options.b_id
    that.data._openid = options._openid
    that.setData({
      b_id: that.data.b_id,
      _openid: that.data._openid,
    })
    that.saveToBarHistory();
  },


  //页面显示时刷新数据
  onShow: function () {
    this.getBarMessage();   //获取本吧信息
    this.getTopics();     //获取本吧帖子
  },
  //存到贴吧访问历史
  saveToBarHistory: function () {
    db.collection('barHistory').where({
      _openid: that.data._openid,
      _id: that.data.b_id
    }).get({
      success: function (res) {
        if (res.data.length == 0)
          that.addTobarHistory();
        else {
          that.removeTobarHistory();
          that.addTobarHistory();
        }
      }
    })

  },
  addTobarHistory: function () {
    db.collection('barHistory').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.b_id,
        date:new Date()
      },
      success: function (res) {
      }
    })
  },
  removeTobarHistory: function () {
    db.collection('barHistory').doc(that.data.b_id).remove({
    });
  },
  //获取本吧信息
  getBarMessage: function (){
    db.collection('bar').where({
      _id : that.data.b_id
    })
    .get({
      success: function (res) {
        that.data.bar = res.data
        that.setData({
          bar: that.data.bar
        })
        console.log('that.data.bar', that.data.bar)
        console.log('that.data.bar.b_name', that.data.bar[0].b_name)
      }
    })
  },



  //获取本吧帖子
  getTopics: function () {
    db.collection('topic').where({
      bar: that.data.b_id
    })
      .get({
        success: function (res) {
          that.data.topics = res.data
          that.setData({
            topics: that.data.topics
          })
          console.log('that.data.topics', that.data.topics)
        }
      })
  },


  //跳转到发帖页面
  onpost:function(e){
    wx.navigateTo({
      url: '../post/post?b_id=' + this.data.b_id + '&_openid=' + this.data._openid
    })
  }
})