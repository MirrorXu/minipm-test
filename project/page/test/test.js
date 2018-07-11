Page({
  data: {
    msg:"hello mini program"
  },
  changeName(){
    console.log( "changeName:" )
    this.setData({msg:this.data.msg.split("").reverse().join("")})
  },
  onPullDownRefresh(){
    console.log( "onPullDownRefresh:");
    setTimeout(function () { wx.stopPullDownRefresh()},1000)
  }
})

