<template>
  <view>
    <link-button label="屏蔽此用戶" @click="onClick" />
  </view>
</template>

<script>
import linkButton from "../../common/button/linkButton.vue";
import { CREATE_DISLIKE_AUTHOR } from "../../service/service";
export default {
  components: { linkButton },
  methods: {
    onClick() {
      const onClickConfirm = async () => {
        await this.execute(CREATE_DISLIKE_AUTHOR(this.user.sid));
        uni.showToast({
          title: "您不會再收到此用戶商品與消息",
        });
      };
      uni.showModal({
        content: "確定屏蔽此用戶",
        cancelText: "取消",
        confirmText: "確定",
        success: ({ confirm, cancel }) => {
          if (confirm) {
            onClickConfirm();
          }
        },
      });
    },
  },
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>