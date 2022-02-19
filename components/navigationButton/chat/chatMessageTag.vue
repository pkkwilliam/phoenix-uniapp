<template>
  <view>
    <u-tag
      icon="chat"
      plain
      shape="circle"
      size="mini"
      type="success"
      :text="label"
      @click="onClick"
    />
  </view>
</template>

<script>
import { CHAT_MESSAGE_PAGE } from "../../../route/applicationRoute";
export default {
  methods: {
    onClick() {
      uni.navigateTo({ url: CHAT_MESSAGE_PAGE(this.toUser.sid).url });
    },
  },
  props: {
    label: {
      default: "聊一聊",
      type: String,
    },
    toUser: Object,
  },
};
</script>

<style lang="scss" scoped>
.text {
  white-space: nowrap;
}
</style>