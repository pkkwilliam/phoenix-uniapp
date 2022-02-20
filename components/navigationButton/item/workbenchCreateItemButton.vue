<template>
  <view class="space-between-center-container">
    <view class="row-center-container">
      <u-icon name="plus" size="18" />
      <view class="small-margin-left-spacer">
        <text class="h3">發布寶貝，通知鐵粉圍觀</text>
      </view>
    </view>
    <border-button
      label="去發布"
      size="mini"
      :backgroundColor="$styles.white"
      :color="$styles.darkOrange"
      @onClick="onClick"
    />
  </view>
</template>

<script>
import borderButton from "../../../common/button/borderButton.vue";
import { CREATE_ITEM_TAB } from "../../../route/applicationRoute";
export default {
  components: { borderButton },
  computed: {},
  methods: {
    onClick() {
      uni.navigateTo({ ...CREATE_ITEM_TAB() });
    },
  },
};
</script>