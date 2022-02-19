<template>
  <view>
    <view class="container">
      <view class="card column-container medium-margin-top-spacer">
        <text class="h4 black bold">現有餘額</text>
        <view class="medium-margin-top-spacer">
          <display-currency-fish-coin
            size="large"
            :value="fishCoinBalance"
            v-if="isCashOutTypeFishCoin"
          />
          <display-currency-mop size="large" :value="balance" v-else />
        </view>
        <view class="medium-margin-top-spacer" v-if="isCashOutTypeFishCoin">
          <currency-ratio />
        </view>
      </view>
      <view class="card medium-margin-top-spacer">
        <view>
          <text class="h4 black bold">提取餘額</text>
        </view>
        <u-input
          placeholder="請輸入提取金額"
          type="digit"
          v-model="amount"
          :disabled="loading"
        />
        <view class="medium-margin-top-spacer">
          <text class="h4 black bold">收款賬戶</text>
          <dropdown-selectable-bank-account
            :bankAccounts="bankAccounts"
            @onSelect="onSelectToBankAccount"
          />
        </view>
      </view>
    </view>
    <view class="cu-bar foot">
      <view class="container full-width">
        <primary-button
          label="提取"
          :disabled="!disableSubmit"
          :loading="loading"
          @onClick="onClickSubmit"
        />
      </view>
    </view>
    <u-modal
      :show="showConfirmModal"
      :show-confirm-button="false"
      :show-title="false"
    >
      <view class="confirm-modal full-width">
        <view class="flex-end-center-container">
          <u-icon name="close" @click="() => (showConfirmModal = false)" />
        </view>
        <view>
          <cash-out-estimate-and-confirm
            ref="cashOutEstimateAndConfirmRef"
            :cashOutEstimate="cashOutEstimate"
            :cashOutType="cashOutType"
            :cashOutValue="amount"
            :toBankAccount="toBankAccount"
          />
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import dropdownSelectableBankAccount from "../../common/bank/dropdownSelectableBankAccount.vue";
import PrimaryButton from "../../common/button/primaryButton.vue";
import DisplayCurrencyFishCoin from "../../common/displayCurrency/displayCurrencyFishCoin.vue";
import { getRouterJsonParam } from "../../route/applicationRoute";
import { GET_CASH_OUT_ESTIMATE } from "../../service/service";
import { CASH_OUT_TYPE_FISH_COIN } from "../../enum/cashOutType";
import CashOutEstimateAndConfirm from "../../common/cashOut/cashOutEstimateAndConfirm.vue";
import CurrencyRatio from "../../common/currencyRatio/currencyRatio.vue";
import DisplayCurrencyMop from "../../common/displayCurrency/displayCurrencyMop.vue";
export default {
  components: {
    CashOutEstimateAndConfirm,
    dropdownSelectableBankAccount,
    PrimaryButton,
    DisplayCurrencyFishCoin,
    CurrencyRatio,
    DisplayCurrencyMop,
  },
  computed: {
    balance() {
      return this.$store.state.userProfile.profile.balance;
    },
    bankAccounts() {
      return this.$store.state.bankAccount.content;
    },
    isCashOutTypeFishCoin() {
      return this.cashOutType === CASH_OUT_TYPE_FISH_COIN.key;
    },
    disableSubmit() {
      return (this.amount ?? 0) < 200 || !this.toBankAccountId;
    },
    fishCoinBalance() {
      return this.$store.state.userProfile.profile.fishCoinBalance;
    },
  },
  data() {
    return {
      amount: undefined,
      cashOutEstimate: undefined,
      cashOutType: CASH_OUT_TYPE_FISH_COIN.key,
      loading: false,
      toBankAccount: undefined,
      showConfirmModal: false,
    };
  },
  methods: {
    async onClickSubmit() {
      this.cashOutEstimate = await this.execute(
        GET_CASH_OUT_ESTIMATE(this.cashOutType, this.amount)
      );
      this.showConfirmModal = true;
    },
    onSelectToBankAccount(toBankAccount) {
      this.toBankAccount = toBankAccount;
    },
  },
  onLoad(options) {
    const cashOutType = getRouterJsonParam(options, "cashOutType");
    this.cashOutType = cashOutType;
    this.$appStateService.getBankAccount();
    this.$appStateService.getUserProfile();
  },
};
</script>

<style lang="scss" scoped>
.balance {
  font-size: 38px;
  font-weight: 600;
}
.confirm-modal {
  padding: 20rpx;
}
</style>