// pages/enter/enter.js
const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    see:1,
    posterRec:[
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        name: '吧名',
        desc: '关注10w',
        link: '../postIndex/postIndex'
      }
    ],
    posterFol:[
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postIndex/postIndex'
      },
      {
        thumb: '../../images/bg.png',
        title: '吧名',
        desc: '关注 10w  帖子 10w',
        link: '../postIndex/postIndex'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    that.getOpenid();
  },

  getOpenid(){
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取的openid',res.result.openid)
        that.data.id=res.result.openid
        that.setData({
          id: that.data.id
        })
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
    console.log('that.data.id',that.data.id)
    wx.navigateTo({
      url: '../postCreat/postCreat?id=' + that.data.id,
    })
  },

  onSearch:function(e){
    wx.navigateTo({
      url: '../search/search?id=' + that.data.id
    })
  }
})