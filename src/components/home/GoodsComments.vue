<template>
    <!-- 商品评论页 -->
    <div>
        <goods-comments :id="id"></goods-comments>
    </div>
</template>

<script>
import comments from './Comments.vue';
export default {
   data () {
       return {
           id: this.$route.params.id
       }
   },
   components: {
       'goods-comments': comments
   }
}
</script>

<style lang="scss" scoped>

</style>