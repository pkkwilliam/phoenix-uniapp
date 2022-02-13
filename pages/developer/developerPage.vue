<template>
  <view class="container">
    <view class="medium-margin-top-spacer">
      <text>哎呀，你怎麼進來的???</text>
    </view>
    <view class="card medium-margin-top-spacer">
      <text>Mpay 支付寶 微信支付測試</text>
      <view v-for="(paymentChannel, index) in paymentChannels" :key="index">
        <u-button @click="onClickSubmitPayment(paymentChannel.key)"
          >{{ paymentChannel.label }} $20</u-button
        >
      </view>
    </view>
    <view class="card medium-margin-top-spacer">
      <text>聊天</text>
    </view>
  </view>
</template>

<script>
import { submitMpayPayment } from "../../payment/mpay";
const PAYMENT_CHANNELS = [
  { key: "M_PAY", label: "澳門通" },
  { key: "ALIPAY", label: "支付寶" },
  { key: "WECHAT_PAY", label: "微信支付" },
];

export default {
  computed: {
    paymentChannels() {
      return PAYMENT_CHANNELS;
    },
  },
  method: {
    onClickSubmitPayment(paymentChannel) {
      uni.request({
        url: `http://localhost:3081/public/developer_test/v1/get_mpay_payment_request?paymentChannel=${paymentChannel}&value=20.00`,
        method: "GET",
        success: (response) => {
          const { data, header, statusCode } = response;
          const { preSignString, requestUrl } = data;
          submitMpayPayment(data, paymentChannel);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>