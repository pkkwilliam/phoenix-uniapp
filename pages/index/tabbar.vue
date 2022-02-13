<template>
  <view>
    <u-tabbar
      :value="currentIndex"
      @change="change1"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item text="首页" icon="home" @click="onClickItem(0)" />
      <u-tabbar-item text="放映厅" icon="photo" @click="onClickItem(0)" />
      <u-tabbar-item text="直播" icon="play-right" @click="onClickItem(0)" />
      <u-tabbar-item text="我的" icon="account" @click="onClickItem(0)" />
    </u-tabbar>
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