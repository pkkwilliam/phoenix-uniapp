<template>
  <view class="row-center-container" @click="onClick">
    <u-avatar mode="aspectFill" size="28" :src="user.imageUrl" />
    <text class="h5 secondary nickname-text">{{ userNickname }}</text>
    <u-icon
      class="icon"
      :color="styles.secondary"
      v-if="showRightArrowIcon"
      name="arrow-right"
    />
  </view>
</template>

<script>
import { USER_PAGE } from "../../route/applicationRoute";
import styles from "../../css/theme.js";
export default {
  components: {},
  computed: {
    userNickname() {
      const { user } = this;
      return user.nickname ? user.nickname : user.smsNumber;
    },
  },
  data() {
    return { styles };
  },
  methods: {
    onClick() {
      if (!this.clickable) {
        return;
      }
      if (!this.isLogin()) {
        uni.navigateTo({ ...LOGIN_PAGE() });
      } else {
        uni.navigateTo({
          url: USER_PAGE(
            this.user.sid,
            this.user.description,
            this.user.imageUrl
          ).url,
        });
      }
    },
  },
  mounted() {},
  props: {
    clickable: {
      default: true,
      type: Boolean,
    },
    showRightArrowIcon: {
      default: true,
      type: Boolean,
    },
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 15rpx;
}
.nickname-text {
  margin-left: 15rpx;
}
</style>