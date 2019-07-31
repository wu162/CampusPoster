Component({
  properties: {
    person_link: {
      type: String,
      value: ''
    },
    postContent_link: {
      type: String,
      value: ''
    },
    postIndex_link: {
      type: String,
      value: ''
    },
    reply_link: {
      type: String,
      value: ''
    },
    head: {
      type: String,
      value: ''
    },
    username: {
      type: String,
      value: ''
    },
    myname: {
      type: String,
      value: ''
    },
    time: {
      type: Number,
      value: ''
    },
    pageislikes: {
      type: Boolean,
      value: false
    },
    typeisreply: {
      type:Boolean,
      value:false
    },
    title: {
      type: String,
      value: ''
    },
    reply: {
      type: String,
      value: ''
    },
    beReply: {
      type: String,
      value: ''
    },
    barname: {
      type: String,
      value: ''
    },
    images: {
      type: Array,
      value: []
    },
    icon: {
      type: Array,
      value: []
    },
  },

  data: {
    timeFormat: 0,
    dateStr: ''
  },

  lifetimes: {
    ready: function () {
      var now = new Date().getTime();
      var interval = (now - this.data.time) / 3600000;
      if (interval < 24) {
        this.setData({
          timeFormat: 1
        })
      }
      else {
        var date = new Date(this.data.time);
        var year = date.getFullYear();
        var month = parseInt(date.getMonth()) + 1;
        var day = date.getDate();
        var dateStr = year + '-' + month + '-' + day;
        this.setData({
          dateStr: dateStr
        })
      }
    }
  },

  methods: {
    /**
          * 跳转到头像用户个人页面
          */
    onPersonClick(e) {
      wx.navigateTo({
        url: this.data.person_link
      })
    },

    /**
        * 跳转到消息帖子页面
        */
    onPostContentClick(e) {
      wx.navigateTo({
        url: this.data.postContent_link
      })
    },

    /**
          * 跳转到贴吧页面
          */
    onPostIndexClick(e) {
      wx.navigateTo({
        url: this.data.postIndex_link
      })
    },

    /**
          * 跳转到回复页面
          */
    onReplyClick(e) {
      wx.navigateTo({
        url: this.data.reply_link
      })
    },


  },
})