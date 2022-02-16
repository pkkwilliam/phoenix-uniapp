<template>
  <u-upload
    deletable
    multiple
    :compressed="true"
    :fileList="fileList"
    :maxCount="maxCount"
    :sizeType="['compressed']"
    @afterRead="afterRead"
    @delete="deletePic"
  />
</template>


<script>
import { GET_IMAGE_UPLOAD_TOKEN } from "../../service/service";
export default {
  computed: {
    fileList() {
      return this.value.mediaUrls;
    },
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      this.$emit("input", { ...this.value, inProgress: true });
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLength = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "處理中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLength];
        this[`fileList${event.name}`].splice(
          fileListLength,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLength++;
      }
      this.$emit("input", {
        inProgress: false,
        mediaUrls: [...this.value.mediaUrls],
      });
    },
    uploadFilePromise(url) {
      return new Promise(async (resolve, reject) => {
        const { token, uploadUrl } = await this.execute(
          GET_IMAGE_UPLOAD_TOKEN()
        );
        uni.uploadFile({
          filePath: url,
          formData: {
            token,
          },
          header: {
            "content-type": "multipart/form-data",
          },
          name: "file",
          url: uploadUrl,
          success: (response) => {
            const { accessUrl, key } = JSON.parse(response.data);
            return resolve(accessUrl + "/" + key);
          },
        });
      });
    },
  },
  async mounted() {},
  props: {
    value: {
      default: () => {},
      type: Object,
    },
    maxCount: {
      default: 6,
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>