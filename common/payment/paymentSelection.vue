<template>
  <view>
    <view
      class="payment-channel-container"
      v-for="(paymentChannel, index) in paymentChannels"
      :key="index"
      @click="onClickPaymentMethod(paymentChannel, index)"
    >
      <payment :payment="paymentChannel" />
      <u-icon
        custom-prefix="phoenix-custom-icon"
        :color="
          selectedPaymentIndex === index ? styles.primary : styles.secondary
        "
        :name="
          selectedPaymentIndex === index
            ? 'checkmark-circle-fill'
            : 'close-circle-fill'
        "
      />
    </view>
  </view>
</template>

<script>
import { M_PAY, ALIPAY, WECHAT_PAY } from "../../enum/paymentChannel";
import payment from "./payment.vue";
import styles from "../../css/theme";
const PAYMENT_CHANNELS = [M_PAY, ALIPAY, WECHAT_PAY];
export default {
  components: { payment },
  computed: {
    paymentChannels() {
      return PAYMENT_CHANNELS;
    },
    styles() {
      return styles;
    },
  },
  data() {
    return { selectedPaymentIndex: -1 };
  },
  methods: {
    onClickPaymentMethod(paymentChannel, index) {
      // setOrderConfirmPaymentChannel(this.$store, paymentChannel);
      this.selectedPaymentIndex = index;
      this.$emit("onSelectPaymentChannel", paymentChannel);
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-channel-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 35rpx;
  margin-top: 35rpx;
}
</style>