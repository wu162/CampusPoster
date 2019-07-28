Component({
  properties: {
    thumb: {
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
    link: {
      type: String,
      value: ''
    }
  },

  methods: {
    onclick(e) {
      wx.navigateTo({
        url: this.data.link
      })
    }
  },
})