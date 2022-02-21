<template>
  <view class="safearea-container">
    <view class="container">
      <view class="space-between-center-container medium-margin-top-spacer">
        <text class="h4" @click="onClickCancel">取消</text>
        <u-button
          class="submit-button fit-content-button"
          shape="circle"
          size="small"
          type="primary"
          :disabled="disabledSubmitButton"
          :loading="loading"
          @click="onClickSubmit"
        >
          {{ submitLabel }}
        </u-button>
      </view>
      <view class="medium-margin-top-spacer">
        <!-- <u--textarea
          border="none"
          v-model="description"
          placeholder="說說你的使用感受，入手渠道，轉手原因..."
          :height="120"
          :maxlength="9999"
        ></u--textarea> -->
        <u-input-v-1
          placeholder="說說你的使用感受，入手渠道，轉手原因..."
          type="textarea"
          v-model="description"
          :autoHeight="true"
          :height="200"
          :maxlength="9999"
        />
      </view>
      <!-- image upload -->
      <view class="medium-margin-top-spacer">
        <scroll-view class="u-scroll-view" scroll-x scroll-with-animation>
          <auto-media-uploader-v-3 v-model="selectedMedia" />
        </scroll-view>
      </view>
      <!-- item location -->
      <view class="medium-margin-top-spacer">
        <icon-sub-header iconName="map" label="物品所在地區" />
        <view class="mini-margin-top-spacer">
          <scroll-view scroll-x class="u-scroll-view" scroll-with-animation>
            <selectable-area-location-tags v-model="selectedAreaLocation" />
          </scroll-view>
        </view>
        <!-- item category and condition -->
        <view>
          <view class="label-container medium-margin-right-spacer">
            <text class="h3">分類</text>
          </view>
          <selectable-category-tags
            class="mini-margin-top-spacer"
            v-model="selectedCategory"
          />
        </view>
        <view v-if="selectedCategory">
          <view class="label-container medium-margin-right-spacer">
            <text class="h3">類型</text>
          </view>
          <selectable-sub-category-tags
            class="mini-margin-top-spacer"
            v-model="selectedSubCategory"
            :category="selectedCategory"
          />
        </view>
        <view>
          <view class="label-container medium-margin-right-spacer">
            <text class="h3">成色</text>
          </view>
          <view>
            <selectable-item-condition-tags
              class="mini-margin-top-spacer"
              v-model="selectedItemCondition"
            />
          </view>
        </view>
      </view>

      <view class="small-margin-top-spacer">
        <view class="space-between-center-container">
          <icon-sub-header iconName="rmb-circle" label="價格" />
          <view class="row-center-container" @click="onToggleCostInput">
            <view class="row-center-container medium-margin-right-spacer">
              <text class="h3 green" v-if="isPriceZero">保護環境 以物換物</text>
            </view>
            <display-currency-fish-coin :value="displayPrice" />
            <u-icon name="arrow-right" color="#a3a3a3" :size="12" />
          </view>
        </view>
        <u-popup
          round="16"
          mode="bottom"
          :show="showCostInput"
          @close="showCostInput = false"
          @open="showCostInput = true"
        >
          <view class="card">
            <barter-cost-input-text-field
              :deliveryTypeAndShippingCharge="deliveryTypeAndShippingCharge"
              @onSubmit="onConfirmDeliveryTypeAndShippingCharge"
            />
          </view>
        </u-popup>
      </view>
    </view>
  </view>
</template>

