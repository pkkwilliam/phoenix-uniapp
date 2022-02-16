<template>
  <view>
    <u-icon
      :color="selected ? $styles.primary : $styles.secondary"
      :name="selected ? 'checkmark' : 'close'"
      size="18"
    />
  </view>
</template>

<script>
export default {
  props: {
    selected: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
