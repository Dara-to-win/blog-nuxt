<template>
  <div class="personal">
    <div class="content">
      <div class="top">
        <el-avatar
          :size="60"
          fit="cover"
          :src="BASE_URL + userAvatar"
          style="margin-left: 15px; outline: none; width:60px; height:60px;"
        ></el-avatar>
        <div style="margin-left: 15px;" class="info">
          <h2 style="font-weight: 400;">{{personal.nickname}}</h2>
          <span>{{100}}总访问量</span>
          <span style="margin-left: 10px;">{{0}}粉丝</span>
          <span style="margin-left: 10px;">{{0}}排名</span>
          <span style="margin-left: 10px;">{{0}}原创</span>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <h1>基本信息</h1>
          <i class="iconfont icon-bianji bianji" @click="editInfo" v-if="!personal.isEditor">编辑</i>
          <div v-if="personal.isEditor" class="complete">
            <i class="iconfont" @click="confirm">确定</i>
            <i class="iconfont" @click="cancel" style="margin-left:10px;">取消</i>
          </div>
          <!-- <i class="name">{{ name }}</i> -->
        </div>
        <div class="body">
            <ul>
                <li>
                    <div class="left">用户昵称：</div>
                    <div class="right">
                        <span v-if="!personal.isEditor">{{personal.nickname}}</span>
                        <el-input v-else v-model="nickname"></el-input>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <span>用</span>
                        <span>户</span>
                        <span>ID：</span>
                    </div>
                    <div class="right">
                        <span>{{personal.id}}</span>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <span>性</span>
                        <span>别：</span>
                    </div>
                    <div class="right">
                        <span v-if="!personal.isEditor">{{personal.sex || "无"}}</span>
                        <el-input v-else v-model="sex"></el-input>
                    </div>
                </li>
                <li>
                    <div class="left">个人简介：</div>
                    <div class="right">
                        <span v-if="!personal.isEditor">{{personal.introduce || "无"}}</span>
                        <el-input v-else v-model="introduce"></el-input>
                    </div>
                </li>
                <li>
                    <div class="left">所在地区：</div>
                    <div class="right">
                        <span v-if="!personal.isEditor">{{personal.area || "无"}}</span>
                        <el-input v-else v-model="area"></el-input>
                    </div>
                </li>
                <li>
                    <div class="left">出生日期：</div>
                    <div class="right">
                        <span v-if="!personal.isEditor">{{personal.birth || "无"}}</span>
                        <el-input v-else v-model="birth"></el-input>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {} from "vue";
import { storeToRefs } from "pinia";

const personal = useStore.personal();
const login = useStore.login();


onMounted(()=>{
    setTimeout(()=>{
        getCurrentUser();
    }, 1000);
});

let { userAvatar, id, nickname, sex, introduce, area, birth } = storeToRefs(personal);

async function getCurrentUser() {
  const result = await useCurrentUser(
    {},
    {
      Authorization: login.loginToken,
    }
  );
  console.log("useCurrentUser: ", result);
  if (result?.code === 200) {
    // console.log(data.value.data);
    // personal.setPersonal(result.data);
    // personal.userAvatar = result.data.avatar;
    personal.id = result.data.id;
    // personal.nickname = result.data.nickname;
    const result2 = await getAuthorInfo({}, {}, personal.id);
    if(result2?.code === 200) {
      personal.userAvatar = result2.data.avatar;
      personal.nickname = result2.data.nickname;
      personal.sex = result2.data.sex;
      personal.introduce = result2.data.introduce;
      personal.area = result2.data.area;
      personal.birth = result2.data.birth;
    }else {
      ElMessage({
        message: result2.msg,
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: result.msg,
      type: "error",
    });
  }
}

function editInfo() {
    personal.isEditor = true;
}
function confirm() {
    personal.isEditor = false;
    
}
function cancel() {
    personal.isEditor = false;
    getCurrentUser();
}
</script>

<style scoped lang='less'>
.personal {
  display: flex;
  margin: 0 auto;
  margin-top: 74px;
  justify-content: space-between;
  transition: all 0.3s;
  .content {
    width: 100%;
    background-color: #fff;
    padding: 15px;
    .top {
      display: flex;
      align-items: center;
      .info {
        span {
            color: #fe5430;
            font-size: 14px;
        }
      }
    }
    .bottom {
        margin-top: 30px;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding: 5px;
            .bianji {
                color: #198cfb;
                cursor: pointer;
            }
            .complete {
                color: #198cfb;
                cursor: pointer;
            }
        }
        .body {
            padding: 10px;
            ul li {
                margin-top: 32px;
                display: flex;
                box-sizing: content-box;
                line-height: 24px;
                font-size: 14px;
                .left {
                    width: 70px;
                    margin-right: 30px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
  }
}
@media screen and (min-width: 768px) {
  .personal {
    width: 750px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 992px) {
  .personal {
    width: 850px;
    transition: all 0.3s;
    .content {
      width: calc(100%);
    }
  }
}
@media screen and (min-width: 1400px) {
  .personal {
    width: 1100px;
    transition: all 0.3s;
    .content {
      width: calc(100%);
    }
  }
}
</style>