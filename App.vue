<script>
import Vue from "vue";
import { GET_APP_CONFIG } from "./service/service";
import { getServiceUrl } from "./util/appConfigUtil";
export default {
  onLaunch: function () {
    console.log("onLaunch");
    // Hot Update
    plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
      console.log("check update");
      console.log(widgetInfo);
      const serviceUrl = getServiceUrl();
      console.log("service url:", serviceUrl);
      const { version, versionCode } = widgetInfo;
      const { url } = GET_APP_CONFIG(version);
      console.log(serviceUrl + url);
      uni.request({
        url: serviceUrl + url,
        success: (result) => {
          var { hotUpdateUrl, requireMajorUpdate, requireHotUpdate, version } =
            result.data;
          if (requireHotUpdate && hotUpdateUrl) {
            console.log("app version behind, attempt to update");
            uni.downloadFile({
              url: hotUpdateUrl,
              success: (downloadResult) => {
                const { statusCode, tempFilePath } = downloadResult;
                if (statusCode === 200) {
                  plus.runtime.install(
                    tempFilePath,
                    { force: true },
                    function () {
                      console.log("install update success...");
                      plus.runtime.restart();
                    },
                    function (e) {
                      console.error("install update fail...");
                    }
                  );
                }
              },
              fail: (error) =>
                console.log("failed to download update file", error),
            });
          } else {
            console.log("update not required ");
          }
          // if (data.update && data.wgtUrl) {
          //   uni.downloadFile({
          //     url: data.wgtUrl,
          //     success: (downloadResult) => {
          //       if (downloadResult.statusCode === 200) {
          //         plus.runtime.install(
          //           downloadResult.tempFilePath,
          //           {
          //             force: true,
          //           },
          //           function () {
          //             console.log("install success...");
          //             plus.runtime.restart();
          //           },
          //           function (e) {
          //             console.error("install fail...");
          //           }
          //         );
          //       }
          //     },
          //   });
          // }
        },
      });
    });

    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight + 4;
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });
    setInterval(() => {
      var info = plus.push.getClientInfo();
      // console.log(JSON.stringify(info));
    }, 5000);
    // check push notification token
    console.log(plus.os);
    /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
    plus.push.addEventListener(
      "click",
      function (msg) {
        console.log("click:" + JSON.stringify(msg));
        console.log(msg.payload);
        console.log(JSON.stringify(msg));
        //这里可以写跳转业务代码
      },
      false
    );
    plus.push.addEventListener(
      "receive",
      function (msg = {}) {
        const isAndroid = plus.os.name === "Android";
        console.log(plus.os);
        console.log(msg, !isAndroid);
        console.log(msg);
        if (!isAndroid) {
          console.log("this is iOS");
          // 如果是IOS
          const { payload } = msg;
          const { body, title } = payload;
          console.log("parse json:", title, body);
          // 【APP离线】收到消息，但没有提醒（发生在一次收到多个离线消息时，只有一个有提醒，但其他的没有提醒）
          // 【APP在线】收到消息，不会触发系统消息,需要创建本地消息，但不能重复创建。必须加msg.type验证去除死循环
          if (msg.aps == null && msg.type === "receive") {
            const messageTitle = title;
            const messageContent = body;
            // 创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null
            plus.push.createMessage(messageContent, JSON.stringify(payload), {
              title: messageTitle,
            });
          } else {
          }
        } else {
          console.log("this is Android");
          const { content, payload, title } = msg;
          console.log(content, payload, title);
          const { body } = JSON.parse(content);
          plus.push.createMessage(body, payload, {
            title,
          });
          // let payload = {};
          // console.log(typeof msg.payload === "object", typeof msg.payload);
          // if (typeof msg.payload === "object") {
          //   payload = msg.payload || {};
          // } else {
          //   payload = JSON.parse(msg.payload) || {};
          // }
          // console.log(payload);
          // const messageTitle = payload.messageTitle || "";
          // const messageContent = payload.messageContent || "";
          // plus.push.createMessage(messageContent, JSON.stringify(payload), {
          //   title: messageTitle,
          // });
        }
      },
      false
    );
  },

  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uview-ui/index.scss";
@import "common/demo.scss";
page {
  background-color: #f8f8f8;
}
</style>
