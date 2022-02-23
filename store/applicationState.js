import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    address: {
      dirty: true,
      content: [],
    },
    bankAccount: {
      dirty: true,
      content: [],
    },
    bearerToken: "",
    business: {
      dirty: true,
      content: [],
      selectedBusinessIndex: {},
    },
    buyerPendingOrder: {
      dirty: true,
      content: [],
    },
    category: {
      dirty: true,
      content: [],
    },
    chat: {
      dirty: true,
      content: {},
      unreceivedCount: 0,
    },
    chatWebSocket: {
      dirty: true,
      refreshTime: 10000,
    },
    sellerPendingOrder: {
      dirty: true,
      content: [],
    },
    statusSummary: {
      dirty: true,
      content: {},
    },
    subCategory: {
      content: {},
    },
    userProfile: {
      dirty: true,
      profile: {},
    },
    userSaveItem: {
      dirty: true,
      content: [],
    },
    userViewItem: {
      dirty: true,
      content: [],
    },
  },
  mutations: {
    setAddress(state, addresses) {
      state.address = {
        dirty: false,
        content: addresses,
      };
    },
    setBankAccount(state, bankAccount) {
      state.bankAccount = {
        dirty: false,
        content: bankAccount,
      };
    },
    setBarterRequestSummaryDirty(state, dirty) {
      state.barterRequestSummary = {
        ...state.barterRequestSummary,
        dirty,
      };
    },
    setBarterRequestSummary(state, barterRequestSummary) {
      state.barterRequestSummary = {
        dirty: false,
        content: barterRequestSummary,
      };
    },
    setBearerToken(state, bearerToken) {
      state.bearerToken = bearerToken;
    },
    setBusiness(state, business) {
      state.business = {
        dirty: false,
        content: business,
      };
    },
    setBuyerPendingOrder(state, buyerPendingOrder) {
      state.buyerPendingOrder = {
        dirty: false,
        content: buyerPendingOrder,
      };
    },
    setCategory(state, categories) {
      state.category = {
        dirty: false,
        content: categories,
      };
    },
    setChat(state, chat) {
      state.chat = {
        ...state.chat,
        dirty: false,
        content: chat,
      };
    },
    setChatUnreceivedCount(state, unreceivedCount) {
      state.chat = {
        ...state.chat,
        unreceivedCount,
      };
    },
    setChatWebSocket(state, dirty) {
      state.chatWebSocket = {
        ...state.chatWebSocket,
        dirty,
      };
    },
    setSellerPendingOrder(state, sellerPendingOrder) {
      state.sellerPendingOrder = {
        dirty: false,
        content: sellerPendingOrder,
      };
    },
    setStatusSummary(state, statusSummary) {
      state.statusSummary = {
        dirty: false,
        content: statusSummary,
      };
    },
    setSubCategory(state, { category, subCategories }) {
      const content = state.subCategory.content;
      content[category] = subCategories;
      state.subCategory = {
        content,
      };
    },
    setUserProfile(state, userProfile) {
      state.userProfile = {
        dirty: false,
        profile: userProfile,
      };
    },
    setUserSaveItem(state, userSaveItem) {
      state.userSaveItem = {
        dirty: false,
        content: userSaveItem,
      };
    },
    setUserViewItem(state, userViewItem) {
      state.userViewItem = {
        dirty: false,
        content: userViewItem,
      };
    },
  },
});

export default store;
