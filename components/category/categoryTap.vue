<template>
  <view>
    <u-sticky bgColor="#f8f8f8">
      <u-tabs
        :active-color="$styles.black"
        :current="current"
        :inactiveStyle="$styles.secondary"
        :lineHeight="0"
        :scrollable="true"
        :list="categories"
        @click="change"
      />
    </u-sticky>
  </view>
</template>

<script>
export const ON_CHANGE_CATEGORY_EMIT = "ON_CHANGE_CATEGORY_EMIT";
export default {
  computed: {
    categories() {
      let categories = this.$store.state.category.content.map((category) => ({
        name: category.chineseName,
      }));
      categories.unshift({ name: "推薦" });
      return categories;
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    change(category) {
      this.current = category.index;
      this.$emit(
        "onChangeCategory",
        this.$store.state.category.content[category.index]
      );
    },
  },
  mounted() {
    this.$appStateService.getCategory();
  },
};
</script>

<style lang="scss" scoped>
.active-style {
  color: $u-phoenix-font-dark;
  font-weight: 600;
}
</style>