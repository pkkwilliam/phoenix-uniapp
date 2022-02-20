<template>
  <view>
    <view
      v-for="(menuItem, index) in menuItems"
      :key="index"
      @click="onClick(menuItem)"
    >
      <view class="row-center-container button">
        <application-icon :iconName="menuItem.iconName" />
        <text class="h3 label">{{ menuItem.label }}</text>
      </view>
      <application-line-breaker v-if="index < menuItems.length - 1" />
    </view>
  </view>
</template>

<script>
import ApplicationIcon from "../../common/icon/applicationIcon.vue";
import {
  ADDRESS_SELECTION_PAGE,
  CHANGE_PASSWORD_PAGE,
  DEVELOPER_PAGE,
} from "../../route/applicationRoute";
import ApplicationLineBreaker from "../applicationLineBreaker.vue";

const MENU_KEY_ADDRESS = "ADDRESS";
const MENU_KEY_CHANGE_PASSWORD = "CHANGE_PASSWORD";

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
          key: MENU_KEY_ADDRESS,
          label: "收貨地址",
          toPage: ADDRESS_SELECTION_PAGE,
        },
        {
          iconName: "key",
          key: MENU_KEY_CHANGE_PASSWORD,
          label: "更改密碼",
          toPage: CHANGE_PASSWORD_PAGE,
        },
        {
          iconName: "test-tube",
          key: MENU_KEY_CHANGE_PASSWORD,
          label: "開發人員",
          toPage: DEVELOPER_PAGE,
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