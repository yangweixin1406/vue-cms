<template>
  <div class="box-container">
    <!-- Header 区域，用来展示头部区域 -->
    <mt-header fixed title="个人项目">
      <span slot="left">
        <mt-button icon="back" @click="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>

    <!-- body 用来切换不同的路由页面  <router-view></router-view> -->
    <transition name="test">
      <router-view></router-view>
    </transition>

    <!-- TableBar 底部导航栏区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-my" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true
    }
  },
  created () {
    this.flag = this.$route.path === '/home' ? false : true;
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function (newVal) {
      if (newVal === '/home') {
        this.flag = false;
      }else {
        this.flag = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  .box-container {
    padding-top: 40px;
    padding-bottom: 52px;
    overflow-x: hidden;
    .mint-header {
      z-index: 99;
      .mint-button {
        padding-left: 10px;
      }
    }
    .test-enter {
      opacity: 0;
      transform: translateX(100%);
    }
    .test-leave-to {
      opacity: 0;
      transform: translateX(-100%);
      position: absolute;
    }
    .test-enter-active,
    .test-leave-active {
      transition: all 0.5s ease;
    }

    .mui-bar-tab .mui-tab-item-my.mui-active {
      color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-my {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
    }
    .mui-bar-tab .mui-tab-item-my .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
