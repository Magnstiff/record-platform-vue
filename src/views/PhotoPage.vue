<script>
import axios from "@/axios";
export default {
  name: "PhotoPage",
  data() {
    return {
      photos: [],
    };
  },
  beforeMount() {
    axios.get(`/get_photos?id=${this.$route.params.id}`).then((res) => {
      this.photos = res.data;
    });
  },
  methods: {
    back() {
      this.$router.replace({ name: "home" });
    },
  },
};
</script>

<template>
  <div class="title">
    <a-button class="back" type="primary" @click="back">返回</a-button>
    <div class="title-text">共{{ photos.length }}张现场照片</div>
  </div>
  <div class="line"></div>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="photos"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-image :src="'/photos/' + item" style="max-width: 70vw" />
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.title-text {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: large;
  z-index: -1;
}
.line {
  width: 80%;
  height: 1px;
  background: #f0f0f0;
  margin: 10px auto;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50px;
  padding: 0 20px;
  margin-top: 10px;
  position: relative;
}
.back {
}
</style>
