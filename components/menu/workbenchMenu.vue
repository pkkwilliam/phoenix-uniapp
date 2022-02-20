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
  CASH_OUT_TYPE_CASH,
  CASH_OUT_TYPE_FISH_COIN,
} from "../../enum/cashOutType";
import {
  CASH_OUT_HISTORY_PAGE,
  CASH_OUT_PAGE,
  MY_BANK_ACCOUNT_PAGE,
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
          iconName: "cash",
          label: "提取現金",
          toPage: () => CASH_OUT_PAGE(CASH_OUT_TYPE_CASH.key),
        },
        {
          iconName: "fish-coin",
          label: "提取魚獲",
          toPage: () => CASH_OUT_PAGE(CASH_OUT_TYPE_FISH_COIN.key),
        },
        {
          iconName: "history",
          label: "提取現金歷史",
          toPage: CASH_OUT_HISTORY_PAGE,
        },
        {
          iconName: "bank-account",
          label: "銀行賬戶",
          toPage: MY_BANK_ACCOUNT_PAGE,
        },
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