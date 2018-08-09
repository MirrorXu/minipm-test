// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../../config');

// let itemHeight = 0;
// let headHeight = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickId: '',
    name: '',
    gender: 1,
    age: 0,
    checkupDate: '',
    checkupAddr: '',
    summary: '',
    reportGroupList: [],
    pdfUrl: '',
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 类目打开收起
  onOpenClose: function (e) {
    const idx = e.currentTarget.dataset.index;
    console.log(idx);
    const datas = this.data.reportGroupList;
    // for (let i = 0; i < datas.length; i++) {
    //   const item = datas[i];
    //   if (i === idx) {
    //     item.show = !item.show;
    //   } else {
    //     item.show = false;
    //   }
    // }
    datas[idx].show = !datas[idx].show;
    this.setData({
      reportGroupList: datas
    });
    // const query = wx.createSelectorQuery();
    // query.select('#itemHeight').boundingClientRect();
    // query.exec(function (res) {// eslint-disable-line
    //   console.log(res);
    //   console.log(res[0].height);
    //   itemHeight = res[0].height;
    // });
    // const queryHead = wx.createSelectorQuery();
    // queryHead.select('#headHeight').boundingClientRect();
    // queryHead.exec(function (res) {// eslint-disable-line
    //   console.log(res);
    //   console.log(res[0].height);
    //   headHeight = res[0].height;
    // });
    // wx.pageScrollTo({
    //   scrollTop: (itemHeight * idx) + headHeight,
    //   duration: 300
    // });
  },
  // 查看原始报告
  openDocument: function (event) {
    const that = this;
    const { url } = event.currentTarget.dataset;
    console.log(url);
    const index1 = url.lastIndexOf('.');
    const index2 = url.length;
    const suffix = url.substring(index1 + 1, index2);
    console.log(suffix);
    if (suffix === 'html') {
      wx.navigateTo({
        url: `/pages/web-view/web-view?url=${url}`
      });
    } else {
      that.setData({
        disabled: true
      });
      const downloadTask = wx.downloadFile({
        url: url,
        success: function (res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            success: function () {
              console.log('打开文档成功');
            }
          });
        }
      });
      downloadTask.onProgressUpdate((res) => {
        wx.showLoading({
          title: `报告下载中${res.progress}%`
        });
        if (res.progress === 100) {
          wx.hideLoading();
        }
      });
    }
  },
  // onload
  onLoad: function (options) {
    const that = this;
    console.log(that.data.disabled);
    const reportId = options.reportid;
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
        const dataArr = res.data.data;
        if (dataArr && dataArr.reportGroupList) {
          for (let i = 0; i < dataArr.reportGroupList.length; i++) {
            const item = dataArr.reportGroupList[i];
            if (!item.reportResultsList.length) {
              // data.reportGroupList[i] = null;
              dataArr.reportGroupList.splice(i, 1);
            }
            item.show = false;
          }
        }
        that.setData({
          name: dataArr.name,
          gender: dataArr.gender,
          age: dataArr.age,
          checkupDate: dataArr.checkupDate,
          checkupAddr: dataArr.checkupAddr,
          summary: dataArr.summary,
          reportGroupList: dataArr.reportGroupList,
          pdfUrl: dataArr.pdfUrl
        });
        console.log('dataArr.reportGroupList: ', dataArr.reportGroupList);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  onShow: function () {
    this.setData({
      disabled: false
    });
  }
});