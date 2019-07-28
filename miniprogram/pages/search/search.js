// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    history:[
      '查询历史1',
      '查询历史2',
      '查询历史3',
      '查询历史4'
    ],
    tags:[
      '贴吧热搜',
      '贴吧热搜',
      '贴吧热搜',
      '贴吧热搜',
      '贴吧热搜',
      '贴吧热搜'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onDelete:function(e){
    var index=e.currentTarget.dataset.index;
    var history=this.data.history;
    var newhistory=history.slice(0, index).concat(history.slice(index+1,history.length));
    this.setData({
      history: newhistory
    })
  },

  onHistory:function(e){
    this.setData({
      searchValue:e.currentTarget.dataset.value,
      focus:true
    })
    console.log(e.currentTarget.dataset.value)
  },

  onCancel:function(e){
    wx.navigateBack({
      delta: 1
    })
  }
})