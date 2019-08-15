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
    page: 0,
    totalCount: 0,
    topics: {},
    content:'',
    inputValue:'',
    id:'',
    openid: "oDgOl5Bl4zo2lBHrQYrQqgWtm1go",
    reply: {},
    reply_in:{},
    up:{},
    up_per:{},
    barid:'',
    test:
      [{
        head: '../../images/bg.png',
        name: '帖子作者名',
        date: '两天前',
        images: '../../images/bg.png',
        title: '标题1',
        content: '随便加的一些内容'
      }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.data.id = options.id;
   // that.data.openid = options.openid;
    that.data.barid=options.barid;
    // 获取话题信息
    db.collection('topic').doc(that.data.id).get({
      success: function (res) {
        that.topic = res.data;
        that.setData({
          topic: that.topic,
        })
      }
    })
    that.getData();
    that.jugdeUserLogin();
  },

  getData: function () {
    var j = 0
    var k = 0
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

        }
        that.setData({
          reply: res.data,
          length: res.data.length
        })
        for (var i = 0; i < res.data.length; i++) {
         that.getReply_in(res,i);
         that.getUp(res,i)
         that.getUp_per(res,i)
          
    }
    
      }

    })
  
  },

  //获取内层回复
getReply_in:function(res,i){
  var up = "reply_in[" + i + "]";
  db.collection('reply_in').where({
    r_id: res.data[i]._id
  }).get({
    success: function (res2) {
      that.setData({
        [up]: res2.data,
      })
    },
  })
},
//获取赞的情况
getUp_per:function(res,i){
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
    db.collection('reply').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        date: new Date(),
        user: that.data.user,
        b_rid: that.data.bid,
        r_id: that.data.id,
        up: that.data.up,
        content: that.data.inputValue,
        changeDate: '',
        is_up: false
      },
      success: function (res) {
        wx.navigateTo({
          url: "../postContent/postContent?id=" + that.data.id + "&openid=" + that.data.openid
        })

      },
    })
  },
  /**
   * Writer 点击
   */
  onWriterClick: function (event) {
    var id = event.currentTarget.dataset.userid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: "../meInfo/meInfo?id=" + id + "&openid=" + openid,
    })
  },
  /**
 * reply 点击
 */
  onReplyPageClick: function (event) {
    var id = event.currentTarget.dataset.replyid;
    var openid = event.currentTarget.dataset.openid;
    var sequence = event.currentTarget.dataset.idx+2;
    console.log(sequence)
      wx.navigateTo({
        url: "../reply/reply?id=" + id + "&openid=" + openid + "&sequence=" + sequence
    })
  },
  /**
  * bar 点击
  */
  onBarClick: function (event) {
    var id = event.currentTarget.dataset.barid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: "../postIndex/postIndex?id=" + id + "&openid=" + openid
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
        _id: that.data.id,
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
    db.collection('collect').doc(that.data.id).remove({

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