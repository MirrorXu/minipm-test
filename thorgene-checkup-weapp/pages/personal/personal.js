// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../config');

let globalppointmentId = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    promptShow: false,
    loadingHidden: false,
    userPhone: '',
    nameHas: true,
    userName: '',
    dataList: []
  },
  // 切换手机号
  onPhoneTab: function () {
    wx.navigateTo({
      url: '/pages/phone/phone'
    });
  },
  // 体检须知弹窗显示
  onPromptShow: function (event) {
    const { idx } = event.currentTarget.dataset;
    globalppointmentId = this.data.dataList[idx].appointmentId;
    this.setData({
      promptShow: true,
      alreadySend: true
    });
  },
  onClosePrompt: function () {
    this.setData({
      promptShow: false
    });
  },
  onSubmit: function () {
    this.setData({
      promptShow: false
    });
    wx.navigateTo({
      url: `/pages/package/package?appointmentid=${globalppointmentId}`
    });
  },
  // 时间戳转日期格式
  formatDateTime: function (inputTime) {
    const date = new Date(inputTime);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? (`0${m}`) : m;
    let d = date.getDate();
    d = d < 10 ? (`0${d}`) : d;
    return `${y}.${m}.${d}`;
  },
  // 查看报告
  openDocument: function (event) {
    const { reportid } = event.currentTarget.dataset;
    if (!reportid) {
      wx.showToast({
        title: '报告获取失败，请联系客服',
        icon: 'none',
        duration: 3000
      });
    } else {
      wx.navigateTo({
        url: `/pages/report/report-conclusion/report-conclusion?reportid=${reportid}`
      });
    }
  },
  // 查看地图
  onMapPage: function (e) {
    const { longitude, latitude, name } = e.currentTarget.dataset;
    console.log(longitude, latitude);
    wx.openLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      name: name,
      scale: 14
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    qcloud.request({
      // 要请求的地址
      data: {},
      url: `${config.service.prefixUrl}/appointment`,
      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,
      success: function (result) {
        console.log('【page personal】request success', result);
        const resData = result.data.data;
        const resDataList = result.data.data.list;
        if (!resData.phone) {
          console.log(resData.phone);
          console.log('【page personal】: 未获取到用户手机号码，即将跳转到 start 页面')
          wx.redirectTo({
            url: '/pages/start/start'
          });
          return;
        }
        if (resData.name !== null) { // 判断姓名和昵称切换展示
          that.setData({
            nameHas: false,
            userName: resData.name,
            userPhone: resData.phone
          });
        } else {
          that.setData({
            nameHas: true,
            userPhone: resData.phone
          });
        }
        const list = [];
        for (let i = 0; i < resDataList.length; i++) {
          const resDataListItem = resDataList[i];
          const item = {
            appointmentId: resDataListItem.appointmentId,
            besUpdateStatus: resDataListItem.besUpdateStatus,
            detailTitle: resDataListItem.detailTitle,
            name: resDataListItem.name,
            appointmentCode: resDataListItem.appointmentCode,
            latitude: resDataListItem.latitude,
            longitude: resDataListItem.longitude,
            companyName: resDataListItem.companyName,
            branchTitle: resDataListItem.branchTitle,
            address: resDataListItem.address,
            packagNames: resDataListItem.packagNames,
            startTime: resDataListItem.startTime,
            endTime: that.formatDateTime(resDataListItem.endTime),
            detTime: that.formatDateTime(resDataListItem.detTime),
            reportGenerateTime: resDataListItem.reportGenerateTime,
            pdfUrl: resDataListItem.pdfUrl,
            reportId: resDataListItem.reportId
          };
          list.push(item);
        }
        that.setData({
          dataList: list
        });
        console.log(resData.phone);
      },
      fail: function (error) {
        console.log('request fail', error);
      },
      complete: function () {
        that.setData({
          loadingHidden: true
        });
      }
    });
    console.log(this.data.userPhone);
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    const that = this;
    qcloud.request({
      // 要请求的地址
      data: {},
      url: `${config.service.prefixUrl}/appointment`,
      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,
      success: function (result) {
        console.log('request success', result);
        const resData = result.data.data;
        const resDataList = result.data.data.list;
        if (!resData.phone) {
          console.log(resData.phone);
          wx.redirectTo({
            url: '/pages/start/start'
          });
          return;
        }
        if (resData.name !== null) { // 判断姓名和昵称切换展示
          that.setData({
            nameHas: false,
            userName: resData.name,
            userPhone: resData.phone
          });
        } else {
          that.setData({
            nameHas: true,
            userPhone: resData.phone
          });
        }
        const list = [];
        for (let i = 0; i < resDataList.length; i++) {
          const resDataListItem = resDataList[i];
          const item = {
            appointmentId: resDataListItem.appointmentId,
            besUpdateStatus: resDataListItem.besUpdateStatus,
            detailTitle: resDataListItem.detailTitle,
            name: resDataListItem.name,
            appointmentCode: resDataListItem.appointmentCode,
            latitude: resDataListItem.latitude,
            longitude: resDataListItem.longitude,
            companyName: resDataListItem.companyName,
            branchTitle: resDataListItem.branchTitle,
            address: resDataListItem.address,
            packagNames: resDataListItem.packagNames,
            startTime: resDataListItem.startTime,
            endTime: that.formatDateTime(resDataListItem.endTime),
            detTime: that.formatDateTime(resDataListItem.detTime),
            reportGenerateTime: resDataListItem.reportGenerateTime,
            pdfUrl: resDataListItem.pdfUrl,
            reportId: resDataListItem.reportId
          };
          list.push(item);
        }
        that.setData({
          dataList: list
        });
        console.log(resData.phone);
      },
      fail: function (error) {
        console.log('request fail', error);
      },
      complete: function () {
        that.setData({
          loadingHidden: true
        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    });
  }
});