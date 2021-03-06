<template>
  <view class="container" v-if="loaded">
    <view class="card medium-margin-top-spacer">
      <user-card :showQualifications="false" :user="barterRequest.createBy" />
      <view class="medium-margin-top-spacer">
        <text class="h3">{{ info }}</text>
      </view>
      <view class="medium-margin-top-spacer">
        <barter-request-price-difference-row :barterRequest="barterRequest" />
      </view>
      <view class="row-container medium-margin-top-spacer" v-if="isPending">
        <u-icon name="clock" />
        <text class="h4 brown">{{ expiryCountDown }}</text>
      </view>
      <view class="medium-margin-top-spacer" v-if="showOrder">
        <view class="flex-end-center-container">
          <text class="h4 blue underline" @click="navigateToOrderPage">
            前往訂單
          </text>
        </view>
      </view>
    </view>
    <view class="card medium-margin-top-spacer space-between-center-container">
      <chat-message-tag :toUser="oppositeParty" />
      <text :class="statusTextStyle">{{ statusText }}</text>
    </view>
    <view class="card medium-margin-top-spacer">
      <text class="h3 black bold">想要物品</text>
      <application-line-breaker />
      <view class="medium-margin-top-spacer">
        <text class="h5 secondary">
          {{ createTimeConverter(barterRequest.requestItem.createTime) }}
        </text>
      </view>
      <sold-item
        class="small-margin-top-spacer"
        :clickable="true"
        :item="barterRequest.requestItem"
      />
    </view>
    <view class="card medium-margin-top-spacer">
      <text class="h3 black bold">交換物品</text>
      <application-line-breaker />
      <view
        class="medium-margin-top-spacer"
        v-for="(item, index) in barterRequest.offerItems"
        :key="index"
      >
        <text class="h5 secondary">
          {{ createTimeConverter(item.createTime) }}
        </text>
        <sold-item class="small-margin-top-spacer" :item="item" />
      </view>
    </view>
    <view class="medium-margin-top-spacer">
      <view v-if="showReceiverButton">
        <u-button
          shape="circle"
          type="error"
          :plain="true"
          @click="onClickReject"
        >
          殘忍拒絕
        </u-button>
        <u-button shape="circle" type="primary" @click="onClickApprove">
          接受換物
        </u-button>
      </view>

      <u-button
        shape="circle"
        type="error"
        v-if="showOffererButton"
        :plain="true"
        @click="onClickCancel"
        >取消換物
      </u-button>
    </view>
  </view>
</template>

<script>
import BarterRequestPriceDifferenceRow from "../../common/barterRequest/barterRequestPriceDifferenceRow.vue";
import SoldItem from "../../common/item/soldItem.vue";
import userCard from "../../common/user/userCard.vue";
import ApplicationLineBreaker from "../../components/applicationLineBreaker.vue";
import {
  BARTER_ROLE_OFFERER,
  BARTER_ROLE_RECEIVER,
} from "../../enum/barterRole";
import {
  BARTER_ORDER_DETAIL_PAGE,
  getRouterJsonParam,
} from "../../route/applicationRoute";
import { convertSystemDateToDisplayDateYear } from "../../util/dateUtil";
import {
  getBarterRequestExpiryCountDown,
  getBarterRequestInfo,
  getBarterRequestStatusLabel,
  getBarterRequestStyleByStatus,
  getOppositePartyUser,
} from "../../common/barterRequest/barterRequestUtil";
import {
  GET_BARTER_ORDER_BY_BARTER_REQUEST_ID,
  GET_BARTER_REQUEST_BY_ID,
  UPDATE_BARTER_REQUEST_OFFERER,
  UPDATE_BARTER_REQUEST_RECEIVER,
} from "../../service/service";
import {
  BARTER_REQUEST_APPROVED,
  BARTER_REQUEST_CANCELED,
  BARTER_REQUEST_PENDING,
  BARTER_REQUEST_REJECTED,
} from "../../enum/barterRequestStatus";
import ChatMessageTag from "../../components/navigationButton/chat/chatMessageTag.vue";

