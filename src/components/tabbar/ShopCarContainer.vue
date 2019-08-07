<template>
  <div class="shopcar-container">
    <div class="goods-list" v-for="(item, i) in shopCarList" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
             v-model="$store.getters.getGoodsSelected[item.id]"
             @change="selectChanged( item.id,  $store.getters.getGoodsSelected[item.id])"></mt-switch>

            <img :src="item.thumb_path" />

            <div class="info">
              <h1>{{ item.title }}</h1>
              <span>￥{{ item.sell_price }}</span>
              <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>

              <a href="#" @click.prevent="remove(item.id, i)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getAllPrice.count }}</span> 件，总价
              <span class="red">￥{{ $store.getters.getAllPrice.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../shopcar/Numbox.vue";
export default {
  data() {
    return {
      shopCarList: []
    };
  },
  created() {
    this.getShopCarList();
  },
  methods: {
    getShopCarList() {
      const carArr = [];
      this.$store.state.car.forEach(item => carArr.push(item.id));

      if (carArr.length <= 0) {
        return;
      }

      this.$http
        .get("api/goods/getshopcarlist/" + carArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.shopCarList = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.shopCarList.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectChanged (id, val) {

        //从 store 中获取改变 selectd 方法
        this.$store.commit('updateSelectedWhenChanged', { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        margin-left: 5px;
      }
      .info {
        margin-left: 5px;
        h1 {
          font-size: 13px;
        }
        span {
          font-weight: bold;
          color: red;
        }
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
  }
}
</style>
