Component({
  properties: {
    thumb: {
      type: String,
      value: ''
    },
    thumb_link: {
      type: String,
      value: ''
    },
    title: {
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
    }
  },
})