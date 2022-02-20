<template>
  <view>
    <!-- <u-icon
      :color="selected ? $styles.primary : $styles.secondary"
      :name="selected ? 'checkmark' : 'close'"
      size="18"
    /> -->
    <application-icon :iconName="selected ? 'checked' : 'unchecked'" />
  </view>
</template>

<script>
import applicationIcon from "./icon/applicationIcon.vue";
export default {
  components: { applicationIcon },
  props: {
    selected: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
