<template>
  <view>
    <u-icon name="scan" size="28" :color="styles.black" @click="onClick" />
  </view>
</template>

<script>
import styles from "../../../css/theme.js";
export default {
  data() {
    return { styles: styles };
  },
  methods: {
    onClick() {
      return uni.scanCode({
        scanType: ["qrCode"],
        success: function (response) {
          console.log("条码类型：" + response.scanType);
          console.log("条码内容：" + response.result);
        },
      });
    },
  },
};
</script>