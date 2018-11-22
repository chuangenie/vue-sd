<template>
    <div class="comment-container">
        <h2>发表评论</h2>
        <hr>
        <textarea placeholder="请输入您要bb的内容 ! 最多bb20字" maxlength="120" v-model="userComment"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="comment-list">
        <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="comment-title">第{{index + 1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
            <div class="comment-content">
                {{item.content || '此人没有bb'}}
            </div>
        </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>

    import { Toast } from 'mint-ui'

    export default {
        props: ["id"],
        data() {
            return {
                pageIndex: 1,
                commentList: [],
                userComment: ""
            }
        },
        created() {
            this.getComment()
        },
        methods: {
            getComment() {
                this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
                    console.log(result)
                    if (result.body.status === 0) {
                        this.commentList = this.commentList.concat(result.body.message)
                    } else {
                        Toast('获取评论数据失败, 请重试 !')
                    }
                })
            },
            getMore() {
                this.pageIndex ++,
                this.getComment()
            },
            postComment() {
                this.$http.post('api/postcomment/' + this.id, { content: this.userComment }).then(result => {
                    if (this.userComment.trim() === '') {
                        Toast('请bb一些内容')
                    } else if (result.body.status === 0) {
                        Toast(result.body.message)
                        this.pageIndex = 1
                        this.commentList = []
                        this.getComment()
                        this.userComment = ''
                    }
                })
            }
        }
    }
</script>

<style lang ="less">
.comment-container {
  .comment-list {
    .comment-item {
      margin: 5px 0;
      .comment-title {
        font-size: 13px;
        background-color: #ccc;
      }
      .comment-content {
        font-size: 13px;
      }
    }
  }
}
</style>
