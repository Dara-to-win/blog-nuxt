<template>
  <div class="sider">
    <div class="tips">
        <h2>{{info.helloInfo}}</h2>
        <p>{{info.tipInfo}}</p>
    </div>
    <div class="info">
        <el-carousel :height="100">
            <el-carousel-item v-for="(index, item) in imgList" :key="index">
                <img :src="item.imgPath" alt="个人信息">
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const info = ref(getHelloInfo())
const imgList = [
    {
        imgPath: '/_nuxt/assets/img/avatar.jpg',
        url: ''
    },
    {
        imgPath: '/_nuxt/assets/img/avatar.jpg',
        url: ''
    }
]
</script>

<style scoped lang='less'>
.sider {
    margin-left: 10px;
    display: none;
    background-color: pink;
    width: 240px;
    .tips {
        display: flex;
        height: 100px;
        flex-direction: column;
        background-color: #fff;
        justify-content: center;
        padding-left: 20px;
        border: 1px solid rgba(30, 128, 255, 0.5);
        p {
            margin-top: 5px;
            font-size: 16px;
        }
    }
    .info {
        width: 240px;
        height: 240px;
    }
}
@media screen and (min-width: 992px){
    .sider {
        display: block;
    }
}
@media screen and (min-width: 1400px){
    .sider {
        display: block;
    }
}
</style>