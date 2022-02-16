<template>
  <view class="row-center-container" @click="onClick">
    <u-icon name="hourglass" size="20" />
    <text class="h3 text">足跡</text>
  </view>
</template>

<script>
import { MY_VIEW_ITEM_PAGE } from "../../route/applicationRoute";
export default {
  methods: {
    onClick() {
      uni.navigateTo({ url: MY_VIEW_ITEM_PAGE().url });
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  margin-left: 15rpx;
}
</style>