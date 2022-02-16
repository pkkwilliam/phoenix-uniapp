<template>
  <view>
    <u-scroll-list :indicator="false">
      <view v-for="(subCategory, index) in subCategories" :key="index">
        <u-tag
          class="u-scroll-view-item tag"
          plain
          shape="circle"
          :size="size"
          :text="subCategory.chineseName"
          :type="subCategory.id === currentSelectedId ? 'warning' : 'info'"
          @click="onSelectSubCategory(index)"
        />
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
export default {
  computed: {
    currentSelectedId() {
      return this.value?.id ?? 0;
    },
    subCategories() {
      if (this.category) {
        return this.$store.state.subCategory.content[this.category];
      }
      return [];
    },
  },
  methods: {
    onSelectSubCategory(index) {
      const selectedSubCategory = this.subCategories[index];
      this.$emit("input", selectedSubCategory);
    },
  },
  props: {
    category: Object,
    value: Object,
    size: {
      default: "medium",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  margin-right: 8px;
  white-space: nowrap;
}
</style>