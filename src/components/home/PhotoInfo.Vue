<template>
  <div class="photoinfo-container">
    <h1>{{ photoinfo.title }}</h1>
    <div class="time">
      <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
      <span>浏览：{{ photoinfo.click }} 次</span>
    </div>

    <hr />

    <!-- 缩略图区域 -->
    <vue-preview :slides="list" @close="handleClose"></vue-preview>  

    <!-- content 详细信息 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件区域 -->
    <my-comments :id="id"></my-comments>
  </div>
</template>

<script>
import comments from "./Comments.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThums();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThums() {
       this.$http.get('api/getthumimages/' + this.id).then( result => {
           if (result.body.status === 0) {
               result.body.message.forEach( item => {
                   item.w = 600;
                   item.h = 400;
                   item.msrc = item.src;
               } );
               this.list = result.body.message;
           }
       } )
    },
    handleClose() {

    }
  },
  components: {
    "my-comments": comments
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  h1 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .time {
    font-size: 12px;
    color: rgb(119, 115, 115);
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .my-gallery {
      figure { 
          width: 60px;
          height: 60px;
      }
  }
}
</style>

