<template>
  <div>
    <comment :id="$route.params.id"></comment>
  </div>
</template>

<script>
import comment from "../../../components/comment/index.vue";

export default {
  components: {
    comment
  }
};
</script>

<style lang="less">

</style>
