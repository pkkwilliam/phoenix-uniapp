<template>
  <view>
    <u-scroll-list :indicator="false">
      <view v-for="(itemLocation, index) in itemLocations" :key="index">
        <u-tag
          class="tag"
          plain
          shape="circle"
          :size="size"
          :text="itemLocation"
          :type="itemLocation === value ? 'warning' : 'info'"
          @click="onSelectAreaLocation(index)"
        />
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
export default {
  computed: {
    itemLocations() {
      return ["澳門半島", "氹仔", "路環"];
    },
  },
  methods: {
    onSelectAreaLocation(index) {
      this.$emit("input", this.itemLocations[index]);
    },
  },
  props: {
    size: {
      default: "medium",
      type: String,
    },
    value: String,
  },
};
</script>

<style lang="scss" scoped>
.tag {
  margin-right: 8px;
}
</style>
