
var App = getApp();

Page({
  data: {
    msg:"hello mini program",

    arr:[
      {name:"mirror",age:24},
      {name:"zhangsan" , age:30}
    ],
    for_include:{
      msg:"this msg is from test.js",
      time: new Date(),
      info:"does include tag soppurt data bind? "
    },
    // 组件icon
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],

    // rich-text
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]


  },
  onShareAppMessage: function () {
    return {
      title: 'Mirror的小程序测试页面分享',
      path: '/page/user?id=123'
    }
  },
  onLoad(e){
    // console.log("App:" , App)

    console.log( "page-test:onLoad" , e)
  },
  onReady(){
    console.log( "page-test:onReady" , "     page.prototype.route:" + this.route )
  },
  onShow(){
    console.log("page-test:onShow" )
  },
  onHide(){
    console.log("page-test:onHide")
  },
  onUnload(){
    console.log("page-test:onUnload")
  },
  onTabItemTap(e){
    console.log( "page-test:onTabItemTap" , e )
  },
  changeName(){
    console.log( "changeName:" )
    this.setData({msg:this.data.msg.split("").reverse().join("")})
  },
  onPullDownRefresh(){
    console.log( "onPullDownRefresh:");
    setTimeout(function () { wx.stopPullDownRefresh()},1000)
  },
  handleTouch1(e){
    // console.log(e)
  },
  handleTouchMove1(e){
    console.log(e)
  },
  handleTouchEnd1(e){
    // console.log(e)
  },
  tab_temp(){
    console.log("tempalte be taped")
  } , 

  rich_text_tab(){
      console.log('tap')
  }
})

