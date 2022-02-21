<template>
  <view class="row-center-container full-width">
    <u-input
      placeholder="請輸入發送內容..."
      v-model="text"
      :clearable="false"
      :customStyle="inputStyle"
    />
    <u-button
      class="fit-content-button medium-margin-left-spacer"
      size="mini"
      type="success"
      @click="onClickSubmit"
      >發送
    </u-button>
  </view>
</template>

<script>
import { CREATE_CHAT_MESSAGE } from "../../service/service";
import { MESSAGE_CONTENT_MESSAGE_STRING } from "../../enum/messageContent";
import { MESSAGE_TYPE_PRIVATE } from "../../enum/messageType";
import { updateMessages } from "../../util/chatUtil";
export default {
  computed: {
    inputStyle() {
      return {
        "background-color": "#f6f6f6",
        "border-radius": "8px",
        "padding-left": "8px",
      };
    },
  },
  data() {
    return { text: undefined };
  },
  methods: {
    async onClickSubmit() {
      const text = this.getCleanMessageText(this.text);
      if (text === "") {
        uni.showToast({
          title: "不能發送空白消息",
          icon: "none",
        });
      } else {
        const requestBody = {
          content: this.getCleanMessageText(this.text),
          messageContent: MESSAGE_CONTENT_MESSAGE_STRING.key,
          messageType: MESSAGE_TYPE_PRIVATE.key,
        };
        this.text = undefined;
        const response = await this.execute(
          CREATE_CHAT_MESSAGE(this.toUserSid, requestBody)
        );
        updateMessages(this.$store, [response]);
      }
    },
    getCleanMessageText(text) {
      while (text.length > 0 && text.charAt(0) === " ") {
        text = text.substring(1, text.length);
      }
      return text;
    },
  },
  props: {
    toUserSid: String,
  },
};
</script>

<style lang="scss" scoped>
.button {
}
</style>