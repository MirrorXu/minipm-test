
const config = require('../../api/api.js')

Page({
  data:{
    movies:{
      hot:undefined,
      top250:undefined,
      comming:undefined
    }
  },
  onLoad(){

    for(let key in config.apis){
      this.getAndSetData( config.apis[key] , key  )
    }

    

  },
  getAndSetData(url , key ){
    const that = this;

    wx.request({
      url: url,
      dataType: "json",
      header: {
        'content-type': "*"
      },
      success(res) {
        // console.log("success:", res.data);
        that.data.movies[key] = res.data;
        that.setData({movies :that.data.movies})
      },
      fail(err) {
        console.log("fail:", err)
      },
      complete() {
        console.log("completed:", that.data.movies[key])
      }

    })




  }
  
})