export default {
  components: {
    userCard,
    ApplicationLineBreaker,
    SoldItem,
    BarterRequestPriceDifferenceRow,
    ChatMessageTag,
  },
  computed: {
    expiryCountDown() {
      return getBarterRequestExpiryCountDown(this.barterRequest);
    },
    info() {
      return getBarterRequestInfo(this.barterRequest, this.$store);
    },
    isPending() {
      return (
        this.barterRequest.barterRequestStatus === BARTER_REQUEST_PENDING.key
      );
    },
    oppositeParty() {
      return getOppositePartyUser(this.barterRequest);
    },
    showOffererButton() {
      return (
        this.barterRequest.barterRequestStatus === BARTER_REQUEST_PENDING.key &&
        this.barterRequestType === BARTER_ROLE_OFFERER.key
      );
    },
    showOrder() {
      return (
        this.barterRequest.barterRequestStatus === BARTER_REQUEST_APPROVED.key
      );
    },
    showReceiverButton() {
      return (
        this.barterRequest.barterRequestStatus === BARTER_REQUEST_PENDING.key &&
        this.barterRequestType === BARTER_ROLE_RECEIVER.key
      );
    },
    statusText() {
      return getBarterRequestStatusLabel(this.barterRequest);
    },
    statusTextStyle() {
      return getBarterRequestStyleByStatus(this.barterRequest);
    },
  },
  data() {
    return {
      barterRequest: {},
      barterRequestType: BARTER_ROLE_OFFERER.key,
      loaded: false,
    };
  },
  methods: {
    createTimeConverter(dateTime) {
      return (
        "創建時間:" +
        convertSystemDateToDisplayDateYear(new Date(dateTime.substring(0, 10)))
      );
    },
    onClickApprove() {
      this.execute(
        UPDATE_BARTER_REQUEST_RECEIVER(
          this.barterRequest.id,
          BARTER_REQUEST_APPROVED.key
        )
      ).then((response) => this.navigateToOrderPage());
    },
    onClickCancel() {
      uni.showModal({
        content: "取消換物請求?",
        cancelText: "取消",
        confirmText: "確定",
        success: async ({ confirm, cancel }) => {
          if (confirm) {
            this.execute(
              UPDATE_BARTER_REQUEST_OFFERER(
                this.barterRequest.id,
                BARTER_REQUEST_CANCELED.key
              )
            ).then((response) => {
              this.onCancelOrReject();
            });
          }
        },
      });
    },
    onClickReject() {
      uni.showModal({
        content: "婉拒換物請求?",
        cancelText: "取消",
        confirmText: "確定",
        success: ({ confirm, cancel }) => {
          if (confirm) {
            this.execute(
              UPDATE_BARTER_REQUEST_RECEIVER(
                this.barterRequest.id,
                BARTER_REQUEST_REJECTED.key
              )
            ).then((response) => {
              this.onCancelOrReject();
            });
          }
        },
      });
    },
    async onCancelOrReject() {
      uni.showToast({ title: "取消成功" });
      this.$appStateService.getStatusSummary({ force: true });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      uni.navigateBack();
      this.$store.commit("setBarterRequestSummaryDirty", true);
    },
    async navigateToOrderPage() {
      const { id } = this.barterRequest;
      const barterOrder = await this.execute(
        GET_BARTER_ORDER_BY_BARTER_REQUEST_ID(id)
      );
      uni.navigateTo({ url: BARTER_ORDER_DETAIL_PAGE(barterOrder.id).url });
    },
  },
  async onLoad(options) {
    await this.$appStateService.getUserProfile();
    const barterRequestId = getRouterJsonParam(options, "barterRequestId");
    this.barterRequest = await this.execute(
      GET_BARTER_REQUEST_BY_ID(barterRequestId)
    );
    this.barterRequestType = this.barterRequest.barterRole;
    this.loaded = true;
  },
};
</script>

<style lang="scss" scoped>
</style>