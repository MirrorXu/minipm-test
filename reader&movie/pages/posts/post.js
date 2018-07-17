const list = require('../../data/posts-data.js').postList;

Page({
  data:{
    swiperImgs:[
      "../../images/swiper/iqiyi.png",
      "../../images/swiper/vr.png",
      "../../images/swiper/wx.png"
    ],
    news:[]
  },
  onLoad(){
    this.setData({news:list})
    console.log(this.data.news)
  },
  linkTo(e){
    // console.log(e);
    let id = e.currentTarget.dataset.newsId;
    // console.log(id)
    wx.navigateTo({
      url:"post-detail/post-detail?id=" + id,
    })
  }
})