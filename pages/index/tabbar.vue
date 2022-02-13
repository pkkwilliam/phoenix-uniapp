<template>
  <view>
    <u--image
      :showLoading="true"
      src="https://cdn.uviewui.com/uview/album/1.jpg"
      width="80px"
      height="80px"
      @click="click"
    />
    <u-tabbar
      :value="currentIndex"
      @change="change1"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
      <u-tabbar-item text="放映厅" icon="photo" @click="click1"></u-tabbar-item>
      <u-tabbar-item
        text="直播"
        icon="play-right"
        @click="click1"
      ></u-tabbar-item>
      <u-tabbar-item text="首页">
        <image
          class="u-page__item__slot-icon"
          slot="active-icon"
          src="https://cdn.uviewui.com/uview/common/bell-selected.png"
        ></image>
        <image
          class="u-page__item__slot-icon"
          slot="inactive-icon"
          src="https://cdn.uviewui.com/uview/common/bell.png"
        ></image>
      </u-tabbar-item>
      <u-tabbar-item text="我的" icon="account" @click="click1"></u-tabbar-item>
    </u-tabbar>
    <!-- js -->
  </view>
</template>

<script>
export default {
  data() {
    return { currentIndex: 0 };
  },
  methods: {
    onClickItem(index) {},
  },
};
</script>

<style lang="scss" scoped>
</style>