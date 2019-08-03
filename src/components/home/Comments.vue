<template>
    <div class="cmt-container">
        <h3>评论区</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120个字）" maxlength="120" v-model="msg" @keyup.enter="postComment"></textarea> 
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for=" (item, i) in comments " :key="i">
                <div class="cmt-title">
                    第{{ i + 1 }}楼 用户：{{ item.user_name }} &nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === '' ? '这些混蛋，他们什么也没留下': item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMoreComments">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            pageIndex: 1,
            comments: [],
            msg: ''
        }
    },
    created () {
        this.getComments();
    },
    methods: {
        getComments () {
            this.$http.get('api/getcomments/'+ this.id + '?pageindex=' + this.pageIndex).then( result => {
                if (result.body.status === 0) {
                    this.comments = this.comments.concat(result.body.message);
                }else {
                    Toast('评论加载失败');
                }
            } )
        },
        getMoreComments () {
            this.pageIndex ++;
            this.getComments();
        },
        postComment () {
            if (this.msg.trim().length === 0 ) {
                Toast('评论的内容不能为空。');
            }
            this.$http.post('api/postcomment/' + this.id, {
                content: this.msg.trim()
            }).then( result => {
                if (result.body.status === 0) {
                    const cmt = {
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.comments.unshift(cmt);
                    this.msg = '';
                }else {
                    Toast('评论失败');
                }
            } )
        }
    },
    props: ['id']
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    .cmt-container{
        h3 {
            font-size: 18px;
            margin-bottom: 5px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
        }
        .cmt-item{
            font-size: 13px;
            margin: 5px 0;
            .cmt-title {
                background: #ccc;
                line-height: 30px;
            }
            .cmt-body {
                text-indent: 2em;
                line-height: 30px;
            }
        }
    }
}
</style>
