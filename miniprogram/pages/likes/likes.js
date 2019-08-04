// pages/likes/likes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageislikes:true,
    test: [{
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      head: '../../images/zhang/bg.png',
      username: 'Alice1',
      time: '15:50',
      typeisreply: true,
      myname:'zhang',
      reply: '我回复的内容由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      images: [{ src:'../../images/zhang/bg.png'}, { src:'../../images/zhang/bg.png'}, { src:'../../images/zhang/bg.png'}],
      title: '帖子1由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道',
      barname: '所属吧名1',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      head: '../../images/zhang/bg.png',
      username: 'Alice2',
      time: '昨天 15:12',
      typeisreply: false,
      myname: 'zhang',
      reply: '',
      images: [{ src: '../../images/zhang/bg.png' }, { src: '../../images/zhang/bg.png' }, { src: '../../images/zhang/bg.png' }],
      title: '帖子2',
      barname: '所属吧名2',
    },
    {
      person_link: '../meInfo/meInfo',
      postContent_link: '../postContent/postContent',
      postIndex_link: '../postIndex/postIndex',
      head: '../../images/zhang/bg.png',
      username: 'Alice3',
      time: '2000年01月01日',
      typeisreply: true,
      myname: 'zhang',
      reply: '我回复的内容',
      images: [],
      title: '帖子3',
      barname: '所属吧名2',
      }]
  },

})