var wuUtils = require('../../utils/wuUtils.js');

// pages/meInfoEdit/meInfoEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'../../images/follow/thumb.jpg',
    name:'wu162',
    sex:'男',
    sign:'软件学院学生',
    age:19,
    birth:'2001-1-1',
    region:['广东省'],

    sexshow: false,
    ageshow:false,
    sexList: ['女', '男'],
    ageList:[],
    birthEnd:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ageList: wuUtils.seqNumber(0,100)
    })

    var myDate = new Date();

    this.setData({
      birthEnd: myDate.toString()
    })
  },

  change:function(e){
    switch (e.currentTarget.id) {
      case 'name':
        this.setData({
          name:e.detail
        });
        break;

      case 'sign':
        this.setData({
          sign: e.detail
        });
        break;
    }
  },

  pickerChange:function(e){
    switch (e.currentTarget.id) {
      case 'sex':
        this.setData({
          sex: (e.detail.value) == 0 ? '女' : '男',
        })
        break;
      
      case 'age':
        this.setData({
          age: e.detail.value,
        })
        break;

      case 'birth':
        this.setData({
          birth: e.detail.value,
        })
        break;

      case 'region':
        this.setData({
          region: e.detail.value,
        })
        break;
    }
  },
})