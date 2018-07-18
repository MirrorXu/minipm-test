Page({
  linkTo(){
    console.log( " Page: welcome --- LinkTo" )
    wx.switchTab({
      url: '/pages/posts/post',
    })

    // wx.navigateTo({
    //   url: '/pages/posts/post',
    // })
  } 
})