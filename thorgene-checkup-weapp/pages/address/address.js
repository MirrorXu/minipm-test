// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    branches: [],
    areaNewArr: [],
    instNewArr: [],
    showArea: false,
    showInst: false,
    areaName: '区域',
    instName: '体检机构',
    areaArr: [],
    instArr: [],
    areaSelected: false,
    instSelected: false,
    areaClickId: -1,
    instClickId: -1,
    appointmentId: '',
    startTime: '',
    endTime: '',
    basePackageId: '',
    customPackageId: '',
    basePackageName: '',
    customPackageName: '',
    branchId: '',
    offDay: [],
    instTitle: '',
    loadingHidden: false,
    defaultShow: false,
    disabled: true,
    formId: ''
  },
  // 单选
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    let branchid = '';
    let instTitle = '';
    let offday = [];
    const items = this.data.areaNewArr;
    const radio = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
    }
    for (let i = 0; i < items.length; i++) {
      if (radio === i.toString()) {
        items[i].checked = radio;
        branchid = items[i].branchId;
        instTitle = items[i].title;
        offday = items[i].offDay;
        break;
      }
    }
    this.setData({
      areaNewArr: items,
      defaultShow: items.length,
      branchId: branchid,
      offDay: offday,
      instTitle: instTitle,
      disabled: false
    });
    console.log(branchid, items);
  },
  // 区域选择
  areaChoose: function () {
    const that = this;
    that.setData({
      showArea: (!that.data.showArea),
      showInst: false
    });
    console.log(that.data.showArea);
  },

  areaItem: function (event) {
    const areaName = event.currentTarget.dataset.name;
    const areaClickId = event.currentTarget.dataset.id;
    const that = this;
    // 过滤
    const areaNewArr = this.filter(areaName, that.data.instName);
    console.log(areaNewArr);
    that.setData({
      areaName: areaName,
      areaClickId: areaClickId,
      areaSelected: true,
      showArea: false,
      disabled: true,
      areaNewArr: areaNewArr,
      defaultShow: areaNewArr.length
    });
  },
  // 机构选择
  instChoose: function () {
    const that = this;
    that.setData({
      showInst: (!that.data.showInst),
      showArea: false
    });
    console.log(that.data.showInst);
  },
  instItem: function (event) {
    const instName = event.currentTarget.dataset.name;
    const instClickId = event.currentTarget.dataset.id;
    const areaNewArr = this.filter(this.data.areaName, instName);
    console.log(areaNewArr);
    this.setData({
      instName: instName,
      instClickId: instClickId,
      instSelected: true,
      showInst: false,
      disabled: true,
      areaNewArr: areaNewArr,
      defaultShow: areaNewArr.length
    });
  },

  filter: function (areaName, instName) {
    return this.data.branches.filter((item) => {
      if (areaName === '区域' || areaName === '不限') {
        return true;
      }
      return item.subArea === areaName;
    })
      .filter((item) => {
        if (instName === '体检机构' || instName === '不限') {
          return true;
        }
        return item.institution === instName;
      });
  },
  // 点击阴影收起菜单
  hideAreaInst: function () {
    this.setData({
      showInst: false,
      showArea: false
    });
  },
  // 下一步
  nextPage: function (e) {
    console.log(e.detail.formId);
    const urlParams = `starttime=${this.data.startTime}&endtime=${this.data.endTime}&basepackageid=${this.data.basePackageId}&custompackageid=${this.data.customPackageId}&branchid=${this.data.branchId}&appointmentid=${this.data.appointmentId}&basetitle=${this.data.basePackageName}&customtitle=${this.data.customPackageName}&title=${this.data.instTitle}&offday=${JSON.stringify(this.data.offDay)}&formid=${this.data.formId}&formid2=${e.detail.formId}`; // eslint-disable-line
    wx.navigateTo({
      url: `/pages/date/date?${urlParams}`
    });
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
  onLoad: function (options) {
    const that = this;
    const appointmentId = options.appointmentid;
    const basePackageId = options.basepackageid;
    const basePackageName = options.basetitle;
    const customPackageName = options.customtitle;
    const customPackageId = options.custompackageid;
    const startTime = options.starttime;
    const endTime = options.endtime;
    const formId = options.formid;
    const arrCheck = ['不限'];
    console.log(appointmentId, startTime, endTime, basePackageId, customPackageId, formId);
    const cnum = ['日', '一', '二', '三', '四', '五', '六'];
    qcloud.request({
      url: `${config.service.prefixUrl}appointment/institutions/${appointmentId}`,
      login: true,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        const resData = res.data.data;
        const instArr = arrCheck.concat(resData.institutions);
        const areaArr = arrCheck.concat(resData.areas[0].subAreas);
        const { branches } = resData;
        // 遍历 offDay array
        for (let i = 0; i < branches.length; i++) {
          const offDayChina = [];
          if (branches[i] && branches[i].offDay && Array.isArray(branches[i].offDay)) {
            for (let j = 0; j < branches[i].offDay.length; j++) {
              const value = branches[i].offDay[j];
              if (cnum[value]) {
                offDayChina.push(cnum[value]);
              }
            }
          }
          branches[i].offDayChina = offDayChina;
        }
        that.setData({
          instArr: instArr,
          areaArr: areaArr,
          branches: branches,
          areaNewArr: branches,
          appointmentId: appointmentId,
          startTime: startTime,
          basePackageId: basePackageId,
          customPackageId: customPackageId,
          basePackageName: basePackageName,
          customPackageName: customPackageName,
          endTime: endTime,
          formId: formId,
          defaultShow: branches.length,
          loadingHidden: true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.setNavigationBarTitle({
      title: '选择体检地点（2/3）'
    });
  }
});