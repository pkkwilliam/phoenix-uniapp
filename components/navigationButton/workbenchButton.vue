<template>
  <view class="row-center-container" @click="onClick">
    <application-icon iconName="desk" />
    <text class="h3 text">工作台PRO</text>
  </view>
</template>

<script>
import applicationIcon from "../../common/icon/applicationIcon.vue";
import { WORKBENCH_PAGE } from "../../route/applicationRoute";
export default {
  components: { applicationIcon },
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