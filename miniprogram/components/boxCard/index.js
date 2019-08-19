Component({
  properties: {
    thumb: {                //头像（有用到）
      type: String,
      value: ''
    },
    title: {                //吧名(有用到)
      type: String,
      value: ''
    },
    _openid: {               //本用户的_openid(有用到)
      type: String,
      value: ''
    },
    b_id: {                   //吧id(有用到)
      type: String,
      value:''
    },
    desc: {
      type: String,
      value: ''
    },
    link: {
      type: String,
      value: ''
    }
  },

  methods: {
    onclick(e) {
      wx.navigateTo({
        url: '../postIndex/postIndex?b_id=' + this.data.b_id + '&_openid=' + this.data._openid
      })
    }
  },
})