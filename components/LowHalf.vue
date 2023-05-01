<template>
  <transition>
    <div class="low-half">
      <div class="content">
        <el-tabs v-model="activeName" class="tabs" tab-click="handleClick">
          <el-tab-pane label="推荐" name="recommend">
            <EssayList activeName="recommend" />
          </el-tab-pane>
          <el-tab-pane label="最新" name="new">
            <EssayList activeName="new" />
          </el-tab-pane>
          <el-tab-pane label="热榜" name="hot">
            <EssayList activeName="hot" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <Sider />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("recommend");
const handleClick = (tabs: TabsPaneContext, event: Event) => {
  console.log(tabs, event);
};
</script>

<style lang='less'>
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