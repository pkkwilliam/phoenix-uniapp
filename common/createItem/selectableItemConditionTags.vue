<template>
  <view>
    <u-scroll-list :indicator="false">
      <view v-for="(itemCondition, index) in itemConditions" :key="index">
        <u-tag
          class="u-scroll-view-item tag"
          plain
          shape="circle"
          :size="size"
          :text="itemCondition.label"
          :type="itemCondition.key === value ? 'warning' : 'info'"
          @click="onSelectItemConditon(index)"
        />
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
import {
  ITEM_CONDITION_ACCEPTABLE,
  ITEM_CONDITION_DEFECT,
  ITEM_CONDITION_GOOD,
  ITEM_CONDITION_LIKE_NEW,
  ITEM_CONDITION_NEW,
} from "../../enum/itemCondition";

export default {
  computed: {
    itemConditions() {
      return [
        ITEM_CONDITION_NEW,
        ITEM_CONDITION_LIKE_NEW,
        ITEM_CONDITION_GOOD,
        ITEM_CONDITION_ACCEPTABLE,
        ITEM_CONDITION_DEFECT,
      ];
    },
  },
  methods: {
    onSelectItemConditon(index) {
      const selectedItemCondition = this.itemConditions[index];
      this.$emit("input", selectedItemCondition.key);
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
  white-space: nowrap;
}
</style>