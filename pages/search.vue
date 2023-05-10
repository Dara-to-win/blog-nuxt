<template>
  <div class="low-half">
    <div class="content">
      <Essay :essay="essay" v-for="essay in essayList" @click="goEssayDetail('/detail/' + essay.id)"/>
      <el-empty description="无相关内容" v-if="!essayList.length"></el-empty>
    </div>
    <Sider />
  </div>
</template>


<script setup lang="ts">
import { storeToRefs } from "pinia";
const route = useRoute();
// const { keyword } = route.query;

const editor = useStore.editor();
let { keyword } = storeToRefs(editor);
const essayList = ref([]);

onMounted(() => {
  setTimeout(async () => {
    if(keyword.value === "") {
      keyword.value = route.query.keyword;
    }
    const result = await getSearchArticles({
      search: keyword
    }, {});
    essayList.value = result.data;
    console.log("search: ", essayList.value);
  }, 100);
  console.log("route: ", route);
});

watch(keyword, async () => {
  let timerID = null;
  debounce(1000);
  function debounce(time) { // 防抖
    if(timerID !== null) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(async () => {
      const result = await getSearchArticles({
        search: keyword
      }, {});
      essayList.value = result.data;
      // console.log("search: ", essayList.value);
    }, time);
  }
})

// editor.$subscribe((mutation: any, state: any) => {
//   if(state.)
// })

async function goEssayDetail(path) {
    await navigateTo(path);
}

</script>
<style scoped lang='less'>
.is-top {
  margin-bottom: 0px !important;
}
.low-half {
  display: flex;
  margin: 0 auto;
  margin-top: 74px;
  justify-content: space-between;
  transition: all 0.3s;
  .content {
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
  }
}
@media screen and (min-width: 768px) {
  .low-half {
    width: 750px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 992px) {
  .low-half {
    width: 850px;
    transition: all 0.3s;
    .content {
      width: calc(100% - 240px);
    }
  }
}
@media screen and (min-width: 1400px) {
  .low-half {
    width: 1100px;
    transition: all 0.3s;
    .content {
      width: calc(100% - 240px);
    }
  }
}
</style>