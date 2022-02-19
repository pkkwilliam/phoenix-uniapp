<template>
  <view class="safe-area-inset-bottom">
    <view @click="show = true">
      <u-input
        disabled
        placeholder="請選擇銀行"
        type="select"
        v-model="label"
      />
    </view>
    <u-picker
      confirmText="確認"
      keyName="label"
      :closeOnClickOverlay="true"
      :columns="transformBankAccounts"
      :show="show"
      @cancel="show = false"
      @close="show = false"
      @confirm="onSelect"
    />
  </view>
</template>

<script>
import { getBankLabelByKey } from "../../enum/bank";
export default {
  computed: {
    transformBankAccounts() {
      const bankAccounts = this.bankAccounts.map((bankAccount) => ({
        value: bankAccount,
        label: this.getBankAccountLabel(bankAccount),
      }));
      return [bankAccounts];
    },
  },
  data() {
    return { show: false, label: undefined };
  },
  methods: {
    getBankAccountLabel(bankAccount) {
      const { bank, beneficialName, beneficialAccountNumber } = bankAccount;
      const bankLabel = getBankLabelByKey(bank);
      return `${beneficialName} ${bankLabel}-${beneficialAccountNumber}`;
    },
    onSelect(selectedEvent) {
      const { value, label } = selectedEvent.value[0];
      console.log("selected bank account value:", value);
      this.label = label;
      this.$emit("onSelect", value);
      this.show = false;
    },
  },
  props: {
    bankAccounts: {
      default: [],
      type: Array,
    },
  },
};
</script>