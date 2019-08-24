// pages/enter/enter.js
const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid:'',
    see:1,
    bar:{},
    posterRec:[
      // {
      //   thumb: '../../images/bg.png',
      //   name: '吧名',
      //   desc: '关注10w',
      //   link: '../postIndex/postIndex'
      // },
      // {
      //   thumb: '../../images/bg.png',
      //   name: '吧名',
      //   desc: '关注10w',
      //   link: '../postIndex/postIndex'
      // }
    ],
    posterFol:[
      // {
      //   thumb: '../../images/bg.png',
      //   title: '吧名',
      //   desc: '关注 10w  帖子 10w',
      //   link: '../postIndex/postIndex'
      // },
      // {
      //   thumb: '../../images/bg.png',
      //   title: '吧名',
      //   desc: '关注 10w  帖子 10w',
      //   link: '../postIndex/postIndex'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    that.getOpenid();     //获取用户_openid
  },

  //页面显示时刷新数据
  onShow: function (){
    this.getBarFollows();   //获取关注的吧
    this.getBarRec();       //获取最近逛的吧
  },


  //获取用户的_openid
  getOpenid(){
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取的openid',res.result.openId)
        that.data._openid = res.result.openId
        that.setData({
          _openid: that.data._openid
        })
        
      }
    })
  },

  //获取关注的吧
  getBarFollows:function() {
    //获取本用户建的吧
    db.collection('barFollow').where({
      _openid: app.globalData.openid,
    }).get({
      success: function(res){
        that.data.posterFol=res.data
        that.setData({
          posterFol: that.data.posterFol
        })
        console.log('that.data.posterFol', that.data.posterFol)
      }
    })
  },


  //获取最近逛的吧
  getBarRec: function () {
    //获取本用户逛过的吧
    db.collection('barHistory').where({
      _openid: app.globalData.openid,
    }).orderBy('date', 'desc').get({
      success: function (res) {
        console.log(res.data)
        that.data.posterRec = res.data
        that.setData({
          posterRec: that.data.posterRec
        })
        for (var i = 0; i < res.data.length; i++) {
        that.getBarInfo(res,i)
        }
        console.log('that.data.posterRec', that.data.posterRec)
      }
    })

    //获取本用户最近逛的吧（未施工）


  },
  //获取吧信息
  getBarInfo: function (res,i) {
db.collection('bar').where({
  _id:res.data[i]._id
}).get({
  success: function (res2) {
    var bar = "bar[" + i + "]";
    that.setData({
      [bar]:res2.data
    })
    console.log(that.data.bar)
  }
})

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

  /**
        * 跳转到建吧页面
        */
  onPostCreatClick(e) {
    console.log('that.data._openid', that.data._openid)
    wx.navigateTo({
      url: '../postCreat/postCreat?_openid=' + that.data._openid,
    })
  },

  onSearch:function(e){
    wx.navigateTo({
      url: '../search/search?_openid=' + that.data._openid
    })
  }
})