<script>
import MediaUploader from "../common/mediaUploader.vue";
import IconSubHeader from "../common/iconSubHeader.vue";
import ImageUploader from "../common/mediaUploader.vue";
import PrimaryButton from "../common/button/primaryButton.vue";
import SelectableAreaLocationTags from "../common/createItem/selectableAreaLocationTags.vue";
import SelectableCategoryTags from "../common/createItem/selectableCategoryTags.vue";
import SelectableItemConditionTags from "../common/createItem/selectableItemConditionTags.vue";
import SelectableSubCategoryTags from "../common/createItem/selectableSubCategoryTags.vue";
import CostInputTextField from "../common/costInputTextField.vue";
import { CREATE_ITEM, GET_ITEM, UPDATE_ITEM } from "../service/service";
import {
  getRouterJsonParam,
  ITEM_DETAIL_PAGE,
} from "../route/applicationRoute";
import DisplayCurrencyFishCoin from "../common/displayCurrency/displayCurrencyFishCoin.vue";
import BarterCostInputTextField from "../common/createItem/barterCostInputTextField.vue";
import AutoMediaUploader from "../common/media/autoMediaUploader.vue";
import AutoMediaUploaderV2 from "../common/media/autoMediaUploaderV2.vue";
import { ITEM_DELIVERY_TYPE_FACE_TO_FACE } from "../enum/itemDeliveryType";
import { ITEM_TYPE_BARTER } from "../enum/itemType";
import AutoMediaUploaderV3 from "../common/media/autoMediaUploaderV3.vue";
import UInputV1 from "../uni_modules/uview-ui/components/u-input-v1/u-input-v1.vue";
export default {
  components: {
    PrimaryButton,
    SelectableAreaLocationTags,
    SelectableItemConditionTags,
    IconSubHeader,
    SelectableCategoryTags,
    SelectableSubCategoryTags,
    ImageUploader,
    MediaUploader,
    CostInputTextField,
    DisplayCurrencyFishCoin,
    BarterCostInputTextField,
    AutoMediaUploader,
    AutoMediaUploaderV2,
    AutoMediaUploaderV3,
    UInputV1,
  },
  computed: {
    displayPrice() {
      let price = 0;
      if (this.deliveryTypeAndShippingCharge) {
        return (price = this.deliveryTypeAndShippingCharge.price);
      }
      return price;
    },
    disabledSubmitButton() {
      const {
        description,
        selectedAreaLocation,
        selectedCategory,
        selectedItemCondition,
        selectedMedia,
        selectedSubCategory,
      } = this;
      const { price } = this.deliveryTypeAndShippingCharge;
      if (selectedMedia.inProgress) {
        return true;
      }
      return (
        !description ||
        price === undefined ||
        price < 0 ||
        !selectedAreaLocation ||
        !selectedCategory ||
        !selectedItemCondition ||
        !selectedSubCategory ||
        selectedMedia.mediaUrls.length === 0
      );
    },
    getCategory() {
      return this.selectedCategory;
    },
    isPriceZero() {
      return this.deliveryTypeAndShippingCharge.price === 0;
    },
    submitLabel() {
      if (this.selectedMedia.inProgress) {
        return "圖片處理中";
      }
      return this.isEdit ? "修改" : "發佈";
    },
  },
  data() {
    return {
      id: undefined,
      deliveryTypeAndShippingCharge: { price: undefined },
      description: undefined,
      isEdit: false,
      itemType: ITEM_TYPE_BARTER.key,
      loading: false,
      selectedAreaLocation: undefined,
      selectedCategory: undefined,
      selectedItemCondition: undefined,
      selectedMedia: { inProgress: false, mediaUrls: [] },
      selectedSubCategory: undefined,
      showCostInput: false,
    };
  },
  methods: {
    onClickCancel() {
      uni.navigateBack();
    },
    async onClickSubmit() {
      this.loading = true;
      try {
        const serviceExecute = this.isEdit ? UPDATE_ITEM : CREATE_ITEM;
        const successToastText = this.isEdit ? "更新成功" : "創建成功";
        const { price } = this.deliveryTypeAndShippingCharge;
        const requestBody = {
          availableDeliveryTypes: [ITEM_DELIVERY_TYPE_FACE_TO_FACE.key],
          category: { id: this.selectedCategory.id },
          description: this.description,
          id: this.id,
          images: this.selectedMedia.mediaUrls.map((mediaUrl) => mediaUrl.url),
          itemCondition: this.selectedItemCondition,
          itemLocation: this.selectedAreaLocation,
          itemShippingInfo: {
            fixedShippingCharge: 0,
          },
          itemType: this.itemType,
          price,
          subCategory: { id: this.selectedSubCategory.id },
        };
        this.execute(serviceExecute(requestBody)).then((response) => {
          this.$appStateService.getStatusSummary({ force: true });
          uni.showToast({ title: successToastText });
          setTimeout(() => {
            uni.redirectTo({ url: ITEM_DETAIL_PAGE(response.id).url });
          }, 1000);
        });
      } finally {
        this.loading = false;
      }
    },
    onConfirmDeliveryTypeAndShippingCharge(values) {
      this.deliveryTypeAndShippingCharge = values;
      this.showCostInput = false;
    },
    onToggleCostInput() {
      this.showCostInput = !this.showCostInput;
    },
    setEditItem(item) {
      this.isEdit = true;
      this.description = item.description;
      this.id = item.id;
      this.selectedMedia = {
        inProgress: false,
        mediaUrls: item.images.map((image) => ({ url: image })),
      };
      this.selectedItemCondition = item.itemCondition;
      this.selectedAreaLocation = item.itemLocation;
      this.selectedCategory = item.category;
      this.selectedSubCategory = item.subCategory;
      this.deliveryTypeAndShippingCharge = {
        price: item.price,
      };
    },
  },
  async onLoad(options) {
    const itemId = getRouterJsonParam(options, "itemId");
    if (itemId) {
      const item = await this.execute(GET_ITEM(itemId));
      this.setEditItem(item);
    }
  },
};
</script>

<style scope lang="scss">
.label-container {
  white-space: nowrap;
}
.submit-button {
  font-family: monospace;
  margin: 0px;
  width: fit-content;
}
</style>