<template>
  <view>
    <landing-tabs-swiper-page v-if="page === 'HOME_PAGE_TAB'" />
    <barter-request-page v-if="page === 'BARTER_REQUEST_PAGE_TAB'" />
    <chat-page v-if="page === 'MESSAGE_PAGE_TAB'" />
    <my-page v-if="page === 'MY_PAGE_TAB'" />
    <u-tabbar
      :activeColor="$styles.black"
      :border="false"
      :fixed="true"
      :inactiveColor="$styles.secondary"
      :placeholder="true"
      :safeAreaInsetBottom="true"
      :value="page"
      @change="onClickItem"
    >
      <u-tabbar-item
        v-for="(tabbar, index) in tabbarItems"
        :key="index"
        :name="tabbar.toPage"
        :text="tabbar.text"
      >
        <image
          slot="active-icon"
          :class="`u-page__item${
            !tabbar.text ? '__slot-single-icon' : '__slot-icon'
          }`"
          :src="tabbar.activeImageUrl"
        ></image>
        <image
          :class="`u-page__item${
            !tabbar.text ? '__slot-single-icon' : '__slot-icon'
          }`"
          slot="inactive-icon"
          :src="tabbar.inactiveImageUrl"
        ></image>
      </u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
const HOME_PAGE_TAB = "HOME_PAGE_TAB";
const BARTER_REQUEST_PAGE_TAB = "BARTER_REQUEST_PAGE_TAB";
const CREATE_ITEM_PAGE_TAB = "CREATE_ITEM_PAGE_TAB";
const MESSAGE_PAGE_TAB = "MESSAGE_PAGE_TAB";
const MY_PAGE_TAB = "MY_PAGE_TAB";

import { CREATE_ITEM_TAB, LOGIN_PAGE } from "../../route/applicationRoute";
import BarterRequestPage from "../barterRequest/barterRequestPage.vue";
import ChatPage from "../chat/chatPage.vue";
import DeveloperPage from "../developer/developerPage.vue";
import landingTabsSwiperPage from "../landing/landingTabsSwiperPage.vue";
import MyPage from "../me/myPage.vue";
export default {
  components: {
    landingTabsSwiperPage,
    DeveloperPage,
    BarterRequestPage,
    MyPage,
    ChatPage,
  },
  computed: {
    tabbarItems() {
      return [
        {
          activeImageUrl: "../../static/tabBar/home_cur.png",
          inactiveImageUrl: "../../static/tabBar/home.png",
          toPage: HOME_PAGE_TAB,
          text: "首頁",
        },
        {
          activeImageUrl: "../../static/tabBar/barter_cur.png",
          inactiveImageUrl: "../../static/tabBar/barter.png",
          toPage: BARTER_REQUEST_PAGE_TAB,
          text: "換物",
        },
        {
          activeImageUrl: "../../static/tabBar/create_item_button.png",
          inactiveImageUrl: "../../static/tabBar/create_item_button.png",
          toPage: CREATE_ITEM_PAGE_TAB,
        },
        {
          activeImageUrl: "../../static/tabBar/chat_cur.png",
          inactiveImageUrl: "../../static/tabBar/chat.png",
          toPage: MESSAGE_PAGE_TAB,
          text: "消息",
        },
        {
          activeImageUrl: "../../static/tabBar/me_cur.png",
          inactiveImageUrl: "../../static/tabBar/me.png",
          toPage: MY_PAGE_TAB,
          text: "我的",
        },
      ];
    },
  },
  data() {
    return { page: HOME_PAGE_TAB };
  },
  methods: {
    onClickItem(page) {
      const pageRequireAuth =
        page === BARTER_REQUEST_PAGE_TAB ||
        page === CREATE_ITEM_PAGE_TAB ||
        page === MESSAGE_PAGE_TAB ||
        page === MY_PAGE_TAB;
      if (!this.isLogin() && pageRequireAuth) {
        uni.navigateTo({ url: LOGIN_PAGE().url });
      } else if (page === CREATE_ITEM_PAGE_TAB) {
        uni.navigateTo({ ...CREATE_ITEM_TAB() });
      } else {
        this.page = page;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.u-page {
  padding: 0;

  &__item {
    &__title {
      color: $u-tips-color;
      background-color: $u-bg-color;
      padding: 15px;
      font-size: 15px;

      &__slot-title {
        color: $u-primary;
        font-size: 14px;
      }
    }

    &__slot-icon {
      width: 22px;
      height: 22px;
    }
    &__slot-single-icon {
      width: 38px;
      height: 38px;
    }
  }
}
</style>