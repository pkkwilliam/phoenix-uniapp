<template>
  <view class="row-center-container tooltips">
    <u-icon name="info-circle" size="18" :color="$styles.orange" />
    <view class="row-center-container small-margin-left-spacer">
      <text class="h5 orange">{{ label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
.tooltips {
  background-color: $u-type-warning-light;
  border-radius: 20px;
  padding: 3px;
  width: fit-content;
}
</style>