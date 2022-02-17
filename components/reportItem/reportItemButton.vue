<template>
  <view>
    <link-button :label="buttonLabel" @click="onClickShowPopup" />
    <u-popup
      closeable
      mode="center"
      :round="8"
      :show="showPopup"
      @close="showPopup = false"
      @open="showPopup = true"
    >
      <view class="popup-container">
        <view>
          <text class="h3 bold">舉報類型</text>
          <u-tag
            class="small-margin-top-spacer tag"
            plain
            v-for="(reportItemType, index) in reportItemTypes"
            :key="index"
            :text="reportItemType.label"
            :type="
              selectedReportItemType === reportItemType.key ? 'warning' : 'info'
            "
            @click="selectedReportItemType = reportItemType.key"
          />
        </view>
        <view class="medium-margin-top-spacer">
          <text class="h3 bold">舉報原因</text>
          <u--input
            border="none"
            placeholder="請輸入舉報原因"
            v-model="reason"
          />
        </view>
        <view class="medium-margin-top-spacer">
          <u-button
            type="success"
            :disabled="!selectedReportItemType"
            :loading="loading"
            :text="buttonLabel"
            @click="onClickSubmit"
          />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import linkButton from "../../common/button/linkButton.vue";
import { CREATE_REPORT_ITEM } from "../../service/service";
import { REPORT_ITEM_TYPES } from "../../enum/reportItemType";
import { LOGIN_PAGE } from "../../route/applicationRoute";
export default {
  components: { linkButton },
  computed: {
    buttonLabel() {
      return "舉報";
    },
    reportItemTypes() {
      return REPORT_ITEM_TYPES;
    },
  },
  data() {
    return {
      loading: false,
      reason: undefined,
      selectedReportItemType: undefined,
      showPopup: false,
    };
  },
  methods: {
    async onClickSubmit() {
      this.loading = true;
      try {
        const requestBody = {
          item: this.item,
          reason: this.reason,
          reportItemType: this.selectedReportItemType,
        };
        await this.execute(CREATE_REPORT_ITEM(requestBody));
        uni.showModal({
          content: "感謝您的熱心幫助，我們會在24小時內完成對此物品的審查。",
          confirmText: "關閉",
          showCancel: false,
        });
      } finally {
        this.showPopup = false;
        this.loading = false;
      }
    },
    onClickShowPopup() {
      if (!this.isLogin()) {
        uni.navigateTo({ url: LOGIN_PAGE().url });
      } else {
        this.showPopup = true;
      }
    },
  },
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
.popup-container {
  padding: 20px;
}
.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>