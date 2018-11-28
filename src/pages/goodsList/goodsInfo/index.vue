<template>
    <div class="goods-info-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="bannerList" :isfull="true"></swiper>
                </div>
            </div>
        </div>


        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <p class="price">
                    市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                </p>
                <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                <p class="top-margin">
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click = "getBall">加入购物车</mt-button>
                    <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 
                     1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 
                     2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值
                     3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） 
                     4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
                </p>
                </div>
            </div>
        </div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>

    // 引入轮播图组件
    import swiper from '../../../components/swiper/index.vue'
    // 导入 数字选择框 组件
    import numbox from "../../../components/numbox/numbox.vue";

    export default {
        data() {
            return {
                id: this.$route.params.id,
                bannerList: [],
                goodsinfo: {},
                ballFlag: false,
                selectedCount: 1 
            }
        },
        created() {
            this.getBanner()
            this.getGoodsInfo()
        },
        methods: {
            getBanner() {
                this.$http.get('api/getthumimages/' + this.id).then(reslut => {
                    reslut.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.bannerList = reslut.body.message
                })
            },
            getGoodsInfo() {
                // 获取商品的信息
                this.$http.get('api/goods/getinfo/' + this.id).then(reslut => {
                    console.log(reslut)
                    this.goodsinfo = reslut.body.message[0]
                })
            },
            goDesc(id) {
                // 点击使用编程式导航跳转到 图文介绍页面
                this.$router.push({ name: "goodsdesc", params: { id } });
            },
            goComment(id) {
                // 点击跳转到 评论页面
                this.$router.push({ name: "goodscomment", params: { id } });
            },
            // 添加到购物车
            getBall() {
                this.ballFlag = !this.ballFlag
                // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                };
                // 调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit("addToCar", goodsinfo);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done) {
                el.offsetWidth
                // 获取小球的 在页面中的位置  getBoundingClientRect() 获取元素在视口中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取 徽标 在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;
                el.style.opacity =  "1"
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count) {
                // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
                this.selectedCount = count;
                console.log("父组件拿到的数量值为： " + this.selectedCount);
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang="less">
    .goods-info-container {
        background-color: #eee;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;
            button {
            margin: 15px 0;
            }
        }
        .top-margin {
            margin-top: 10px;
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 999;
            top: 390px;
            left: 146px;
        }
    }
</style>