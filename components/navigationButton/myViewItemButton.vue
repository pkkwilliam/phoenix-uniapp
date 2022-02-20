<template>
  <view class="row-center-container" @click="onClick">
    <application-icon iconName="shoes" />
    <text class="h3 text">足跡</text>
  </view>
</template>

<script>
import applicationIcon from "../../common/icon/applicationIcon.vue";
import { MY_VIEW_ITEM_PAGE } from "../../route/applicationRoute";
export default {
  components: { applicationIcon },
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