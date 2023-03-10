<template>
  <div class="container">
    <div class="nav">
      <div class="left">
        <!-- logo区域 -->
        <div class="logo">
          <a href="/"><img src="@/assets/img/logo.png" alt=""></a>
          <h1 class="logo-title">个人博客</h1>
        </div>
        <!-- 功能列表 -->
        <div class="nav-list">
          <ul>
            <li><div><a href="/">首页</a></div></li>
            <li>
              <client-only>
                <el-popover placement="bottom-start" width="200px" trigger="hover">
                  <template #reference>
                    <div><a href="javascript:;">分类</a></div>
                  </template>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                </el-popover>
              </client-only>
            </li>
            <li>
              <client-only>
                <el-popover placement="bottom-start" width="200px" trigger="hover">
                  <template #reference>
                    <div><a href="javascript:;">百宝箱</a></div>
                  </template>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                  <el-tag>前端</el-tag>
                </el-popover>
              </client-only>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <el-input v-model="search" size="large" placeholder="搜索内容" :suffix-icon="Search"></el-input>
      </div>
      <div class="right">
        <!-- 创作者中心 -->
        <el-button type="primary" class="mr-15">创作者中心</el-button>

        <!-- 主题切换图标 -->
        <input id="modeCheckBox" type="checkbox" @click="changeTheme">
        <label for="modeCheckBox" class="modeCheck"></label>

        <!-- 头像 -->
        <el-avatar :size="40" fit="cover" src="/_nuxt/assets/img/avatar.jpg" style="margin-left: 15px"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const search = ref('');

</script>

<style scoped lang="less">
.el-tag {
  margin: 3px 5px;
  cursor: pointer;
}
.mr-15 {
  margin-right: 15px;
}
.container {
  background-color: #fff;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  .nav {
    width: 100%;
    display: flex;
    min-width: 300px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
    .left {
      display: flex;
      .logo {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        .logo-title {
          margin-left: 5px;
          display: none;
        }
      }
      .nav-list {
        margin-left: 10px;
        ul {
          display: flex;
          align-items: center;
          height: 64px;
          li {
            font-size: 14px;
            color: #71777c;
            div {
              padding: 0 15px;
              a {
                display: inline-block;
                height: 60px;
                line-height: 60px;
              }
            }
            &:hover {
              color: #1e80ff;
              cursor: pointer;
              background-color: rgba(171, 222, 241, 0.1);
            }
            &:hover div a {
              border-bottom: 2px solid #1e80ff;
            }
          }
        }
        
      }
    }
    .search {
      width: 200px;
    }
    .right {
      display: flex;
      align-items: center;
      // 主题切换
      #modeCheckBox {
        display: none;
      }
      .modeCheck {
        margin: 0 15px;
      }
      .modeCheck::after {
          content: "";
          background: url("~/assets/img/moon.png") no-repeat center;
          background-size: 30px 30px;
          display: block;
          width: 40px;
          height: 40px;
      }
      #modeCheckBox:checked + .modeCheck::after {
          content: "";
          background: url("~/assets/img/sun.png") no-repeat center;
          background-size: 30px 30px;
          display: block;
          width: 40px;
          height: 40px;
      }
    }
    
  }
  @media screen and (min-width: 768px){
    .nav {
      width: 750px;
      transition: all 0.3s;
      padding: 0 0;
    }
  }
  @media screen and (min-width: 992px){
    .nav {
      width: 850px;
      transition: all 0.3s;
      padding: 0 0;
      .logo-title {
        display: block!important;
      }
    }
  }
  @media screen and (min-width: 1400px){
    .nav {
      width: 1100px;
      transition: all 0.3s;
      padding: 0 0;
      .logo-title {
        display: block!important;
      }
    }
  }
}
</style>