const app = getApp()
var that
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isreply:false,
    iscollect:false,
    isup:false,
    topicUp:0,
    page: 0,
    totalCount: 0,
    topics: {},
    content:'',
    inputValue:'',
    t_id:'',
    reply: {},
    reply_in:{},
    up:{},
    up_per:{},
    b_id:'',
    bar:{},
    length:0,
    length2:0,
    comment_length:0,
    isfan:"关注",
    _openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.data.t_id = options.t_id;
   that.data._openid = app.globalData.openId
    console.log(that.data._openid)
    that.data.b_id=options.b_id;
    that.saveTobrowseHistory();
    // 获取收藏情况
    db.collection('collect')
      .where({
        _openid: that.data._openid,
        _id: that.data.t_id

      })
      .get({
        success: function (res) {
          if (res.data.length > 0) {
            that.refreshLikeIcon(true)
          } else {
            that.refreshLikeIcon(false)
          }
        },
        fail: console.error
      })
    // 获取点赞情况
    db.collection('up')
      .where({
        _openid: that.data._openid,
        _id: that.data.t_id
      })
      .get({
        success: function (res) {
          if (res.data.length > 0) {
            that.refreshTopicUpIcon(true)
          } else {
            that.refreshTopicUpIcon(false)
          }
        },
        fail: console.error
      })
    // 获取点赞总数
    db.collection('up')
      .where({
        _id: that.data.t_id
      })
      .get({
        success: function (res) {
          that.setData({
            topicUp:res.data.length
          })
        },
        fail: console.error
      })
    // 获取话题信息
    db.collection('topic').doc(that.data.t_id).get({
      
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
          topic: res.data,
        })
        //获取关注信息
        db.collection('fan').where({
         _id:res.data._openid,
         _openid:that.data._openid
          }).get({
            success: function (res2) {
              if(res2.data.length>0)
              that.refreshFanIcon(true)
              else
              that.refreshFanIcon(false)
            }
          })
      }
    })   // 获取话题信息
    db.collection('bar').doc(that.data.b_id).get({
      success: function (res) {
        that.setData({
          bar: res.data,
        })
      }
    })
    that.getData();
    that.jugdeUserLogin();
  },
  saveTobrowseHistory: function () {
    db.collection('browseHistory').where({
      _openid: that.data._openid,
      _id: that.data.t_id
    }).get({
      success: function (res) {
        if (res.data.length == 0)
          that.addTobrowseHistory();
        else {
          that.removeTobrowseHistory();
        }
      }
    })

  },

  addTobrowseHistory: function () {
    db.collection('browseHistory').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.t_id,
        date: new Date().toLocaleTimeString()
      },
      success: function (res) {
      }
    })
  },
  removeTobrowseHistory: function () {
    db.collection('browseHistory').doc(that.data.t_id).remove({
    });
    db.collection('browseHistory').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.t_id,
        date: new Date().toLocaleTimeString(),
        b_id:that.data.b_id
      },
      success: function (res) {
      }
    })
  },
  getData: function () {
    var j = 0
    var k = 0
    // 获取回复信息
    db.collection('reply').where({
      r_id: that.data.t_id
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

        }
        that.setData({
          reply: res.data,
          length: res.data.length
        })
        for (var i = 0; i < res.data.length; i++) {
          if (i == res.data.length-1)
         {
           that.getReply_in(res,i,true);
         }
         else
         {
          that.getReply_in(res, i,false);
         }
         that.getUp(res,i)
         that.getUp_per(res,i)
      
    }
    
      }

    })
  
  },

  //获取内层回复
getReply_in:function(res,i,last){
  var up = "reply_in[" + i + "]";
  db.collection('reply_in').where({
    r_id: res.data[i]._id
  }).get({
    success: function (res2) {
      console.log(that.data.length2)
      if(last)
      that.setData({
        [up]: res2.data,
        length:that.data.length+res2.data.length,
        comment_length:that.data.length
      })
      else
        that.setData({
          [up]: res2.data,
          length: that.data.length + res2.data.length,
        })
        console.log(that.data.length)
    },
  })
},

