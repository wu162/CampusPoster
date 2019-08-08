// pages/reply/reply.js
  const app = getApp()
var that
const db = wx.cloud.database();

  Page({

    /**
     * 页面的初始数据
     */
    data: {
  
      test: [{
        head: '../../images/tian/head.png',
        name: '帖子作者名',
        date: '两天前',
        images: '../../images/bg.png',
        title: '标题1',
        content:'随便加的一些内容'
    },
    ],
      inputValue:'',
      reply:{},
      reply_in:{},
      id:'',
      openid:'',
      rid:'',
      up:0,
      length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
    that.data.rid=options.rid;
    that.getData();
    that.jugdeUserLogin();
  },

    getData: function () {

      // 获取回复信息
      db.collection('reply').get({
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var date = res.data[i].date
            var t1 = new Date()
            var t = new Date(t1 - date + 16 * 3600 * 1000)
            var d = parseInt(t.getTime() / 1000 / 3600 / 24)
            var h = t.getHours()
            var m = t.getMinutes()
            if (d == 0 && h == 0 && m == 0) { res.data[i].changeDate = t.getSeconds().toString() + "秒前  "; }
            else if (d == 0 && h == 0) { res.data[i].changeDate = m.toString() + "分钟前"; }
            else if (d == 0) { res.data[i].changeDate = h.toString() + "小时前"; }
            else { res.data[i].changeDate = d.toString() + "天前  "; }
//获取赞的情况
            var up = "up[" + i + "]";
            db.collection('up')
              .where({
                _openid: that.data.openid,
                r_id: res.data[i]._id
              })
              .get({
                success: function (res2) {
                  if (res2.data.length > 0)
                  res.data[i].is_up=true
                },
              })
            db.collection('up')
              .where({
                r_id: res.data[i]._id
              })
              .get({
                success: function (res3) {
                  res.data[i].up = res3.data.length
                },
              })
          }
          
          that.setData({
            reply: res.data,
            length: res.data.length
          })
         
        }
      })
        db.collection('reply_in') .where({
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
            }
              that.setData({
                reply_in: res.data,
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
          date: new Date(),
          user: that.data.user,
          b_rid:that.data.bid,
          r_id: that.data.id,
          u_id: that.data.openid,
          up:that.data.up,
          content: that.data.inputValue,
          changeDate:'',
          is_up:false
        },
        success: function (res) {
          wx.navigateTo({
            url: "../reply/reply?id=" + that.data.id + "&openid=" + that.data.openid
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
    /**
  * Praise 点击
  */
    onUpClick: function (event) {
      var id = event.currentTarget.dataset.replyid;
      var idx = event.currentTarget.dataset.idx;
      if (that.data.reply[idx].is_up) {
        // 需要判断是否存在
        that.removeFromUpServer(id,idx);
        that.refreshUpIcon(false,idx)
      } else {
        that.saveToUpServer(id,idx);
        that.refreshUpIcon(true,idx)
      }

    },
    /**
   * 添加到点赞集合中
   */
    saveToUpServer: function (id,idx) {
      console.log(idx)
      console.log(that.data.reply[idx]._id)
      db.collection('up').add({
        data: {
          r_id: that.data.reply[idx]._id,
        },
        success: function (res) {
        },
      })
    },
    /**
  * 从点赞集合中移除
  */
    removeFromUpServer: function (id,idx) {
      db.collection('up').where({
        r_id: that.data.reply[idx].id,
        _openid:that.data.openid
      }).remove({

      });
    },
    /**
   * 刷新点赞icon
   */
    refreshUpIcon(isUp,idx) {
      var up = "reply[" + idx + "].is_up";
      that.setData({
       [up]: isUp,
      })
    },
    /**
      * 判断用户是否登录
      */
    jugdeUserLogin: function (event) {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                that.data.user = res.userInfo;
              }
            })
          }
        }
      })
    },
  })
  