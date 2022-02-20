<template>
  <view class="space-between-center-container">
    <view class="row-center-container">
      <application-icon iconName="bank-account" />
      <view class="small-margin-left-spacer">
        <text class="h3">未有提取現金的銀行賬戶</text>
      </view>
    </view>
    <border-button
      label="去完善"
      size="mini"
      :backgroundColor="$styles.white"
      :color="$styles.darkOrange"
      @onClick="onClick"
    />
  </view>
</template>

<script>
import borderButton from "../../../common/button/borderButton.vue";
import ApplicationIcon from "../../../common/icon/applicationIcon.vue";
import { BANK_ACCOUNT_FORM_PAGE } from "../../../route/applicationRoute";
export default {
  components: { borderButton, ApplicationIcon },
  methods: {
    onClick() {
      uni.navigateTo({ url: BANK_ACCOUNT_FORM_PAGE().url });
    },
  },
};
</script>