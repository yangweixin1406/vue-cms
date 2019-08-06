<template>
  <!-- 商品详情页 -->
  <div class="desc-container">
    <h1>{{ desc.title }}</h1>
    <hr />

    <div class="body" v-html="desc.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      desc: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.desc = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss">
.desc-container {
  h1 {
    color: #226aff;
    font-size: 16px;
    text-align: center;
    margin: 20px 0;
  }
  .body {
    margin: 0 5px;
    img {
      width: 100%;
    }
  }
}
</style>
