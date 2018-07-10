var app = getApp()
Page({
  data:{ grids: [] },
  onLoad:function(options){

  },
  onReady:function(){
    var that=this ;
    that.setData({ grids: require('../../libs/allmenu').iMenu('customer')}) 
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})