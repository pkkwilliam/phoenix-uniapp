<template>
  <view>
    <text :class="itemStatusStyle">{{ itemStatus }}</text>
  </view>
</template>

<script>
import {
  getItemStatusLabelByKey,
  ITEM_STATUS_SOLD,
} from "../../enum/itemStatus";
export default {
  computed: {
    itemStatus() {
      return getItemStatusLabelByKey(this.item.itemStatus);
    },
    itemStatusStyle() {
      let style = "h4 ";
      switch (this.item.itemStatus) {
        case ITEM_STATUS_SOLD.key:
          style += "secondary";
          break;
        default:
          style += "orange";
      }
      return style;
    },
  },
  props: {
    item: Object,
  },
};
</script>