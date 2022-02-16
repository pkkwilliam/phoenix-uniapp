import Vue from "vue";
import App from "./App";

// vuex
// import store from "./store";
import store from "./store/applicationState";

// 引入全局uView
import uView from "@/uni_modules/uview-ui";

import mixin from "./common/mixin";

import { execute as serviceExecutor } from "./service/serviceExecutor";
import {
  getLanguage,
  getPushNotificationToken,
  getUserToken,
  removeUserToken,
  setPushNotificationToken,
  setUserToken,
} from "./store/applicationStorage";
import AppStateService from "./service/appStateService";
import CHINESE_TRADITION_LABEL from "./label/label.zh_cn.json";
import styles from "./css/theme.js";
import { getServiceUrl } from "./util/appConfigUtil";

Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = "app";

let host = getServiceUrl();
let executeService = (service) =>
  serviceExecutor(
    host,
    store,
    getUserToken,
    setUserToken,
    removeUserToken,
    service
  );

Vue.use(uView);

uni.$u.config.unit = "px";
uni.$u.setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: "px",
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    radio: {
      size: 15,
    },
    // 其他组件属性配置
    // ......
  },
});
// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require("@/uni_modules/uview-ui/libs/mixin/mpShare.js");
Vue.mixin(mpShare);
// #endif

Vue.mixin(mixin);

Vue.mixin({
  data() {
    return { appLabel: CHINESE_TRADITION_LABEL, appLanguage: getLanguage() };
  },
  methods: {
    execute: (service) => executeService(service),
    getPushNotificationToken,
    isLogin: () => store.state.userProfile.profile.active,
    logout: () => {
      setUserToken(undefined), store.commit("setUserProfile", {});
    },
    setPushNotificationToken: (pushNotificationToken) =>
      setPushNotificationToken(pushNotificationToken),
  },
});

let appStateService = new AppStateService(store, executeService);

// declare global variable
// usage: const myvalue = this.myGlobalVariable
Vue.prototype.$myGlobalVariable = "value";

Vue.prototype.$appStateService = appStateService;
Vue.prototype.$label = CHINESE_TRADITION_LABEL;
Vue.prototype.$language = getLanguage();
Vue.prototype.$styles = styles;

const app = new Vue({
  store,
  ...App,
});

// 引入请求封装
require("./util/request/index")(app);

app.$mount();
