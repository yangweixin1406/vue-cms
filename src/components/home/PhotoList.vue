<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
            v-for="(item, index) in cates"
            :key="index"
            @tap="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />

        <div class="photo-info">
          <h1 class="photo-title">{{ item.title }}</h1>
          <span class="photo-body">{{ item.zhaiyao }}</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/dist/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //分类列表数组
      list: [] //图片列表数组
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("无法获取图片信息！");
        }
      });
    },
    getPhotoListByCateId(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("无法获取数据！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  padding: 10px;
  margin: 0;
  li {
    background: #eee;
    margin-bottom: 10px;
    text-align: center;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
      border-radius: 5px;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .photo-info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      max-height: 90px;
      overflow: hidden;
      .photo-title {
        font-size: 15px;
      }
      .photo-body {
        font-size: 12px;
      }
    }
  }
}
</style>

