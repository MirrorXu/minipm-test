// 引入 QCloud 小程序增强 SDK
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
const config = require('../../config');

let startT = '';
let endT = '';
let selectedDate = '';
let offDay = [];
const formidArr = [];

Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    currentTab: -1,
    currentDate: '',
    currentTimestamp: '',
    todayIndex: 0,
    startTime: 0,
    endTime: 0,
    basePackageId: '',
    customPackageId: '',
    basePackageName: '',
    customPackageName: '',
    instTitle: '',
    appointmentId: '',
    branchId: '',
    besUpdateStatus: 0,
    disabled: true
  },
  // 时间戳转日期格式
  formatDateTime: function (inputTime) {
    const toDate = new Date(inputTime);
    const y = toDate.getFullYear();
    let m = toDate.getMonth() + 1;
    m = m < 10 ? (`0${m}`) : m;
    let d = toDate.getDate();
    d = d < 10 ? (`0${d}`) : d;
    return `${y}年${m}月${d}日`;
  },

  formatTodayTime: function () {
    const toDate = new Date();
    const y = toDate.getFullYear();
    let m = toDate.getMonth() + 1;
    m = m < 10 ? (`0${m}`) : m;
    let d = toDate.getDate();
    d = d < 10 ? (`0${d}`) : d;
    return `${y}年${m}月${d}日`;
  },

  dateInit: function (setYear, setMonth) {
    // 全部时间的月份都是按0~11基准，显示月份才+1
    // 需要遍历的日历数组数据
    const dateArr = [];
    // dateArr的数组长度
    let arrLen = 0;
    const now = setYear ? new Date(setYear, setMonth) : new Date();
    const year = setYear || now.getFullYear();
    let nextYear = 0;
    // 没有+1方便后面计算当月总天数
    const month = setMonth || now.getMonth();
    const nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    // 目标月1号对应的星期
    const firstDay = `${year}/${month + 1}/1`;
    const startWeek = new Date(firstDay).getDay();
    // 获取目标月有多少天
    let dayNums = new Date(year, nextMonth, 0).getDate();
    let obj = {};
    let num = 0;
    // 月份超过12到下一年
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    // 需要遍历多少个日期模版对象
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        let numStr = num.toString(); // 日期格式转字符串 不足俩位数 补0
        let zero = '';
        if (numStr.length < 2) {
          numStr = `0${numStr}`;
        }
        if (month < 9) { // 月份如果小于10月 前面补0
          zero = '0';
        }
        // const isToday = '' + year + '年' + zero + (month + 1) + '月' + numStr + '日';
        const isToday = `${year}年${zero + (month + 1)}月${numStr}日`;
        const timestamp = new Date(`${year}-${zero + (month + 1)}-${numStr}`).getTime();
        let operate = 'none';
        if (isToday >= startT && isToday <= endT) {
          operate = '';
        }
        if (offDay.indexOf(i % 7) !== -1) {
          operate = 'none';
        }
        obj = {
          isToday: isToday,
          dateNum: num,
          operate: operate,
          timestamp: timestamp,
          weight: '可预约'
        };
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    let disabled = true;
    if (selectedDate) {
      disabled = false;
    }
    this.setData({
      currentDate: selectedDate,
      dateArr: dateArr,
      disabled: disabled
    });
    console.log(dateArr);
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const nowWeek = nowDate.getDay();
    const getYear = setYear || nowYear;
    const getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    console.log(nowWeek);
    if (nowYear === getYear && nowMonth === getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      });
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      });
    }
  },

  lastMonth: function () {
    // 全部时间的月份都是按0~11基准，显示月份才+1
    const year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    const month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    let disabled = true;
    if (selectedDate) {
      disabled = false;
    }
    this.setData({
      currentTab: -1,
      disabled: disabled,
      year: year,
      month: (month + 1)
    });
    this.dateInit(year, month, startT, endT);
  },

  nextMonth: function () {
    // 全部时间的月份都是按0~11基准，显示月份才+1
    const year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    const month = this.data.month > 11 ? 0 : this.data.month;
    let disabled = true;
    if (selectedDate) {
      disabled = false;
    }
    this.setData({
      currentTab: -1,
      disabled: disabled,
      year: year,
      month: (month + 1)
    });
    this.dateInit(year, month, startT, endT);
  },

  onChecked: function (event) { // 点击日期时触发的方法
    const that = this;
    const tempSelectedDate = event.currentTarget.dataset.date;// 当前点击的日期
    const { timestamp, operate } = event.currentTarget.dataset;// 当前点击的日期de timestamp
    if (operate === '') { // ke yu yue  '' 'none'
      if (that.data.currentTab !== event.currentTarget.dataset.current) {
        selectedDate = tempSelectedDate;// 如果是可预约状态 再把点击的当前个赋值给状态机
        const showMode = event.currentTarget.dataset.current === 0;
        that.setData({
          currentTab: event.currentTarget.dataset.current,
          isShow: showMode,
          currentDate: selectedDate,
          currentTimestamp: timestamp,
          disabled: false
        });
      }
    } else {
      wx.showToast({
        title: '此日期不可预约',
        icon: 'none',
        duration: 1500
      });
    }
  },

  onLoad: function (options) {
    const that = this;
    const appointmentId = options.appointmentid;
    const startTime = options.starttime;
    const endTime = options.endtime;
    const { formid, formid2 } = options;
    formidArr.splice(0, formidArr.length);
    formidArr.push(formid, formid2);
    console.log(formidArr);
    const basePackageName = options.basetitle;
    const customPackageName = options.customtitle;
    const instTitle = options.title;
    startT = that.formatDateTime(parseInt(startTime, 10));
    endT = that.formatDateTime(parseInt(endTime, 10));
    offDay = options.offday;
    selectedDate = '';
    const todayT = that.formatTodayTime();
    if (startT < todayT) {
      startT = todayT;
    }
    const basePackageId = options.basepackageid;
    const customPackageId = options.custompackageid;
    const branchId = options.branchid;
    console.log(appointmentId, startTime, endTime, basePackageId, customPackageId, branchId, instTitle, basePackageName, customPackageName, offDay); // eslint-disable-line
    wx.setNavigationBarTitle({
      title: '选择体检日期（3/3）'
    });
    const now = new Date();
    let nowGetdate = now.getDate();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    let monthStr = '';
    if (month < 10) {
      monthStr = `0${month}`;
    } else {
      monthStr = month;
    }
    if (nowGetdate < 10) {
      nowGetdate = `0${nowGetdate}`;
    }
    that.dateInit('', '', startT, endT);
    that.setData({
      year: year,
      month: month,
      startTime: startTime,
      endTime: endTime,
      basePackageId: basePackageId,
      customPackageId: customPackageId,
      basePackageName: basePackageName,
      customPackageName: customPackageName,
      appointmentId: appointmentId,
      instTitle: instTitle,
      branchId: branchId,
      isToday: `${year}年${monthStr}月${nowGetdate}日`
    });
  },

  onReady: function () {
    console.log('完成');
  },

  confirmNext: function (e) {
    const formId3 = e.detail.formId;
    console.log(formId3);
    formidArr.push(formId3);
    console.log(formidArr);
    let customtitle = '';
    const that = this;
    if (that.data.customPackageName) {
      customtitle = `+${that.data.customPackageName}`;
    }
    wx.showModal({
      title: '确认选择',
      confirmColor: '#2a88e9',
      content: `项目：${that.data.basePackageName + customtitle}\r\n时间：${that.data.currentDate}\r\n地点：${that.data.instTitle}`, // eslint-disable-line
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          console.log(formidArr);
          qcloud.request({
            url: `${config.service.prefixUrl}appointment/${that.data.appointmentId}`,
            login: true,
            data: {
              packageId: `${that.data.basePackageId},${that.data.customPackageId}`,
              branchId: Number.parseInt(that.data.branchId, 10),
              appointmentDate: that.data.currentTimestamp,
              formIds: formidArr
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (resault) {
              console.log(resault);
              wx.reLaunch({
                url: `/pages/success/success?appointmentid=${that.data.appointmentId}`
              });
            },
            fail: function (resault) {
              console.log(resault);
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  }
});