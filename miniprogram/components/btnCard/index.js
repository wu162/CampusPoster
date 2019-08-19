Component({
  properties: {
    thumb: {                //头像（用到了）
      type: String,
      value: ''
    },
    thumb_link: {
      type: String,
      value: ''
    },
    title: {                //吧名（用到了）
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    btn_text_unpressed:{
      type: String,
      value: ''
    },
    btn_text_pressed: {
      type: String,
      value: ''
    },
    btn_state:{           //0没按下，1按下了
      type:Number,
      value:0
    },
    hidden:{
      type: Boolean,
      value: false
    },
    card_link: {
      type: String,
      value: ''
    },
    b_id: {                     //吧id（用到了）
      type: String,
      value: ''
    },
    _openid: {                  //本用户_openid（用到了）
      type: String,
      value: ''
    }
  },

  data:{
    btnText:''
  },

  lifetimes:{
    ready: function () {
      this.setData({
        btnText: this.data.btn_state == 0 ? this.data.btn_text_unpressed : this.data.btn_text_pressed
      })
    }
  },

  methods:{
    btnpressed(){
      this.setData({
        btn_state : this.data.btn_state == 0 ? 1 : 0,
        btnText: this.data.btn_state == 1 ? this.data.btn_text_unpressed : this.data.btn_text_pressed
      })
    },

    onthumb (e) {
      wx.navigateTo({
        url: this.data.thumb_link
      })
    },

    onCard(e){
      wx.navigateTo({
        url: '../postIndex/postIndex?b_id=' + this.data.b_id + '&_openid=' + this.data._openid
      })
    }
  },
})