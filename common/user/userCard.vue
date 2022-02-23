<template>
  <view class="full-width">
    <view class="row-center-container" @click="onClick">
      <view>
        <u-avatar mode="aspectFill" :size="avatarSize" :src="user.imageUrl" />
      </view>
      <view class="column-container text-container">
        <text class="h3 black">{{ userNickname }}</text>
        <text class="h5 secondary">{{ userDescription }}</text>
      </view>
    </view>
    <view class="small-margin-top-spacer" v-if="showQualifications">
      <phone-number-verified-tag />
    </view>
    <view class="flex-end-container" v-if="showDislikeAuthorButton">
      <dislike-author-button :user="user" />
    </view>
  </view>
</template>

<script>
import DislikeAuthorButton from "../../components/dislikeAuthor/dislikeAuthorButton.vue";
import PhoneNumberVerifiedTag from "../../components/tag/phoneNumberVerifiedTag.vue";
import { LOGIN_PAGE, USER_PAGE } from "../../route/applicationRoute";

export default {
  components: { PhoneNumberVerifiedTag, DislikeAuthorButton },
  computed: {
    userDescription() {
      return this.user.description ?? "此人很多小祕密";
    },
    userNickname() {
      const { user } = this;
      return user.nickname ? user.nickname : user.sid;
    },
  },
  methods: {
    onClick() {
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
  props: {
    avatarSize: {
      default: 50,
      type: Number,
    },
    showDislikeAuthorButton: {
      default: false,
      type: Boolean,
    },
    showQualifications: {
      default: true,
      type: Boolean,
    },
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.text-container {
  margin-left: 20rpx;
}
</style>