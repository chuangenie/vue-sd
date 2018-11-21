<template>
    <div class="new-list-container">
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="">
					<div class="mui-media-body">
						<h4>{{ item.title }}</h4>
						<p class='mui-ellipsis'>
                            <span class="ctime mui-pull-left">发表时间: {{ item.add_time }}</span>
                            <span class="ctime mui-pull-right">点击: {{ item.click }} 次</span>
                        </p>
					</div>
				</a>
			</li>
		</ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'

    export default {
        created() {
            this.getNewList()
        },
        data() {
            return {
                newList: []
            }
        },
        methods: {
            getNewList() {
                this.$http.get('api/getnewslist').then( result => {
                    // console.log(result)
                    if ( result.body.status === 0 ) {
                        this.newList = result.body.message
                    } else {
                        Toast('新闻列表获取失败!请重试!')
                    }
                })
            }
        }
    }
</script>

<style lang = "less">
.new-list-container {
  .mui-table-view {
    .mui-table-view-cell > a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .mui-media-body {
      width: 100%;
      .title {
        font-size: 13px;
        font-weight: bold;
      }
      > p {
        width: 100%;
      }
      .ctime,
      .click {
        font-size: 13px;
        color: #26a2ff;
      }
    }
  }
}
</style>
