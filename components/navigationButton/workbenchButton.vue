<template>
  <view class="row-center-container" @click="onClick">
    <u-icon name="kefu-ermai" size="20" />
    <text class="h3 text">工作台PRO</text>
  </view>
</template>

<script>
import { WORKBENCH_PAGE } from "../../route/applicationRoute";
export default {
  methods: {
    onClick() {
      uni.navigateTo({ url: WORKBENCH_PAGE().url });
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  margin-left: 15rpx;
}
</style>