<template>
  <view class="row-center-container">
    <text :class="text">${{ value }}</text>
  </view>
</template>

<script>
import applicationIcon from "../icon/applicationIcon.vue";
export default {
  components: { applicationIcon },
  computed: {
    iconSize() {
      switch (this.size) {
        case "large":
          return 36;
        default:
          return 18;
      }
    },
    text() {
      switch (this.size) {
        case "large":
          return "large-text";
        default:
          return "default-text";
      }
    },
  },
  props: {
    priceColor: {
      default: "primary",
      type: String,
    },
    size: {
      default: "default",
      type: String,
    },
    value: {
      default: 0,
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.default-text {
  color: $u-phoenix-font-dark;
  font-size: 34rpx;
}
.large-text {
  color: $u-phoenix-font-dark;
  font-size: 72rpx;
}
</style>