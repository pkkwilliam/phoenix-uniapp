<template>
  <view class="container">
    <pagination-item-display
      ref="paginationItemDisplayRef"
      :serviceRequest="getCreatedItemServiceRequest"
    >
      <template v-slot:content="{ data }">
        <view class="user-created-item-container">
          <user-created-item :item="data" @onItemDeleted="onItemUpdated" />
        </view>
      </template>
    </pagination-item-display>
  </view>
</template>

<script>
import userCreatedItem from "../../common/item/userCreatedItem.vue";
import paginationItemDisplay from "../../common/itemDisplayList/paginationItemDisplay.vue";
import { ITEM_STATUS_ACTIVE } from "../../enum/itemStatus";
import { GET_ITEMS_BY_USER_ID } from "../../service/service";
export default {
  components: { paginationItemDisplay, userCreatedItem },
  methods: {
    getCreatedItemServiceRequest(pageRequest, pageSize) {
      const itemStatuses = [ITEM_STATUS_ACTIVE.key];
      return GET_ITEMS_BY_USER_ID(
        this.$store.state.userProfile.profile.sid,
        itemStatuses,
        pageRequest,
        pageSize
      );
    },
    onItemUpdated() {
      this.$refs.paginationItemDisplayRef.resetPagination();
      this.$refs.paginationItemDisplayRef.getServiceResponse();
    },
  },
  mounted() {},
  onReachBottom() {
    this.$refs.paginationItemDisplayRef.getServiceResponse();
  },
};
</script>

<style lang="scss" scoped>
.user-created-item-container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20rpx;
  margin-top: 20rpx;
}
</style>