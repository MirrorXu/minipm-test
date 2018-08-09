/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "checkup.t1st.thorgene.com"

var config = {
  
    service: {
      host,

      prefixUrl: `https://${host}/`,

      // 登录地址，用于建立会话
      loginUrl: `https://${host}/weapp/login`,
    }
};

module.exports = config
