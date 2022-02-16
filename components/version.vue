<template>
  <view>
    <text>v{{ version }}</text>
  </view>
</template>

<script>
export default {
  computed: {
    currentVersion() {
      console.log("current version:", plus.runtime.version);
      return plus.runtime.version;
    },
  },
  data() {
    return { version: "" };
  },
  mounted() {
    const { appid, getProperty } = plus.runtime;
    getProperty(appid, (widgetInfo) => {
      const { version } = widgetInfo;
      console.log(version);
      this.version = version;
    });
  },
};
</script>