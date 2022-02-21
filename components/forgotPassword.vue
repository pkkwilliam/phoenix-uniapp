<template>
  <view style="padding: 10px">
    <!-- <u--form :model="form" ref="uForm"> -->
    <u--form labelPosition="top" ref="uForm" labelWidth="auto">
      <u-form-item label="電話">
        <selectable-country-code
          class="medium-margin-right-spacer"
          v-model="countryCode"
        />
        <u--input
          border="none"
          placeholder="請輸入你的手機號"
          type="number"
          v-model="smsNumber"
        />
        <u-button
          class="fit-content-button"
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
          type="number"
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
        >找回賬號</u-button
      >
    </u--form>
  </view>
</template>

<script>
import selectableCountryCode from "../common/phoneNumber/selectableCountryCode.vue";
import { LANDING_TAB } from "../route/applicationRoute";
import {
  FORGOT_PASSWORD_REQUEST_VERIFICATION,
  FORGOT_PASSWORD_VERIFY,
} from "../service/service";

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
      interval: undefined,
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
      const { countryCode, smsNumber } = this;
      this.execute(
        FORGOT_PASSWORD_REQUEST_VERIFICATION({
          countryCode,
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
        countryCode,
        oneTimePassword,
        password,
        passwordConfirm,
        smsNumber,
      } = this;
      if (password !== passwordConfirm) {
        uni.showToast({
          icon: "error",
          title: "密碼不一致",
        });
      } else {
        this.execute(
          FORGOT_PASSWORD_VERIFY({
            countryCode,
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
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.messageResetCountDown = 60;
      this.interval = setInterval(() => {
        if (this.messageResetCountDown <= 0) {
          clearInterval(this.interval);
        }
        this.messageResetCountDown--;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
