// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../../config');

let reportId = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    gender: 1,
    age: 0,
    checkupDate: '',
    checkupAddr: '',
    summary: '',
    abnormalNum: '',
    abnormalGroupList: []
  },
  // 跳转到报告详情页
  onDetailsPage: function () {
    wx.navigateTo({
      url: `/pages/report/report-details/report-details?reportid=${reportId}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    reportId = options.reportid;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    qcloud.request({
      url: `${config.service.prefixUrl}weapp/report/${reportId}`,
      login: true,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        const dataAll = res.data.data;
        let arrLength = 0;
        for (let i = 0; i < dataAll.abnormalGroupList.length; i++) {
          const item = dataAll.abnormalGroupList[i];
          arrLength += item.reportResultsList.length;
        }
        console.log(arrLength);
        that.setData({
          name: dataAll.name,
          gender: dataAll.gender,
          age: dataAll.age,
          checkupDate: dataAll.checkupDate,
          checkupAddr: dataAll.checkupAddr,
          summary: dataAll.summary,
          abnormalNum: arrLength,
          abnormalGroupList: dataAll.abnormalGroupList
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  }
});