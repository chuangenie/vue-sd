<template>
    <div class="numbox-container">
        <div class="mui-numbox" data-numbox-min='1' ref="numBox">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="num--" :disabled="this.num<=1">-</button>
            <input v-model="num" id="test" class="mui-input-numbox" type="number" @change="countChanged" ref="numbox" />
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="num++">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 1
            }
        },
        mounted() {
            max: this.max,
            console.log(this.max)
        },
        methods: {
            countChanged() {
            // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
            // console.log(this.$refs.numbox.value);
            this.$emit("getcount", parseInt(this.$refs.numbox.value));
            }
        },
        props: ["max"],
        watch: {
            // 属性监听
            max: function(newVal, oldVal) {
            // 使用 JS API 设置 numbox 的最大值
            this.$refs.numBox().setOption('max',newVal)
            }
        }
    }
</script>

<style lang="less">
    .numbox-container {
        display: inline-block;
    }
</style>