<template>
  <div class="container">
    <div class="nav">
      <div class="left">
        <!-- logo区域 -->
        <div class="logo">
          <a href="/"><img src="/img/logo.png" alt="" /></a>
          <h1 class="logo-title">个人博客</h1>
        </div>
        <!-- 功能列表 -->
        <div class="nav-list">
          <ul>
            <li>
              <div><a href="/">首页</a></div>
            </li>
            <li>
              <client-only>
                <el-popover
                  placement="bottom-start"
                  width="200px"
                  trigger="hover"
                >
                  <template #reference>
                    <div><a href="javascript:;">分类</a></div>
                  </template>
                  <el-tag>前端</el-tag>
                  <el-tag>后端</el-tag>
                  <el-tag>全栈</el-tag>
                  <el-tag>软件测试</el-tag>
                </el-popover>
              </client-only>
            </li>
            <li>
              <client-only>
                <el-popover
                  placement="bottom-start"
                  width="220px"
                  trigger="hover"
                  popper-style="padding: 10px 5px"
                >
                  <template #reference>
                    <div><a href="javascript:;">百宝箱</a></div>
                  </template>
                  <ul style="display: flex">
                    <li @click="goTodoList('/todo')">
                      <BaiIcon
                        name="ToDoList"
                        imgPath="/img/todo.png"
                      ></BaiIcon>
                    </li>
                    <li @click="goTodoList('/plate')">
                      <BaiIcon
                        name="车牌识别"
                        imgPath="/img/plate.jpeg"
                      ></BaiIcon>
                    </li>
                    <li @click="goTodoList('/malware')">
                      <BaiIcon
                        name="Malware检测"
                        imgPath="/img/detect.jpg"
                      ></BaiIcon>
                    </li>
                  </ul>
                </el-popover>
              </client-only>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <el-input
          v-model="keyword"
          size="large"
          placeholder="请输入搜索内容"
          @keydown.enter.native="searchContent"
        >
          <template #append>
            <el-button :icon="Search" @click="searchContent"></el-button>
          </template>
        </el-input>
      </div>
      <div class="right">
        <!-- 创作者中心 -->
        <NuxtLink to="/manage/content"
          ><el-button type="primary" class="mr-15"
            >创作者中心</el-button
          ></NuxtLink
        >

        <!-- 主题切换图标 -->
        <input
          id="modeCheckBox"
          type="checkbox"
          :checked="pageTheme == 'theme-dark' ? true : false"
          @click="changeTheme"
        />
        <label for="modeCheckBox" class="modeCheck"></label>

        <div class="login">
          <!-- 登录 | 注册 -->
          <el-button-group v-if="!isLogin">
            <el-button type="primary" @click="changeLoginVisible"
              >登录 | 注册</el-button
            >
          </el-button-group>
          <!-- 头像 -->
          <div class="avatar" v-if="isLogin">
            <client-only>
              <el-dropdown>
                <el-avatar
                  :size="40"
                  fit="cover"
                  :src="BASE_URL + userAvatar"
                  style="margin-left: 15px; outline: none"
                ></el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="toPersonalInfo()"
                      >个人信息</el-dropdown-item
                    >
                    <el-dropdown-item divided @click="logout"
                      >退出登录</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录注册界面 -->
    <LoginDialog v-if="dialogVisible"></LoginDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const login = useStore.login();
const editor = useStore.editor();
let { keyword } = storeToRefs(editor);
// const dialogVisible = ref(false)

let { dialogVisible, activeName, isLogin, userAvatar, pageTheme } = storeToRefs(login);

watch(isLogin, async () => {
  if (login.isLogin) {
    login.loginToken = localStorage.getItem("token");
    // const { data } = await useFetch("/users/currentUser", {
    //   method: "get",
    //   baseURL: getBaseUrl(),
    //   headers: {
    //     Authorization: login.loginToken
    //   }
    // });
    const result = await useCurrentUser(
      {},
      {
        Authorization: login.loginToken,
      }
    );
    if (result?.code === 200) {
      // console.log(data.value.data);
      login.userAvatar = result.data.avatar;
    } else {
      ElMessage({
        message: result.msg,
        type: "error",
      });
    }
  }
});

