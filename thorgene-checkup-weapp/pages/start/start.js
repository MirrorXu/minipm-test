Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (resault) {
              console.log(resault.userInfo);
            }
          });
        }
      }
    });
    wx.setNavigationBarTitle({
      title: '体检管家'
    });
  },
  onStart: function () {
    wx.navigateTo({
      url: '/pages/phone/phone'
    });
  }
});