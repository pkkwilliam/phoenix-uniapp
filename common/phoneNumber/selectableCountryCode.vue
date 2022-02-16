<template>
  <view>
    <text @click="show = true">{{ selectedCountryCode }}</text>
    <u-picker
      confirmText="確認"
      keyName="label"
      :closeOnClickOverlay="true"
      :columns="countryCodes"
      :show="show"
      @cancel="show = false"
      @close="show = false"
      @confirm="onConfirmCountryCode"
    />
  </view>
</template>

<script>
import { COUNTRY_CODES, getLabelByKey } from "../../enum/countryCode";

export default {
  computed: {
    countryCodes() {
      const transformedCountryCodes = COUNTRY_CODES.map((countryCode) => ({
        ...countryCode,
        values: countryCode.key,
      }));
      // u-picker require a nest array so u-picker can popular multi column picker
      return [transformedCountryCodes];
    },
    selectedCountryCode() {
      return getLabelByKey(this.value);
    },
  },
  data() {
    return { show: false };
  },
  methods: {
    onClickSelectCountryCodeDropdown() {
      this.show = !this.show;
    },
    onConfirmCountryCode(selectedEvent) {
      const { value } = selectedEvent;
      const { key } = value[0];
      console.log("selected country code key:", key);
      this.$emit("input", key);
      this.show = false;
    },
  },
  props: {
    value: String,
  },
};
</script>

<style lang="scss" scoped>
</style>