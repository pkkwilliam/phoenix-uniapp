<template>
  <view>
    <view
      v-for="(menuItem, index) in menuItems"
      :key="index"
      @click="onClick(menuItem)"
    >
      <view class="row-center-container button">
        <application-icon :iconName="menuItem.iconName" />
        <text class="h4 label">{{ menuItem.label }}</text>
      </view>
      <application-line-breaker v-if="index < menuItems.length - 1" />
    </view>
  </view>
</template>

<script>
import ApplicationIcon from "../../common/icon/applicationIcon.vue";
import {
  ADDRESS_SELECTION_PAGE,
  BUSINESS_PAGE,
  REFILL_INFO_PAGE,
} from "../../route/applicationRoute";
import ApplicationLineBreaker from "../applicationLineBreaker.vue";

export default {
  components: {
    ApplicationLineBreaker,
    ApplicationIcon,
  },
  computed: {
    menuItems() {
      return [
        {
          iconName: "location",
          label: "收貨地址",
          toPage: ADDRESS_SELECTION_PAGE,
        },
        {
          iconName: "company-verified",
          label: "申請企業賬號",
          toPage: BUSINESS_PAGE,
        },
        { iconName: "refill", label: "充值方法", toPage: REFILL_INFO_PAGE },
      ];
    },
  },
  methods: {
    onClick(menuItem) {
      uni.navigateTo({ url: menuItem.toPage().url });
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding-bottom: 35rpx;
  padding-top: 35rpx;
  .label {
    margin-left: 18rpx;
  }
}
</style>