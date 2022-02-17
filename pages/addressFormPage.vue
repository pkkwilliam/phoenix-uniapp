<template>
  <view class="container">
    <view class="card medium-margin-top-spacer">
      <view class="medium-margin-top-spacer">
        <text class="h4 black bold">收件人</text>
        <u-input
          class="textfield"
          placeholder="請輸入收件人"
          v-model="address.contactName"
        />
      </view>
      <view class="medium-margin-top-spacer">
        <text class="h4 black bold">區號</text>
        <u-input
          class="textfield"
          placeholder="請輸入區號"
          v-model="address.countryCode"
        />
      </view>
      <view class="medium-margin-top-spacer">
        <text class="h4 black bold">電話號碼</text>
        <u-input
          class="textfield"
          placeholder="請輸入電話號碼"
          v-model="address.phoneNumber"
        />
      </view>
      <view class="medium-margin-top-spacer">
        <text class="h4 black bold">街道及門牌號</text>
        <u-input
          class="textfield"
          placeholder="請輸入街道及門牌號"
          v-model="address.street"
        />
      </view>
      <view class="medium-margin-top-spacer">
        <text class="h4 black bold">大廈及樓層</text>
        <u-input
          class="textfield"
          placeholder="請輸入大廈及樓層"
          v-model="address.unit"
        />
      </view>
      <primary-button
        class="medium-margin-top-spacer"
        :disabled="submitButtonDisabled"
        :label="submitButtonLabel"
        :loading="false"
        @click="onClickSubmit"
      >
      </primary-button>
      <view
        class="medium-margin-top-spacer row-center-center-container"
        v-if="isEdit"
      >
        <text class="h5 secondary" @click="onClickDelete">删除</text>
      </view>
    </view>
  </view>
</template>

<script>
import primaryButton from "../common/button/primaryButton.vue";
import { getRouterJsonParam } from "../route/applicationRoute";
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from "../service/service";
export default {
  components: { primaryButton },
  computed: {
    submitButtonDisabled() {
      const { contactName, countryCode, phoneNumber, street, unit } =
        this.address;
      return !countryCode || !countryCode, !phoneNumber, !street, !unit;
    },
    submitButtonLabel() {
      return this.isEdit ? "修改" : "創建";
    },
  },
  data() {
    return {
      address: {
        contactName: undefined,
        countryCode: undefined,
        phoneNumber: undefined,
        street: undefined,
        unit: undefined,
      },
      isEdit: false,
    };
  },
  methods: {
    async createAddress() {
      await this.execute(CREATE_ADDRESS(this.address));
      await this.$appStateService.getAddress({ force: true });
      uni.navigateBack();
    },
    async updateAddress() {
      await this.execute(UPDATE_ADDRESS(this.address));
      await this.$appStateService.getAddress({ force: true });
      uni.navigateBack();
    },
    async onClickDelete() {
      await this.execute(DELETE_ADDRESS(this.address));
      await this.$appStateService.getAddress({ force: true });
      uni.navigateBack();
    },
    onClickSubmit() {
      if (this.isEdit) {
        this.updateAddress();
      } else {
        this.createAddress();
      }
    },
  },
  onLoad(option) {
    const routerAddressParam = getRouterJsonParam(option, "address");
    if (routerAddressParam) {
      this.isEdit = true;
      this.address = routerAddressParam;
    }
  },
};
</script>

<style lang="scss" scoped>
.submit-button {
}
</style>