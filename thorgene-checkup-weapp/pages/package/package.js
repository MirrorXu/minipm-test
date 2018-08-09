// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    basePackageId: '',
    customPackageId: '',
    basePackageName: '',
    customPackageName: '',
    base: [],
    custom: [],
    appointmentId: '',
    disabled: true,
    loadingHidden: false
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    let basePackageid = [];
    let basePackageName = '';
    const items = this.data.base;
    const radio = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
    }
    for (let i = 0; i < items.length; i++) {
      if (radio === i.toString()) {
        items[i].checked = radio;
        basePackageid = items[i].packageId;
        basePackageName = items[i].title;
        break;
      }
    }
    console.log(basePackageid);
    let disabled = true;
    if (basePackageid) {
      disabled = false;
      if (this.data.custom.length > 0) {
        if (!this.data.customPackageId) {
          disabled = true;
        } else {
          disabled = false;
        }
      }
    } else {
      disabled = false;
    }
    this.setData({
      base: items,
      basePackageId: basePackageid,
      basePackageName: basePackageName,
      disabled: disabled
    });
  },

  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    let customPackageid = [];
    let customPackageName = '';
    const items2 = this.data.custom;
    const radio = e.detail.value;
    for (let i = 0; i < items2.length; i++) {
      items2[i].checked = false;
    }
    for (let i = 0; i < items2.length; i++) {
      if (radio === i.toString()) {
        items2[i].checked = radio;
        customPackageid = items2[i].packageId;
        customPackageName = items2[i].title;
        break;
      }
    }
    let disabled = true;
    if (customPackageid) {
      disabled = false;
      if (this.data.basePackageId) {
        disabled = false;
      } else {
        disabled = true;
      }
    } else {
      disabled = true;
    }
    this.setData({
      custom: items2,
      customPackageId: customPackageid,
      customPackageName: customPackageName,
      disabled: disabled
    });
  },

  baseDetailsPage: function (event) {
    const { idx } = event.currentTarget.dataset;
    const urlParams = `packageid=${this.data.base[idx].packageId}&details=${JSON.stringify(this.data.base[idx].detail)}`; // eslint-disable-line
    wx.navigateTo({
      url: `/pages/package/details/details?${urlParams}`
    });
  },
  coustomDetailsPage: function (event) {
    const { idx } = event.currentTarget.dataset;
    const urlParams = `packageid=${this.data.custom[idx].packageId}&details=${JSON.stringify(this.data.custom[idx].detail)}`; // eslint-disable-line
    wx.navigateTo({
      url: `/pages/package/details/details?${urlParams}`
    });
  },

  nextPage: function (e) {
    console.log(e.detail.formId);
    const urlParams = `appointmentid=${this.data.appointmentId}&starttime=${this.data.startTime}&endtime=${this.data.endTime}&basepackageid=${this.data.basePackageId}&custompackageid=${this.data.customPackageId}&basetitle=${this.data.basePackageName}&customtitle=${this.data.customPackageName}&formid=${e.detail.formId}`; // eslint-disable-line
    wx.navigateTo({
      url: `/pages/address/address?${urlParams}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const appointmentId = options.appointmentid;
    that.setData({
      appointmentId: appointmentId
    });
    console.log(appointmentId);
    qcloud.request({
      url: `${config.service.prefixUrl}/appointment/package/${appointmentId}`,
      login: true,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        const resData = res.data.data;
        that.setData({
          startTime: resData.startTime,
          endTime: resData.endTime,
          base: resData.base,
          custom: resData.custom,
          loadingHidden: true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.setNavigationBarTitle({
      title: '选择体检套餐（1/3）'
    });
  }
});