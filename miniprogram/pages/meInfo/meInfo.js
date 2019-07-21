// pages/meInfo/meInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg:'../../images/bg.png',
    avatar:'../../images/avatar.png',
    name:'小明',
    sex:'../../images/male.png',      //0表示女，1表示男
    fans_num:3,
    follow_num:3,
    poster_num:3,
    sign:'软件学院学生',
    age:19,
    birth:'2000年1月1号',
    region:'广州'
  },

  editInfo:function(e){
    wx.navigateTo({
      url: '../meInfoEdit/meInfoEdit'
    })
  }
})