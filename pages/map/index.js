let buildlData = require('../../resources/school')
Page({
  data: {
    fullscreen: false,
    latitude: 22.97,
    longitude: 113.75,
    markers: buildlData,
    windowHeight:"",
    windowWidth:"",
    controls: []
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log("e.markerId", e.markerId)
  },
  controltap(e) {
    if (e.controlId == -1){
      wx.navigateTo({
        url: 'search'
      })
    } else if (e.controlId == -2) {
      var _this = this
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function (res) {
          console.log(res)
          _this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
        }
      　})
    }
    console.log("e.controlId", e.controlId)
  },
  clickButton: function (e) {
    console.log(this.data.fullscreen)
    //打印所有关于点击对象的信息
    this.setData({ fullscreen: !this.data.fullscreen })  
    if (this.data.fullscreen){
      this.setControls(this.data.windowWidth, this.data.windowHeight -35)
    }else{
      this.setControls(this.data.windowWidth, this.data.windowHeight /2)
    }
  },

  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
        _this.setControls(res.windowWidth, res.windowHeight / 2)
        console.log(res.windowWidth)
      }
    })
  },
  // 修改控键位置
  setControls: function (width, height) {
    this.setData({
      controls: [{
        id: -1,
        iconPath: '/img/search.svg',
        position: {
          left: width - 50,
          top: height  - 90,
          width: 40,
          height: 40
        },
        clickable: true
      }, {
        id: -2,
        iconPath: '/img/location1.svg',
        position: {
          left: width - 50,
          top: height - 50,
          width: 40,
          height: 40
        },
        clickable: true
      }]
    })
    
  }
})