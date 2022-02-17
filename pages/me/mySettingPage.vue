<template>
  <view>
    <view class="container">
      <view class="card medium-margin-top-spacer">
        <my-profile-form />
      </view>
      <user-setting-menu />
    </view>
    <view class="largin-margin-top-spacer foot column-center-container">
      <logout-button />
      <version />
    </view>
  </view>
</template>

<script>
import MyProfileForm from "../../components/me/myProfileForm.vue";
import UserSettingMenu from "../../components/menu/userSettingMenu.vue";
import LogoutButton from "../../components/navigationButton/me/logoutButton.vue";
import Version from "../../components/version.vue";
export default {
  components: { UserSettingMenu, LogoutButton, MyProfileForm, Version },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>