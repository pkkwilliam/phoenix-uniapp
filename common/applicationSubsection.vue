<template>
  <view class="u-item-text">
    <u-subsection
      class="u-item-text"
      font-size="12"
      mode="subsection"
      :bold="true"
      :current="value"
      :height="50"
      :list="list"
      @change="change"
    />
  </view>
</template>

<script>
import "./applicationSubsection.scss";
export default {
  methods: {
    change(index) {
      this.$emit("input", index);
    },
  },
  props: {
    list: Array,
    value: Number,
  },
};
</script>

<style lang="scss" scoped>
</style>