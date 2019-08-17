// pages/reply/reply.js
  const app = getApp()
var that
const db = wx.cloud.database();

  Page({

    /**
     * 页面的初始数据
     */
    data: {
  
      textarea:"回复",
      name:'',
      inputValue:'',
      reply:{},
      reply_in:{},
      id:'',
      openid:'',
      rid:'',
      up:0,
      length:0,
      up: {},
      up_per: {},
      sequence:'',
      reply_up:'',
      reply_isup:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
    that.setData({
      sequence: options.sequence,
      reply_up:options.up,
      reply_isup:options.isup
    })
    that.data.rid=options.rid;
    that.getData();
    that.jugdeUserLogin();
  },
  

    getData: function () {
      db.collection('reply').doc(that.data.id).get({
        success: function (res) {
          var date = res.data.date
          var t1 = new Date()
          var t = new Date(t1 - date + 16 * 3600 * 1000)
          var d = parseInt(t.getTime() / 1000 / 3600 / 24)
          var h = t.getHours()
          var m = t.getMinutes()
          if (d == 0 && h == 0 && m == 0) { res.data.changeDate = t.getSeconds().toString() + "秒前  "; }
          else if (d == 0 && h == 0) { res.data.changeDate = m.toString() + "分钟前"; }
          else if (d == 0) { res.data.changeDate = h.toString() + "小时前"; }
          else { res.data.changeDate = d.toString() + "天前  "; }
          that.setData({
            reply: res.data, 
          })
          // 获取回复信息
          console.log(that.data.reply)
          db.collection('reply_in').where({
            r_id: that.data.reply._id
          }).get({
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
                that.setData({
                  reply_in: res.data,
                  length: res.data.length
                })
              }
              for (var i = 0; i < res.data.length; i++) {
                that.getUp(res, i)
                that.getUp_per(res, i)
              }
        }
      })
          }
          
      })
        
    },
    //获取赞的情况
    getUp_per: function (res, i) {
      db.collection('up')
        .where({
          _openid: that.data.openid,
          _id: res.data[i]._id
        })
        .get({
          success: function (res2) {
            var up = "up_per[" + i + "]";
            that.setData({
              [up]: res2.data,
            })
          },
        })
    },
    //获取赞的总数
    getUp: function (res, i) {
      db.collection('up')
        .where({
          _id: res.data[i]._id
        })
        .get({
          success: function (res3) {
            var up = "up[" + i + "]";
            that.setData({
              [up]: res3.data.length,
            })
          },
        })
    },
    /**
      * 保存到发布集合中
      */
    saveDataToServer: function (event) {
      db.collection('message').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          date: new Date().getTime(),
          user: that.data.user,
          b_id: that.data.bid,
          r_id: that.data.id,
          u_id: that.data.reply._openid,
          content: that.data.inputValue,
          type: 2
        },
        success: function (res) {
          console.log("yes")
        }
      })
      db.collection('reply_in').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          date: new Date(),
          user: that.data.user,
          b_rid:that.data.bid,
          r_id: that.data.id,
          up:that.data.up,
          content: that.data.inputValue,
          changeDate:'',
          is_up:false
        },
        success: function (res) {
          wx.navigateTo({
            url: "../reply/reply?id=" + that.data.id + "&openid=" + that.data.openid + "&sequence=" + that.data.sequence + "&up=" + that.data.reply_up + "&isup=" + that.data.reply_isup
          })

        },
      })
    },
    /**
    * 获取填写的内容
    */
    bindKeyInput: function (e) {
      console.log(that.data.name)
      this.setData({
        inputValue: that.data.name+e.detail.value
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
   * 回复点击
   */

    changeTextArea: function (event){
      var rid = event.currentTarget.dataset.openid;
      that.setData({
        textarea: "回复 "+event.currentTarget.dataset.name+":",
        name: "回复 " + event.currentTarget.dataset.name + ":"
      })
     console.log(that.data.name)
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
      if (that.data.reply_in[idx].is_up) {
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
      db.collection('up').add({
        data: {
          _id: that.data.reply_in[idx]._id,
        },
        success: function (res) {
        },
      })
    },
    /**
  * 从点赞集合中移除
  */
    removeFromUpServer: function (id,idx) {
      db.collection('up').doc(that.data.reply_in[idx]._id).remove({
      });
    },
    /**
* 刷新点赞icon
*/
    refreshUpIcon(isUp, idx) {
      var reply = "reply_in[" + idx + "].is_up";
      var up = "up[" + idx + "]";
      var up_per = "up_per[" + idx + "]";
      that.setData({
        [reply]: isUp,
      })
      if (isUp) {
        that.setData({
          [up]: that.data.up[idx] + 1,
          [up_per]: "111"
        })
      }
      else {
        that.setData({
          [up]: that.data.up[idx] - 1,
          [up_per]: ''
        })
      }
    },


    /**
* Praise 点击
*/
    onReplyUpClick: function (event) {
      var id = event.currentTarget.dataset.replyid;
      console.log(id)
      if (that.data.reply_isup!=0) {
        // 需要判断是否存在
        that.removeFromReplyUpServer(id);
        that.refreshReplyUpIcon(false)
      }
      else {
        that.saveToReplyUpServer(id);
        that.refreshReplyUpIcon(true)
      }

    },
    /**
   * 添加到点赞集合中
   */
    saveToReplyUpServer: function (id) {
      db.collection('up').add({
        data: {
          _id: that.data.reply._id,
        },
        success: function (res) {
        },
      })
    },
    /**
  * 从点赞集合中移除
  */
    removeFromReplyUpServer: function (id) {
      db.collection('up').doc(that.data.reply._id).remove({
      });
    },
    /**
   * 刷新点赞icon
   */
    refreshReplyUpIcon(isUp) {
      if (isUp) {
        that.setData({
          reply_up: that.data.reply_up + 1,
          reply_isup: 1
        })
      }
      else {
        that.setData({
          reply_up: that.data.reply_up - 1,
          reply_isup: 0
        })
      }
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
  