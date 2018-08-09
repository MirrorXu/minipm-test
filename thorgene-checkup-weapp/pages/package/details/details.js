Page({

  /**
   * 页面的初始数据
   */
  data: {
    packageId: '',
    details: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      packageId: options.packageid,
      details: JSON.parse(options.details)
    });
    console.log(this.data.packageId);
    console.log(this.data.details);
    wx.setNavigationBarTitle({
      title: '套餐详情'
    });
  }
});