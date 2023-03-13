<template>
  <div class="holder">
    <el-affix :offset="74">
        <div class="sider">
            <div class="tips">
                <h2>{{info.helloInfo}}</h2>
                <p>{{info.tipInfo}}</p>
            </div>
            <div class="info">
                <h2>联系我们</h2>
                <el-carousel height="205px">
                    <el-carousel-item v-for="(item, index) in imgList" :key="index">
                        <img :src="item.imgPath" alt="个人信息" >
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </el-affix>
    <el-backtop :right="100" :bottom="100"/>
  </div>
  
</template>

<script setup lang="ts">
import {ref} from 'vue'
const info = ref(getHelloInfo())
const imgList = ref([
    {
        imgPath: '/img/avatar.jpg',
        url: ''
    },
    {
        imgPath: '/img/avatar.jpg',
        url: ''
    },
    {
        imgPath: '/img/avatar.jpg',
        url: ''
    }
])
</script>

<style scoped lang='less'>
.holder {
    position: relative;
    width: 240px;
}
.sider {
    margin-left: 10px;
    display: none;
    width: 240px;
    .tips {
        display: flex;
        height: 100px;
        flex-direction: column;
        background-color: #fff;
        justify-content: center;
        padding-left: 20px;
        h2 {
            font-weight: 700;
        }
        p {
            margin-top: 5px;
            font-size: 13px;
        }
    }
    .info {
        margin-top: 10px;
        width: 240px;
        height: 240px;
        padding: 0 5px;
        background-color: #fff;
        box-sizing: border-box;
        h2 {
            font-size: 16px;
            font-weight: 400;
            padding: 5px 10px;
            border-bottom: 1px solid #ccc;
        }
        img {
            width: 205px;
            height: 205px;
        }
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