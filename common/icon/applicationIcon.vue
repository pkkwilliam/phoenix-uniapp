<template>
  <view>
    <u--image :height="size" :src="imageLocation" :width="size" />
  </view>
</template>

<script>
export default {
  computed: {
    imageLocation() {
      return `/static/icon/${this.iconName}.png`;
    },
  },
  props: {
    iconName: String,
    size: {
      default: 22,
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>