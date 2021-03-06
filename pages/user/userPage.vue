<template>
  <view class="container" :v-if="loaded">
    <view class="space-between-center-container medium-margin-top-spacer">
      <u-avatar mode="aspectFill" size="88" :src="user.imageUrl" />
      <view class="column-center-container">
        <view class="row-center-container">
          <user-like-count-button class="user-interaction-button" />
          <user-subscribe-count-button class="user-interaction-button" />
          <user-fans-count-button class="user-interaction-button" />
        </view>
        <view class="medium-margin-top-spacer full-width">
          <user-subscribe-button size="default" :user="user" />
        </view>
      </view>
    </view>
    <view class="column-container medium-margin-top-spacer">
      <view>
        <text class="h2 lightly-bold">{{ user.nickname }}</text>
      </view>
      <view class="space-between-center-container small-margin-top-spacer">
        <phone-number-verified-tag />
        <chat-message-button type="button" :toUser="user" />
      </view>
      <view class="flex-end-center-container small-margin-top-spacer">
        <dislike-author-button :user="user" />
      </view>
      <view class="small-margin-top-spacer">
        <text class="h4">{{ user.description }}</text>
      </view>
      <view class="medium-margin-top-spacer">
        <application-line-breaker />
      </view>
      <view>
        <pagination-item-display
          :serviceRequest="getItemsByUserId"
          :showSeller="false"
        >
          <template v-slot:content="{ data }">
            <view class="card medium-margin-top-spacer">
              <view class="space-between-center-container">
                <item-status-text :item="data" />
                <display-currency-fish-coin class="price" :value="data.price" />
              </view>
              <user-save-item :item="data" />
            </view>
          </template>
        </pagination-item-display>
      </view>
    </view>
  </view>
</template>

<script>
import { getRouterParam, USER_PAGE } from "../../route/applicationRoute";
import PhoneNumberVerifiedTag from "../../components/tag/phoneNumberVerifiedTag.vue";
import UserSubscribeButton from "../../components/subscribe/UserSubscribeButton.vue";
import PaginationItemDisplay from "../../common/itemDisplayList/paginationItemDisplay.vue";
import {
  GET_ITEMS_BY_USER_ID,
  GET_USER_PROFILE_BY_SID,
} from "../../service/service";
import UserSaveItem from "../../common/item/userSaveItem.vue";
import StrikeThroughCurrencyPrice from "../../common/strikeThroughCurrencyPrice.vue";
import ApplicationLineBreaker from "../../components/applicationLineBreaker.vue";
import UserLikeCountButton from "../../components/navigationButton/user/userLikeCountButton.vue";
import UserSubscribeCountButton from "../../components/navigationButton/user/userSubscribeCountButton.vue";
import UserFansCountButton from "../../components/navigationButton/user/userFansCountButton.vue";
import DisplayCurrencyFishCoin from "../../common/displayCurrency/displayCurrencyFishCoin.vue";
import ChatMessageButton from "../../components/navigationButton/chat/chatMessageButton.vue";
import DislikeAuthorButton from "../../components/dislikeAuthor/dislikeAuthorButton.vue";
import ItemStatusText from "../../components/item/itemStatusText.vue";
import {
  ITEM_STATUS_ACTIVE,
  ITEM_STATUS_PENDING,
  ITEM_STATUS_RESERVED,
  ITEM_STATUS_SOLD,
} from "../../enum/itemStatus";
export default {
  components: {
    PaginationItemDisplay,
    PhoneNumberVerifiedTag,
    UserSaveItem,
    UserSubscribeButton,
    StrikeThroughCurrencyPrice,
    ApplicationLineBreaker,
    UserFansCountButton,
    UserLikeCountButton,
    UserSubscribeCountButton,
    DisplayCurrencyFishCoin,
    ChatMessageButton,
    DislikeAuthorButton,
    ItemStatusText,
  },
  data() {
    return { loaded: false, user: {} };
  },
  methods: {
    getItemsByUserId(pageRequest, pageSize) {
      const itemStatuses = [
        ITEM_STATUS_ACTIVE.key,
        ITEM_STATUS_PENDING.key,
        ITEM_STATUS_RESERVED.key,
        ITEM_STATUS_SOLD.key,
      ];
      return GET_ITEMS_BY_USER_ID(
        this.user.sid,
        itemStatuses,
        pageRequest,
        pageSize
      );
    },
    async getUserByUserSid(userSid) {
      this.user = await this.execute(GET_USER_PROFILE_BY_SID(userSid));
    },
  },
  async onLoad(options) {
    this.user.sid = getRouterParam(options, "userSid");
    await this.getUserByUserSid(this.user.sid);
    this.loaded = true;
  },
  onReachBottom() {
    this.$appStateService.setItemPagination(USER_PAGE);
  },
};
</script>

<style lang="scss" scoped>
.user-interaction-button {
  margin-left: 30rpx;
  margin-right: 30rpx;
}
</style>