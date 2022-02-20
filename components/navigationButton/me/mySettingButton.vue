<template>
  <view class="row-center-container" @click="onClick">
    <application-icon iconName="gear" />
  </view>
</template>

<script>
import applicationIcon from "../../../common/icon/applicationIcon.vue";
import { MY_SETTING_PAGE } from "../../../route/applicationRoute";
export default {
  components: { applicationIcon },
  methods: {
    onClick() {
      uni.navigateTo({ url: MY_SETTING_PAGE().url });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>