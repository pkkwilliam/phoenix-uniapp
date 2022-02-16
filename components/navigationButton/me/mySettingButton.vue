<template>
  <view class="row-center-container" @click="onClick">
    <u-icon name="setting" size="18" />
  </view>
</template>

<script>
import { MY_SETTING_PAGE } from "../../../route/applicationRoute";
export default {
  methods: {
    onClick() {
      uni.navigateTo({ url: MY_SETTING_PAGE().url });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>