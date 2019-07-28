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
    content_link: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    thumbs:{
      type: Array,
      value: []
    },
    icon:{
      type: Array,
      value: []
    },
    desc: {
      type: Array,
      value: []
    },
  },

  methods: {
    onthumb(e) {
      wx.navigateTo({
        url: this.data.thumb_link
      })
    },

    onContent(e){
      wx.navigateTo({
        url: this.data.content_link
      })
    }
  },
})