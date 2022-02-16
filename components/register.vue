<template>
  <view style="padding: 10px">
    <!-- <u--form :model="form" ref="uForm"> -->
    <u--form labelPosition="top" :model="form" ref="uForm" labelWidth="auto">
      <u-form-item label="電話">
        <selectable-country-code
          class="medium-margin-right-spacer"
          v-model="countryCode"
        />
        <u--input
          border="none"
          placeholder="請輸入你的手機號"
          v-model="smsNumber"
          :type="text"
        />
        <u-button
          :disabled="requestVerificationButtonDisabled"
          size="mini"
          slot="right"
          type="success"
          @click="onClickRequestVerify"
          >{{ requestVerificationButtonLabel }}</u-button
        >
      </u-form-item>
      <u-form-item label="驗證碼">
        <u--input
          border="none"
          placeholder="請輸入由信息驗證碼"
          v-model="oneTimePassword"
        />
      </u-form-item>
      <u-form-item label="密碼">
        <u--input
          border="none"
          placeholder="請輸入登錄密碼"
          type="password"
          v-model="password"
        />
      </u-form-item>
      <u-form-item label="確認密碼">
        <u--input
          border="none"
          placeholder="請重新輸入登錄密碼"
          type="password"
          v-model="passwordConfirm"
        />
      </u-form-item>
      <u-button
        :disabled="sumbitButtonDisabled"
        type="primary"
        @click="onClickVerify"
        >註冊</u-button
      >
    </u--form>
  </view>
</template>

<script>
import { REQUEST_VERIFICATION, VERIFY } from "../service/service";
import { COUNTRY_CODES } from "../common/countryCodes";
import { LANDING_TAB } from "../route/applicationRoute";
import selectableCountryCode from "../common/phoneNumber/selectableCountryCode.vue";
export default {
  components: { selectableCountryCode },
  computed: {
    countryCodes() {
      return COUNTRY_CODES;
    },
    requestVerificationButtonDisabled() {
      return (
        this.messageResetCountDown > 0 || this.disableRequestVerificationButton
      );
    },
    requestVerificationButtonLabel() {
      return this.messageResetCountDown <= 0
        ? "獲取驗證碼"
        : `重新獲取(${this.messageResetCountDown})`;
    },
    sumbitButtonDisabled() {
      const { oneTimePassword, password, passwordConfirm, smsNumber } = this;
      return !smsNumber || !oneTimePassword || !password || !passwordConfirm;
    },
  },
  data() {
    return {
      countryCode: "853",
      disableRequestVerificationButton: false,
      messageResetCountDown: 0,
      oneTimePassword: "",
      password: "",
      passwordConfirm: "",
      selectedCountryCodeIndex: 0,
      show: false,
      smsNumber: "",
    };
  },
  methods: {
    onClickRequestVerify() {
      this.disableRequestVerificationButton = true;
      const { countryCodes, selectedCountryCodeIndex, smsNumber } = this;
      this.execute(
        REQUEST_VERIFICATION({
          countryCode: countryCodes[selectedCountryCodeIndex].value,
          smsNumber,
        })
      )
        .then((response) => this.startCountDown())
        .finally(() => (this.disableRequestVerificationButton = false));
    },
    onClickSelectCountryCodeDropdown() {
      this.show = !this.show;
    },
    onSelectCountryCode(index) {
      this.selectedCountryCodeIndex = index;
    },
    async onClickVerify() {
      const {
        countryCodes,
        oneTimePassword,
        password,
        passwordConfirm,
        selectedCountryCodeIndex,
        smsNumber,
      } = this;
      if (password !== passwordConfirm) {
        uni.showToast({
          icon: "error",
          title: "密碼不一致",
        });
      } else {
        this.execute(
          VERIFY({
            countryCode: COUNTRY_CODES[selectedCountryCodeIndex].value,
            oneTimePassword,
            password,
            smsNumber,
          })
        ).then((userProfile) => {
          this.$store.commit("setUserProfile", userProfile);
          uni.redirectTo({
            url: LANDING_TAB().url,
          });
        });
      }
    },
    startCountDown() {
      this.messageResetCountDown = 60;
      const interval = setInterval(() => {
        if (this.messageResetCountDown <= 0) {
          interval.clear();
        }
        this.messageResetCountDown--;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
