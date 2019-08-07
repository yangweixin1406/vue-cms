<template>
  <div class="goodsinfo-container">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in lunbotu" :key="index">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;&nbsp;
            销售价：
            <span class="sell-price">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <p class="buy-info">
            购买数量：
            <my-button @getcount="getCountFromBtn" :max="goodsInfo.stock_quantity"></my-button>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addGoodsToCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComments(id)">商品评论</mt-button>
      </div>
    </div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="showball" ref="ball"></div>
    </transition>
  </div>
</template>

<script>
import AddButton from "./button/AddButton.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsInfo: {},
      showball: false,
      selectCount: 1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComments(id) {
      this.$router.push({ name: "goodscomments", params: { id } });
    },
    addGoodsToCar() {
      this.showball = !this.showball;

      const goodsinfo = {
        id: this.id,
        price: this.goodsInfo.sell_price,
        count: this.selectCount,
        selected: true
      }

      this.$store.commit('addToCar', goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      const ballPosition = this.$refs.ball.getBoundingClientRect();

      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = 'all 0.5s ease';
      done();
    },
    afterEnter(el) {
      this.showball = !this.showball;
    },
    getCountFromBtn (count) {
      this.selectCount = count;

      console.log('从子组件中获取到的数量：' + this.selectCount);
    }
  },
  components: {
    "my-button": AddButton
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background: #eee;
  overflow: hidden;
  .mint-swipe {
    height: 200px;
    text-align: center;
    .mint-swipe-item {
      img {
        height: 100%;
      }
    }
  }
  .sell-price {
    color: red;
    font-size: 16px;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: 390px;
    left: 150px;
    z-index: 99;
  }
}
</style>

