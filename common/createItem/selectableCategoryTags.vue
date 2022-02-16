<template>
  <view>
    <u-scroll-list :indicator="false">
      <view v-for="(category, index) in categories" :key="index">
        <u-tag
          class="tag"
          plain
          shape="circle"
          :size="size"
          :text="category.chineseName"
          :type="category.id === currentSelectValueId ? 'warning' : 'info'"
          @click="onSelectCategory(index)"
        />
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.category.content;
    },
    currentSelectValueId() {
      return this.value?.id ?? 0;
    },
  },
  methods: {
    onSelectCategory(index) {
      const selectedCategory = this.categories[index];
      this.$appStateService.getSubCategory(selectedCategory);
      this.$emit("input", selectedCategory);
    },
  },
  mounted() {
    this.$appStateService.getCategory();
  },
  props: {
    size: {
      default: "medium",
      type: String,
    },
    value: Object,
  },
};
</script>

<style lang="scss" scoped>
.tag {
  margin-right: 8px;
  white-space: nowrap;
}
</style>