<template>
  <view>
    <u-button
      class="custom-style"
      shape="circle"
      :disabled="disabled"
      :hairLine="true"
      :loading="loading"
      :size="size"
      :text="label"
      @click="$emit('onClick')"
    />
  </view>
</template>

<script>
export default {
  computed: {},
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      default: "提交",
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    size: {
      default: "medium",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-style {
  color: black;
  background-color: $u-phoenix-primary;
  border-color: $u-phoenix-primary;
  font-family: monospace;
  font-weight: bold;
}
</style>