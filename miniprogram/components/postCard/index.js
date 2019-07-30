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
      value: 0
    },
    name: {
      type: String,
      value: ''
    },
    time: {
      type: Number,
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

  data:{
    timeFormat:0,
    dateStr:''
  },

  lifetimes: {
    ready: function () {
      var now=new Date().getTime();
      var interval=(now-this.data.time)/3600000;
      if(interval<24)
      {
        this.setData({
          timeFormat:1
        })
      }
      else
      {
        var date=new Date(this.data.time);
        var year = date.getFullYear();
        var month =parseInt(date.getMonth())+1;
        var day = date.getDate();
        var dateStr = year+'-'+month+'-'+day;
        this.setData({
          dateStr: dateStr
        })
      }
    }
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