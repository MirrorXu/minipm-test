Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId: ''
  },

  onSubmit: function () {
    console.log('appointmentId =', this.data.appointmentId);
    wx.reLaunch({
      url: `/pages/personal/personal?appointmentid=${this.data.appointmentId}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { appointmentid } = options;
    this.setData({
      appointmentId: appointmentid
    });
  }
});