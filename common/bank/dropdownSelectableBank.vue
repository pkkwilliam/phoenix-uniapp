<template>
  <view>
    <view @click="show = true">
      <u-input
        disabled
        placeholder="請選擇銀行"
        type="select"
        v-model="value"
      />
    </view>
    <u-picker
      confirmText="確認"
      keyName="label"
      :closeOnClickOverlay="true"
      :columns="banks"
      :show="show"
      @cancel="show = false"
      @close="show = false"
      @confirm="onSelect"
    />
  </view>
</template>

<script>
import { BANKS, getBankLabelByKey } from "../../enum/bank";
export default {
  computed: {
    banks() {
      return [BANKS.map((bank) => ({ ...bank, value: bank.key }))];
    },
    value() {
      return getBankLabelByKey(this.bank);
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onSelect(selectedEvent) {
      const { value } = selectedEvent;
      const { key } = value[0];
      console.log("selected bank key:", key);
      this.$emit("onSelect", key);
      this.show = false;
    },
  },
  props: {
    bank: {
      default: undefined,
      type: String,
    },
  },
};
</script>