<template>
  <view class="sticky-bottom-container-padding" v-if="loaded">
    <view class="container">
      <view class="card medium-margin-top-spacer">
        <order-confirm-item-card :item="item" />
      </view>
      <view class="card medium-margin-top-spacer">
        <application-subsection
          v-model="selectedDeliveryTypeIndex"
          :list="deliveryMethods"
        />
        <view
          class="large-margin-top-spacer"
          v-if="selectedDeliveryTypeIndex === 0"
        >
          <view>
            <text class="h4 price-primary">
              推薦使用本平台交易以保障自身權益
            </text>
          </view>
          <view class="space-between-center-container medium-margin-top-spacer">
            <text class="h4">聯絡電話</text>
            <text class="h4 black bold">{{ receiverNumber }}</text>
          </view>
        </view>
        <view class="large-margin-top-spacer" v-else>
          <view class="space-between-container">
            <!-- <text>收貨地址</text>
            <delivery-address-display :address="selectedAddress" />
          </view>
          <view class="space-between-center-container medium-margin-top-spacer">
            <text>運費</text>
            <pre-order-shipping-fee :item="item" /> -->
            <text class="h4 price-primary">
              摸魚正在尋找有意向的物流公司...\n功能會在往後版本開放
            </text>
          </view>
        </view>

        <view class="medium-margin-top-spacer">
          <text class="h4">備註</text>
          <u-input
            class="medium-margin-top-spacer"
            type="text"
            v-model="remark"
            :placeholder="remarkPlaceHolder"
          />
        </view>
      </view>
      <view class="card medium-margin-top-spacer">
        <pre-order-payment-aid />
      </view>
    </view>
    <view class="cu-bar foot bottom-container">
      <view class="flex-end-center-container full-width">
        <view class="row-center-container medium-margin-right-spacer">
          <text class="label small-margin-right-spacer">需付:</text>
          <display-currency-fish-coin class="should-pay" :value="orderCost" />
        </view>
        <view class="medium-margin-right-spacer">
          <primary-button
            label="立即交易"
            :disabled="disabledSubmitButton"
            :loading="loading"
            @onClick="onClickSubmit"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import DeliveryAddressDisplay from "../../common/address/deliveryAddressDisplay.vue";
import ApplicationSubsection from "../../common/applicationSubsection.vue";
import {
  ITEM_DELIVERY_TYPE_FACE_TO_FACE,
  ITEM_DELIVERY_TYPE_THIRD_PARTY_DELIVERY,
} from "../../enum/itemDeliveryType";
import OrderConfirmItemCard from "../../common/pre-order/preOrderConfirmItemCard.vue";
import PaymentSelection from "../../common/payment/paymentSelection.vue";
import { calculateOrderCost } from "../../common/pre-order/submitOrderUtil";
import {
  getRouterJsonParam,
  ORDER_CONFIRMED_PAGE,
} from "../../route/applicationRoute";
import PreOrderShippingFee from "../../common/pre-order/preOrderShippingFee.vue";
import StickBottomBar from "../../common/navigation/stickBottomBar.vue";
import PrimaryGradientButton from "../../common/button/primaryGradientButton.vue";
import { CREATE_ORDER, GET_ITEM } from "../../service/service";
import PreOrderPaymentAid from "../../common/pre-order/preOrderPaymentAid.vue";
import DisplayCurrencyFishCoin from "../../common/displayCurrency/displayCurrencyFishCoin.vue";
import PrimaryButton from "../../common/button/primaryButton.vue";

const DELIVERY_TYPES = [
  ITEM_DELIVERY_TYPE_FACE_TO_FACE,
  ITEM_DELIVERY_TYPE_THIRD_PARTY_DELIVERY,
];
export default {
  components: {
    DisplayCurrencyFishCoin,
    ApplicationSubsection,
    DeliveryAddressDisplay,
    OrderConfirmItemCard,
    PaymentSelection,
    PreOrderShippingFee,
    StickBottomBar,
    PrimaryGradientButton,
    PreOrderPaymentAid,
    PrimaryButton,
  },
  computed: {
    deliveryMethods() {
      return DELIVERY_TYPES.map((item) => item.label);
    },
    disabledSubmitButton() {
      const { profile } = this.$store.state.userProfile;
      const { item, selectedAddress, selectedDeliveryTypeIndex } = this;
      if (profile.balance < item.price) {
        return true;
      }
      if (selectedDeliveryTypeIndex === 1) {
        return !item || !selectedAddress;
      } else {
        return !item;
      }
    },
    orderCost() {
      return calculateOrderCost(
        this.item,
        DELIVERY_TYPES[this.selectedDeliveryTypeIndex]
      );
    },
    receiverNumber() {
      const { countryCode, smsNumber } = this.$store.state.userProfile.profile;
      return `(${countryCode}) ${smsNumber}`;
    },
    remarkPlaceHolder() {
      return this.selectedDeliveryTypeIndex === 0
        ? "請輸入當面交易備註...如: 意向交易地點、時間"
        : "請輸入備註...如: 送貨時間";
    },
  },
  data() {
    return {
      item: undefined,
      loaded: false,
      loading: false,
      remark: undefined,
      selectedAddress: undefined,
      selectedDeliveryTypeIndex: 0,
    };
  },
  async onLoad(options) {
    const itemId = getRouterJsonParam(options, "itemId");
    this.item = await this.execute(GET_ITEM(itemId));
    this.loaded = true;
  },
  methods: {
    async onClickSubmit() {
      this.loading = true;
      try {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const { item, remark, selectedAddress, selectedDeliveryTypeIndex } =
          this;
        const deliveryAddress = selectedAddress
          ? { id: selectedAddress.id }
          : undefined;
        const order = await this.execute(
          CREATE_ORDER({
            deliveryAddress,
            item: { id: item.id },
            itemDeliveryType: DELIVERY_TYPES[selectedDeliveryTypeIndex].key,
            remark,
          })
        );
        this.onCreateOrderSuccess(order);
      } finally {
        this.loading = false;
      }
    },
    onCreateOrderSuccess(order) {
      uni.navigateTo({ url: ORDER_CONFIRMED_PAGE(order).url });
    },
  },
  async mounted() {
    this.$appStateService.getUserProfile();
    await this.$appStateService.getAddress();
    const { address } = this.$store.state;
    this.selectedAddress = address.content[0];
  },
};
</script>

<style lang="scss" scoped>
.bottom-container {
  background: $u-phoenix-white;
}
</style>
