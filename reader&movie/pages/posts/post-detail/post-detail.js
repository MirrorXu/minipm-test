const newsDetail = require('../../../data/posts-data.js').postList;
Page({
  data: {
    news: {},
    newsId: undefined
  },
  onLoad(e) {
    const newsId = e.id;
    this.setData({
      newsId: e.id
    })

    let news = newsDetail.filter(function(v) {
      return e.id === String(v.postId);
    })
    this.setData({
      news: news[0]
    })
    // console.log(this.data.news);

    var collection = wx.getStorageSync("collection");
    if (collection) {
      this.setData({
        collected: collection[newsId]
      })
    } else {
      let collection = {};
      collection[newsId] = false;
      wx.setStorageSync("collection", collection)
    }

    let share = wx.getStorageSync("share");
    if (share) {
      this.setData({
        shared: share[newsId]
      })
    } else {
      let share = {};
      share[newsId] = false;
      wx.setStorageSync("share", share )
    }


  },
  onColletTap(e) {
    const newsId = this.data.newsId;
    this.setData({
      collected: !this.data.collected
    });

    const collection = wx.getStorageSync("collection");
    collection[this.data.newsId] = this.data.collected;

    wx.setStorageSync("collection", collection);

  },
  onShareTap(e){
    const newsId = this.data.newsId;
    this.setData({
      shared: !this.data.shared
    });

    let collection = wx.getStorageSync("share");
    collection[this.data.newsId] = this.data.shared;

    wx.setStorageSync("share", collection ) ;
  }

})