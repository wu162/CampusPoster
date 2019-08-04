// pages/reply/reply.js
  const app = getApp()
var that
const db = wx.cloud.database();

  Page({

    /**
     * 页面的初始数据
     */
    data: {
      isreplay:false,
      iscollect:false,
      page: 0,
      totalCount: 0,
      topics: { },
      content:'',
      list:{
      head:'',
      name:'',
      date:'',
      images:'',
      title:'',
      content:'',
      },
      test: [{
        head: '../../images/tian/head.png',
        name: '帖子作者名',
        date: '两天前',
        images: '../../images/bg.png',
        title: '标题1',
        content:'随便加的一些内容'
    },
        {
          head: '../../images/tian/head.png',
          name: '帖子作者名',
          date: '两天前',
          images: '../../images/bg.png',
          title: '标题1',
          content: '随便加的一些内容'
        },
        {
          head: '../../images/tian/head.png',
          name: '帖子作者名',
          date: '两天前',
          images: '../../images/bg.png',
          title: '标题1',
          content: '随便加的一些内容'
        },
    ],
      inputValue:'',
      reply:{},
      length:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    that = this;
    that.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

    getData: function () {
        db.collection('reply') .where({
        }).get({
            success: function (res) {
              
              for (var i = 0; i<res.data.length;i++)
            {
                var date = res.data[i].date
                var t1 = new Date()
                var t = new Date(t1 - date + 16 * 3600 * 1000)
                var d= parseInt(t.getTime() / 1000 / 3600 / 24)
                var h=t.getHours()
                var m=t.getMinutes()
                if(d==0&&h==0&&m==0)
                {res.data[i].changeDate =t.getSeconds().toString()+"秒前  ";}
                else if (d == 0 && h == 0)
                {res.data[i].changeDate = m.toString() + "分钟前";}
                else if (d == 0 )
                {res.data[i].changeDate = h.toString() + "小时前";}
                else
                {res.data[i].changeDate = d.toString() + "天前  ";}
                console.log(res.data[i].changeDate)
            }
              that.setData({
                reply: res.data,
                length:res.data.length
              })
             
            },
            fail: function (event) {
            },
             
        })
    },
    /**
      * 保存到发布集合中
      */
    saveDataToServer: function (event) {
      db.collection('reply').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          head: '../../images/tian/head.png',
          name: '帖子作者名',
          date: new Date(),
          images: '../../images/bg.png',
          title: '标题1',
          content: that.data.inputValue,
          changeDate:''
        },
        success: function (res) {
          wx.navigateTo({
            url: '../reply/reply',
          })

        },
      })
    },
    /**
    * 获取填写的内容
    */
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
      console.log(this.data.inputValue)
    },
  post:function(){
    if (that.data.inputValue.trim() != '') 
      that.saveDataToServer();
    this.setData({
      inputValue: ''
    })
    
},
  /**
   * Writer 点击
   */
  onWriterClick: function (event) {
      var id = event.currentTarget.dataset.topicid;
      wx.navigateTo({
        url: '../meInfo/meInfo',
      })
    },
  })