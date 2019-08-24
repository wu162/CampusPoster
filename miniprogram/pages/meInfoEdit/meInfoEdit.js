var wuUtils = require('../../utils/wuUtils.js');
const app = getApp()
var that
const db = wx.cloud.database();
// pages/meInfoEdit/meInfoEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    _openid: '',
    avatar:'',
    name:'',
    sex: 0,
    sign:'',
    age:0,
    year: 0,
    month: 0,
    day: 0,
    region:[],
    
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
    that=this
    that.data._id = options._id
    that.data._openid=options._openid
    that.data.avatar = options.avatar
    that.data.name = options.name
    that.data.sex = options.sex
    that.data.sign=options.sign
    that.data.age=options.age
    that.data.year=options.year
    that.data.month = options.month
    that.data.day = options.day
    that.data.region=options.region
    console.log('options._openid', options._openid)
    console.log('options.avatar', options.avatar)
    console.log('options.name', options.name)
    console.log('options.sex', options.sex)
    console.log('options.sign', options.sign)
    console.log('options.age', options.age)
    console.log('options.year', options.year)
    console.log('options.month', options.month)
    console.log('options.day', options.day)
    console.log('options.region', options.region)

    that.setData({
      ageList: wuUtils.seqNumber(0,100),
      _id: that.data._id,
      _openid: that.data._openid,
      avatar: that.data.avatar,
      name: that.data.name,
      sex: that.data.sex,
      sign: that.data.sign,
      age: that.data.age,
      year: that.data.year,
      month: that.data.month,
      day: that.data.day,
      region: that.data.region,
    })

    var myDate = new Date();

    that.setData({
      birthEnd: myDate.toString()
    })
  },

  change:function(e){
    switch (e.currentTarget.id) {
      // case 'name':
      //   this.setData({
      //     name:e.detail
      //   });
      //   break;

      case 'sign':
        that.data.sign = e.detail
        that.setData({
          sign: that.data.sign
        });
        break;
    }
  },

  pickerChange:function(e){
    switch (e.currentTarget.id) {
      // case 'sex':
      //   this.setData({
      //     sex: (e.detail.value) == 0 ? '女' : '男',
      //   })
      //   break;
      
      case 'age':
        that.data.age = e.detail.value
        that.setData({
          age: that.data.age,
        })
        break;

      case 'birth':
        console.log('e.detail.value', e.detail.value)
        var num = e.detail.value.replace(/[^0-9]/ig, "")
        that.data.year = parseInt(num / 10000)
        that.data.month = (num % 10000 - num % 100) / 100
        that.data.day = num % 100
        console.log('num', num)
        console.log('parseInt(num/10000)', parseInt(num / 10000))               
        console.log('(num%10000-num%100)/100', (num % 10000 - num % 100)/100)
        console.log('num%100', num % 100)
        that.setData({
          year: that.data.year,
          month: that.data.month,
          day: that.data.day,
        })
        break;

      case 'region':
        console.log('region', e.detail.value)
        that.data.region = e.detail.value
        that.setData({
          region: that.data.region,
        })
        break;
    }
  },


  /**
   * 保存到发布集合中
   */
  saveDataToServer: function (event) {
    db.collection('user').doc(that.data._id)
      .update({
      // data 字段表示需新增的 JSON 数据
      data: {
        sign: that.data.sign,
        age: that.data.age,
        birth: { year: that.data.year, month: that.data.month, day: that.data.day },
        region: that.data.region,
      },
      success: function (res) {
        // // 清空数据
        // that.data.title = "";
        // that.data.content = "";
        // that.data.images = [];
        // that.setData({
        //   titleContent: '',
        //   textContent: '',
        //   images: [],
        // })

        that.showTipAndSwitchTab();

      },
    })
  },

  /**
   * 添加成功修改提示，切换页面
   */
  showTipAndSwitchTab: function (event) {
    wx.showToast({
      title: '修改成功',
    })
    wx.navigateBack({
      delta: 1
    })
  },

})