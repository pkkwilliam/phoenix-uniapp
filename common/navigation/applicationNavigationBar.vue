<template>
  <u-navbar
    :autoBack="autoBack"
    :bgColor="navigationBarBackgroundColor"
    :back-icon-color="$styles.black"
    :border-bottom="false"
    :fixed="true"
    :leftIconSize="isBack ? 20 : 0"
    :title="title"
    :title-color="$styles.black"
  >
  </u-navbar>
</template>

<script>
export default {
  computed: {
    navigationBarBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : this.$styles.primary;
    },
  },
  props: {
    autoBack: {
      default: true,
      type: Boolean,
    },
    backgroundColor: undefined,
    isBack: {
      default: true,
      type: Boolean,
    },
    title: {
      default: "",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>