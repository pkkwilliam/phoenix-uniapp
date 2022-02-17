<template>
  <view @click="$emit('click')">
    <text class="h5 blue text">{{ label }}</text>
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
.text {
  text-decoration: underline;
}
</style>