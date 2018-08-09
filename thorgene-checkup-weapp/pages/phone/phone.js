// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../config');

Page({
  data: {
    send: true,
    sendMsg: '获取验证码',
    disabled: true,
    alreadySend: false,
    second: 60,
    phoneNum: '',
    yzCode: ''
  },
  // 手机号部分
  inputPhoneNum: function (e) {
    const phoneNum = e.detail.value;
    if (phoneNum.length === 11) {
      const checkedNum = this.checkPhoneNum(phoneNum);
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        });
        this.showSendMsg();
        this.activeButton();
      }
    } else {
      this.setData({
        phoneNum: '',
        disabled: true
      });
    }
  },

  checkPhoneNum: function (phoneNum) {
    const str = /^1[3|4|5|6|7|8|9]\d{9}$/;
    if (str.test(phoneNum)) {
      return true;
    } else {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        disabled: true,
        send: true
      });
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true
    });
  },

  sendMsg: function () {
    const that = this;
    const { phoneNum } = that.data;
    if (phoneNum.trim().length !== 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phoneNum)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    qcloud.request({
      url: `${config.service.prefixUrl}/weapp/sms/code`,
      login: true,
      data: {
        mobile: this.data.phoneNum
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.status === 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });
          that.setData({
            alreadySend: true,
            send: false
          });
          that.timer();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  timer: function () {
    const promise = new Promise((resolve) => {
      const setTimer = setInterval(() => {
        this.setData({
          second: this.data.second - 1
        });
        if (this.data.second <= 0) {
          this.setData({
            second: 60,
            alreadySend: false,
            send: true,
            sendMsg: '重新获取'
          });
          resolve(setTimer);
        }
      }, 1000);
    });
    promise.then((setTimer) => {
      clearInterval(setTimer);
    });
  },

  // 验证码输入
  addCode: function (e) {
    this.setData({
      yzCode: e.detail.value
    });
    this.activeButton();
  },

  // 按钮
  activeButton: function () {
    const { phoneNum, yzCode } = this.data;
    console.log(yzCode);
    if (phoneNum.trim().length === 11 && yzCode !== '') {
      this.setData({
        disabled: false
      });
    } else {
      this.setData({
        disabled: true
      });
    }
  },

  onSubmit: function (e) {
    const that = this;
    console.log(e.detail.formId);
    qcloud.request({
      url: `${config.service.prefixUrl}/appointment/bind`,
      login: true,
      data: {
        mobile: that.data.phoneNum,
        code: that.data.yzCode,
        formId: e.detail.formId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.status === 1) {
          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 1500,
            complete: function () {
              wx.reLaunch({
                url: `/pages/personal/personal?mobile=${that.data.phoneNum}`
              });
            }
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '验证手机号'
    });
  }
});