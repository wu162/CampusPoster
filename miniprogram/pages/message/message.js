// pages/message/message.js
Page({
  /**
      * @我的
      */
  onMentionsClick: function (event) {
    wx.navigateTo({
      url: '../mentions/mentions',
    })
  },

  /**
    * 点赞
    */
  onLikesClick: function (event) {
    wx.navigateTo({
      url: '../likes/likes',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    test: [{
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head:'../../images/zhang/bg.png',
      username:'Alice1',
      time: new Date(2019,7,1,6,30,0).getTime(),
      title:'帖子1',
      reply:'Alice1回复的内容,由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      beReply:'被Alice1回复的内容,由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      barname:'所属吧名',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head: '../../images/zhang/bg.png',
      username: 'Alice2',
      time: new Date(2019, 6, 26, 10, 28, 4).getTime(),
      title: '帖子2',
      reply: 'Alice2回复的内容',
      beReply: '被Alice2回复的内容',
      barname: '所属吧名',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      reply_link: '../reply/reply',
      head: '../../images/zhang/bg.png',
      username: 'Alice3',
      time: new Date(2019, 5, 28, 8, 18, 6).getTime(),
      title: '帖子3',
      reply: 'Alice3回复的内容',
      beReply: '被Alice3回复的内容',
      barname: '所属吧名',
    }],
  },
})