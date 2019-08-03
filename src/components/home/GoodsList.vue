<template>
  <div class="goods-container">
    <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img
        :src="item.img_url"
        alt
      />

      <h1>{{ item.title }}</h1>

      <div class="goods-info">
        <p class="price">
          <span class="price-now">￥{{ item.sell_price }}</span>
          <span class="price-old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span class="sell-stat">热卖中</span>
          <span class="sell-count">剩余{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
    data () {
        return {
            pageIndex: 1,
            goodsList: []
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        getGoodsList () {
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then( result => {
                if (result.body.status === 0) {
                    this.goodsList = this.goodsList.concat(result.body.message);
                }else{
                    Toast('获取商品列表失败！');
                }
            } )
        },
        getMore () {
            this.pageIndex ++;
            this.getGoodsList();
        }
    }
};
</script>

<style lang="scss" scoped>
.goods-container {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #eee;
    box-shadow: 0 0 8px #bbb;
    margin: 3px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 270px;
    padding: 2px;
    h1 {
      font-size: 16px;
    }
    img {
      width: 100%;
    }
    .goods-info {
        background: #eee;
      p {
          margin: 0;
      }
      .price {
        .price-now {
          color: red;
          font-size: 14px;
        }
        .price-old {
          font-size: 12px;
          text-decoration: line-through;
          margin-left: 5px;
        }
      }
      .sell {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>

