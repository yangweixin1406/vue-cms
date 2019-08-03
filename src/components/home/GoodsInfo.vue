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
      <div class="mui-card-header">小米，全网通，双网通版</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p class="price">
                市场价：<del>￥2199</del>&nbsp;&nbsp;&nbsp;
                销售价：<span class="sell-price">￥1999</span>
            </p>
            <div class="buy-info">
                购买数量：
                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
            </div>
            <p> 
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/dist/js/mui.min.js'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: []
    };
  },
  created() {
    this.getLunbotu();
  },
  mounted() {
      mui("mui-numbox").numbox();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.lunbotu = result.body.message;
        }
      });
    }
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
}
</style>