//获取赞的情况
getUp_per:function(res,i){
  db.collection('up')
    .where({
      _openid: that.data._openid,
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
        t_id: that.data.t_id,
        u_id:that.data.topic._openid,
        content: that.data.inputValue,
        type:1
      },
      success: function (res) {
      console.log("yes")
      }
    })
    db.collection('reply').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        date: new Date(),
        user: that.data.user,
        b_id: that.data.bid,
        r_id: that.data.t_id,
        content: that.data.inputValue,
        changeDate: '',
      },
      success: function (res) {
        wx.navigateTo({
          url: "../postContent/postContent?t_id=" + that.data.t_id + "&openid=" + that.data._openid
        })

      },
    })
  },
  /**
   * Writer 点击
   */
  onWriterClick: function (event) {
    var u_id = event.currentTarget.dataset.openid;
    var openid = app.globalData.openId;
    wx.navigateTo({
      url: "../meInfo/meInfo?u_id=" + u_id + "&openid=" + openid,
    })
  },
  /**
 * reply 点击
 */
  onReplyPageClick: function (event) {
    var id = event.currentTarget.dataset.replyid;
    var openid = event.currentTarget.dataset._openid;
    var sequence = event.currentTarget.dataset.idx+2;
    var up = event.currentTarget.dataset.up;
    var isup = event.currentTarget.dataset.isup;
    console.log(up)
    console.log(isup)
      wx.navigateTo({
        url: "../reply/reply?id=" + id + "&openid=" + openid + "&sequence=" + sequence + "&up=" + up + "&isup=" + isup
      })
  },
  /**
  * bar 点击
  */
  onBarClick: function (event) {
    var b_id = event.currentTarget.dataset.b_id;
    var openid = event.currentTarget.dataset._openid;
    wx.navigateTo({
      url: "../postIndex/postIndex?b_id=" + b_id + "&openid=" + openid
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log('pulldown');
    that.getData(that.data.page);
  },

  
  onReplyClick :function (event)
  {
    if (!that.data.isreply) 
    that.setData({
      isreply :true
    })
      
  },
  
  onExitReplyClick: function (event) {
    if (that.data.isreply)
      that.setData({
        isreply: false
      })
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.previewImage({
      //当前显示图片
      current: that.data.test[0].images[index],
      //所有图片
      urls: that.data.test[0].images
    })
  },
  //帖子点赞
  onTopicUpClick: function (event) {
    if (that.data.isup) {
      // 需要判断是否存在
      that.removeFromTopicUpServer();
    } else {
      that.saveToTopicUpServer();
    }
  },
  //点击收藏
  onCollectClick: function (event) {
    if (that.data.iscollect) {
      // 需要判断是否存在
      that.removeFromCollectServer();
    } else {
      that.saveToCollectServer();
    }
  },
  /**
   * 添加到收藏集合中
   */
  saveToCollectServer: function (event) {
    db.collection('collect').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.t_id,
      },
      success: function (res) {
        that.refreshLikeIcon(true)
      },
    })
  },

  /**
   * 从收藏集合中移除
   */
  removeFromCollectServer: function (event) {
    db.collection('collect').doc(that.data.t_id).remove({

      success: that.refreshLikeIcon(false),
    });
  },
  /**
 * 刷新收藏icon
 */
  refreshLikeIcon(iscollect) {
    that.data.iscollect = iscollect
    that.setData({
      iscollect: iscollect,
    })
  },

  /**
 * 添加到点赞集合中
 */
  saveToTopicUpServer: function (event) {
    db.collection('up').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: that.data.t_id,
      },
      success: function (res) {
        that.refreshTopicUpIcon(true)
      },
    })
  },
  /**
 * 从点赞集合中移除
 */
  removeFromTopicUpServer: function (event) {
    db.collection('up').doc(that.data.t_id).remove({
      success: that.refreshTopicUpIcon(false),
    });
  },
  /**
 * 刷新点赞icon
 */
  refreshTopicUpIcon(isup) {
    that.data.isup = isup
    that.setData({
      isup: isup,
    })
    if(isup)
    that.setData({
      topicUp:that.data.topicUp+1
    })
    else
      that.setData({
        topicUp: that.data.topicUp - 1
      })
  },
  // 回到顶部
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
  post: function () {
    if (that.data.inputValue.trim() != '')
      that.saveDataToServer();
    this.setData({
      inputValue: ''
    })

  },
  /**
* Praise 点击
*/
  onUpClick: function (event) {
    var id = event.currentTarget.dataset.replyid;
    var idx = event.currentTarget.dataset.idx;
    console.log(that.data.up_per[idx])
    if (that.data.up_per[idx].length>0)
    {
      // 需要判断是否存在
      that.removeFromUpServer(id, idx);
      that.refreshUpIcon(false, idx)
    } 
    else {
      that.saveToUpServer(id, idx);
      that.refreshUpIcon(true, idx)
    }

  },
  
  /**
 * 添加到点赞集合中
 */
  saveToUpServer: function (id, idx) {
    db.collection('up').add({
      data: {
        _id: that.data.reply[idx]._id,
      },
      success: function (res) {
      },
    })
  },
  /**
* 从点赞集合中移除
*/
  removeFromUpServer: function (id, idx) {
    db.collection('up').doc(that.data.reply[idx]._id).remove({
    });
  },
  /**
 * 刷新点赞icon
 */
  refreshUpIcon(isUp, idx) {
    var reply = "reply[" + idx + "].is_up";
    var up = "up[" + idx + "]";
    var up_per = "up_per[" + idx + "]";
    that.setData({
      [reply]: isUp,
    })
    if(isUp)
    {
      that.setData({
      [up]:that.data.up[idx]+1,
      [up_per]:"111"
      })
    }
    else{
      that.setData({
        [up]: that.data.up[idx] - 1,
        [up_per]: ''
      })
    }
  },
  //关注
  onFollowClick:function(event){
    console.log("?")
    var u_id = event.currentTarget.dataset.u_id;
    if (that.data.isfan=="已关注") {
      // 需要判断是否存在
      that.removeFromFanServer(u_id);
      that.refreshFanIcon(false)
    }
    else {
      that.saveToFanServer(u_id);
      that.refreshFanIcon(true)
    }

  },
  /**
 * 添加到粉丝集合中
 */
  saveToFanServer: function (u_id) {
    db.collection('fan').add({
      data: {
        _id: u_id
      },
      success: function (res) {
      },
    })
  },
  /**
* 从粉丝集合中移除
*/
  removeFromFanServer: function (u_id) {
    db.collection('fan').doc(u_id).remove({
    });
  },
  /**
 * 刷新关注按钮
 */
  refreshFanIcon(isfan) {
if(isfan)
that.setData({
  isfan:"已关注"
})
else
that.setData({
  isfan:"关注"
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