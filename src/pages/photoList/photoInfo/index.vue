<template>
    <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <img class="preview-img" height="100" v-for="(item,index) in list" :key="item.src" :src="item.src" @click="$preview.open(index, list)">
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>

    // 引入 评论子组件
    import comment from '../../../components/comment/index.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,  // 从路由中获取图片id
                photoinfo: {},  // 存放图片详情数据
                list: []  // 存放缩略图数据
            }
        },
        created() {
            this.getPhotoInfo(),
            this.getThum()
        },
        methods: {
            // 图片详情
            getPhotoInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    // console.log(result)
                    this.photoinfo = result.body.message[0]
                })
            },
            // 缩略图
            getThum() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    // console.log(result)
                    if (result.body.status === 0) {
                        // 循环每个图片设置宽高
                        result.body.message.forEach(item => {
                            item.w = 600
                            item.h = 400
                        });
                        this.list = result.body.message
                    }
                })
            }
        },
        // 注册 评论子组件
        components: {
            comment
        }
    }
</script>

<style lang="less">
    .photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>