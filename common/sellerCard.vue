<template>
  <view>
    <view class="personal-info-container">
      <view class="text-container">
        <text class="nickname">{{ userNickname }}</text>
        <text class="description">{{ userDescription }}</text>
      </view>
      <view>
        <u-avatar mode="aspectFill" size="38" :src="user.imageUrl" />
      </view>
    </view>
    <u-tag text="電話已認證" type="success" />
  </view>
</template>

<script>
export default {
  computed: {
    userDescription() {
      return this.user.description;
    },
    userNickname() {
      const { user } = this;
      return user.nickname ? user.nickname : user.sid;
    },
  },
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.personal-info-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text-container {
  color: $u-phoenix-font-dark;
  display: flex;
  flex-direction: column;
  .nickname {
    font-size: 38rpx;
    font-weight: 600;
  }
  .description {
    font-size: 28rpx;
  }
}
</style>