onMounted(async () => {
  if (localStorage.getItem("theme")) {
    login.pageTheme = localStorage.getItem("theme");
    document.body.setAttribute("class", login.pageTheme);
  }
  if (localStorage.getItem("token")) {
    login.loginToken = localStorage.getItem("token");
    login.isLogin = true;
    setTimeout(() => {
      getCurrentUser();
    }, 1000);
  }
});

async function searchContent() {
  // const result = await getSearchArticles({
  //   search: search.value
  // }, {});
  if(keyword.value !== ""){
    await navigateTo({path: "/search", query: {keyword: keyword.value}}, {replace: true});
  }
}

async function getCurrentUser() {
  const result = await useCurrentUser(
    {},
    {
      Authorization: login.loginToken,
    }
  );
  if (result?.code === 200) {
    // console.log(data.value.data);
    login.userAvatar = result.data.avatar;
  } else {
    ElMessage({
      message: result.msg,
      type: "error",
    });
  }
}

async function toPersonalInfo() {
  await navigateTo("/personal");
}

async function logout() {
  const result = await userLogout(
    {},
    { Authorization: localStorage.getItem("token") }
  );
  if (result?.code === 200) {
    ElMessage({
      message: result.msg === "success" ? "注销成功" : result.msg,
      type: "success",
    });
    login.isLogin = false;
    localStorage.removeItem("token");
  } else {
    ElMessage({
      message: result.msg,
      type: "error",
    });
  }
}

function changeTheme() {
  if (login.pageTheme === "theme-white") {
    login.pageTheme = "theme-dark";
  } else {
    login.pageTheme = "theme-white";
  }
  document.body.setAttribute("class", login.pageTheme);
  localStorage.setItem("theme", login.pageTheme);
  // console.log("changeTheme");
}

function changeLoginVisible() {
  login.setLoginDialog(true);
}

async function goTodoList(path) {
  if (path === "/todo") {
    await navigateTo(path);
  } else {
    ElMessage({
      message: "功能维护中，敬请期待！",
      type: "error",
    });
  }
}
</script>

<style scoped lang="less">
// 导入主题样式
@import "~/assets/css/theme/var.less";
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "思源宋体 Medium";
  font-weight: 500;
  src: url("//at.alicdn.com/wf/webfont/PnLWAYMKXmYB/RKkdfWHQ1LLu.woff2") format("woff2"),
    url("//at.alicdn.com/wf/webfont/PnLWAYMKXmYB/ssV1OuCG3Vu3.woff") format("woff");
  font-display: swap;
}

.el-tag {
  margin: 3px 5px;
  cursor: pointer;
}
.mr-15 {
  margin-right: 15px;
}
.container {
  background-color: @search;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
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
          font-family: "思源宋体 Medium";
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
            #baibao {
              display: flex;
              background-color: pink !important;
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
        background: url("/img/moon.png") no-repeat center;
        background-size: 30px 30px;
        display: block;
        width: 40px;
        height: 40px;
      }
      #modeCheckBox:checked + .modeCheck::after {
        content: "";
        background: url("/img/sun.png") no-repeat center;
        background-size: 30px 30px;
        display: block;
        width: 40px;
        height: 40px;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .nav {
      width: 750px;
      transition: all 0.3s;
      padding: 0 0;
    }
  }
  @media screen and (min-width: 992px) {
    .nav {
      width: 850px;
      transition: all 0.3s;
      padding: 0 0;
      .logo-title {
        display: block !important;
      }
    }
  }
  @media screen and (min-width: 1400px) {
    .nav {
      width: 1100px;
      transition: all 0.3s;
      padding: 0 0;
      .logo-title {
        display: block !important;
      }
    }
  }
}
</style>