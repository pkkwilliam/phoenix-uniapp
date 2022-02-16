<template>
  <!-- <u-lazy-load
      :loading-img="loadingImage"
      :border-radius="borderRadius"
      :image="image"
      :imgMode="mode"
    /> -->
  <u--image
    :radius="borderRadius"
    :lazyLoad="true"
    :mode="mode"
    :src="image"
    :showLoading="true"
    width="100%"
    height="100%"
  />
</template>

<script>
import image from "@/static/image-loading.png";
export default {
  computed: {
    loadingImage() {
      return image;
    },
  },
  props: {
    borderRadius: {
      default: 8,
      type: Number,
    },
    image: String,
    mode: {
      default: "widthFix",
      type: String,
    },
  },
};
</script>