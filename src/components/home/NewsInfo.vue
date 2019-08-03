<template>
    <div class="newsinfo-container">
        <h1>{{ newsinfo.title }}</h1>
        <div class="time">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>浏览：{{ newsinfo.click }}次</span>
        </div>

        <hr>

        <div class="content" v-html="newsinfo.content">

        </div>

        <my-comments :id="id"></my-comments>
    </div>
</template>


<script>
import { Toast } from 'mint-ui';
import comments from './Comments.vue';
export default {
    data () {
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created () {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo () {
            this.$http.get('api/getnew/' + this.id).then( result => {
                if (result.body.status === 0) {
                    this.newsinfo = result.body.message[0];
                }else{
                    Toast('获取新闻详情失败');
                }
            } )
        }
    },
    components: {
        'my-comments': comments
    }
}
</script>

<style lang="scss">
.newsinfo-container {
    h1 {
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 10px 0;
    }
    .time {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        margin: 0 5px;
        img {
            width: 100%;
        }
    }
}
</style>
