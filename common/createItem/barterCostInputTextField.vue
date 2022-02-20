<template>
  <view class="cost-input-container">
    <view class="align-end-container">
      <u-button
        class="fit-content-button"
        size="small"
        shape="circle"
        type="primary"
        :disabled="disabledConfirmButton"
        :style="{ margin: 0 }"
        @click="onClickSubmit"
        >確認
      </u-button>
    </view>

    <application-tip
      class="medium-margin-top-spacer"
      label="交易確認後摸魚會發出提示"
    />
    <view
      class="
        row-center-container
        small-margin-top-spacer
        medium-margin-bottom-spacer
      "
    >
      <!-- <u-icon custom-prefix="phoenix-custom-icon" name="face" size="38" /> -->
      <face-to-face-trade-tag />
    </view>
    <u-divider :half-width="500" :use-slot="false" />
    <view class="row-center-container">
      <text class="h4">出手價</text>
      <u-input
        border="none"
        class="textfield"
        placeholder="10🐟 約等於 1 MOP"
        type="number"
        v-model="price"
        :clearable="false"
      />
    </view>
  </view>
</template>

<script>
const SELECTABLE_ITEM_SHIPPING_CHARGE_TYPE = [
  ITEM_SHIPPING_CHARGE_TYPE_INCLUDE,
  ITEM_SHIPPING_CHARGE_TYPE_CHARGE_FIXED_RATE,
];
import {
  ITEM_SHIPPING_CHARGE_TYPE_CHARGE_FIXED_RATE,
  ITEM_SHIPPING_CHARGE_TYPE_INCLUDE,
  ITEM_SHIPPING_CHARGE_TYPE_CHARGE_BY_DISTANCE,
  getShippingChargeTypeObjectByKey,
} from "../../enum/itemShippingChargeTypes";
import ApplicationTip from "../applicationTip.vue";
import ShippingCostEstimateButton from "../../components/navigationButton/shipping/shippingCostEstimateButton.vue";
import FaceToFaceTradeTag from "../../components/tag/faceToFaceTradeTag.vue";
export default {
  components: {
    ApplicationTip,
    ShippingCostEstimateButton,
    FaceToFaceTradeTag,
  },
  computed: {
    disabledConfirmButton() {
      return !this.price;
    },
    itemShippingChargeTypes() {
      return SELECTABLE_ITEM_SHIPPING_CHARGE_TYPE;
    },
  },
  data() {
    return {
      allowFaceToFace: true,
      price: undefined,
      originalPrice: undefined,
      selectedShippingChargeType: undefined,
      shippingCost: undefined,
      showFixedShippingCostTextField: false,
      showItemDimensionTextField: false,
    };
  },
  methods: {
    onChangeShippingCost() {
      this.selectedShippingChargeType =
        ITEM_SHIPPING_CHARGE_TYPE_CHARGE_FIXED_RATE.key;
    },
    onClickSubmit() {
      const {
        allowFaceToFace,
        price,
        originalPrice,
        selectedShippingChargeType,
        shippingCost,
      } = this;
      const deliveryTypeAndShippingCharge = {
        allowFaceToFace,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice),
        selectedShippingChargeType,
        shippingCost: parseFloat(shippingCost),
      };
      this.$emit("onSubmit", deliveryTypeAndShippingCharge);
    },
    onSelectShippingChargeType(shippingChargeType) {
      if (shippingChargeType === ITEM_SHIPPING_CHARGE_TYPE_CHARGE_FIXED_RATE) {
        this.showFixedShippingCostTextField = true;
        this.showItemDimensionTextField = false;
      } else if (
        shippingChargeType === ITEM_SHIPPING_CHARGE_TYPE_CHARGE_BY_DISTANCE
      ) {
        this.showFixedShippingCostTextField = false;
        this.showItemDimensionTextField = true;
        this.shippingCost = undefined;
      } else {
        this.showFixedShippingCostTextField = false;
        this.showItemDimensionTextField = false;
        this.shippingCost = undefined;
      }
    },
  },
  mounted() {
    if (this.deliveryTypeAndShippingCharge) {
      const {
        allowFaceToFace,
        price,
        originalPrice,
        selectedShippingChargeType,
        shippingCost,
      } = this.deliveryTypeAndShippingCharge;
      this.allowFaceToFace = allowFaceToFace;
      this.price = price;
      this.originalPrice = originalPrice;
      this.shippingCost = shippingCost;
      this.selectedShippingChargeType = selectedShippingChargeType;
      this.onSelectShippingChargeType(
        getShippingChargeTypeObjectByKey(selectedShippingChargeType)
      );
    }
  },
  props: {
    onSubmit: {
      default: () =>
        console.log("please override onSubmit in costInputTextField.vue"),
      type: Function,
    },
    deliveryTypeAndShippingCharge: {
      default: () => {},
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.cost-input-container {
  padding-bottom: 150rpx;
}
.textfield {
  margin-left: 20px;
}
</style>