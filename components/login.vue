<template>
  <view>
    <u-form labelPosition="top" ref="uForm">
      <u-form-item label="電話">
        <selectable-country-code
          class="medium-margin-right-spacer"
          v-model="countryCode"
        />
        <u-input
          border="none"
          placeholder="請輸入你的手機號"
          type="number"
          v-model="smsNumber"
        />
      </u-form-item>
      <u-form-item label="密碼">
        <u-input
          border="none"
          placeholder="請輸入登錄密碼"
          type="password"
          v-model="password"
        />
      </u-form-item>
      <u-button
        type="primary"
        :disabled="sumbitButtonDisabled"
        @click="onClickLogin"
      >
        登錄
      </u-button>
    </u-form>
  </view>
</template>

<script>
import { LOGIN } from "../service/service";
import { startWebsocket } from "../util/chatUtil";
import SelectableCountryCode from "../common/phoneNumber/selectableCountryCode.vue";
export default {
  components: { SelectableCountryCode },
  computed: {
    sumbitButtonDisabled() {
      const { password, smsNumber } = this;
      return !smsNumber || !password;
    },
  },
  data() {
    return {
      countryCode: "853",
      messageResetCountDown: 0,
      password: "",
      show: false,
      smsNumber: "",
    };
  },
  methods: {
    async onClickLogin() {
      const { password, countryCode, smsNumber } = this;
      const requestBody = {
        countryCode,
        password,
        smsNumber,
      };
      this.execute(LOGIN(requestBody))
        .then((userProfile) => {
          this.$store.commit("setUserProfile", userProfile);
          this.$appStateService.getStatusSummary();
          startWebsocket(this.execute, this.$store);
          uni.navigateBack();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
