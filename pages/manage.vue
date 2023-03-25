<template>
  <div class="manage">
    <NuxtLink to="/editor"><el-button type="primary" round class="editor">发布文章</el-button></NuxtLink>
    <!-- <el-tabs tab-position="left" >
        <el-tab-pane label="文章管理"><NuxtLink to="/manage/content"><NuxtChild></NuxtChild></NuxtLink></el-tab-pane>
        <el-tab-pane label="评论管理"><NuxtLink to="/manage/comment"><NuxtChild></NuxtChild></NuxtLink></el-tab-pane>
    </el-tabs> -->
    <el-row class="tac">
      <el-col :span="4" class="left">
        <el-affix :offset="74">
          <el-menu
            default-active="/manage/content"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <el-menu-item index="/manage/content">
              <el-icon><document /></el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="/manage/comment">
              <el-icon><ChatSquare /></el-icon>
              <span>评论管理</span>
            </el-menu-item>
          </el-menu>
        </el-affix>
      </el-col>
      <el-col :span="20" class="right">
        <NuxtPage></NuxtPage>
      </el-col>
    </el-row>
    <!-- <el-container>
      <el-aside>
        <el-menu
          default-active="/manage/content"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/manage/content">
            <el-icon><document /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/comment">
            <el-icon><ChatSquare /></el-icon>
            <span>评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <NuxtPage></NuxtPage>
      </el-main>
    </el-container> -->

  </div>
</template>

<script setup lang='ts'>
import {} from 'vue'
const handleContent = () => {

}
</script>

<style scoped lang='less'>
.manage {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    margin-top: 74px;
    background-color: #fff;
    .editor {
        margin-bottom: 20px;
    }
    .left {
      // position: fixed;
    }
    .right {
      padding: 10px;
      border: 3px solid #ccc;
    }
}
@media screen and (min-width: 768px) {
  .manage {
    width: 750px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 992px) {
  .manage {
    width: 850px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 1400px) {
  .manage {
    width: 1100px;
    transition: all 0.3s;
  }
}
</style>