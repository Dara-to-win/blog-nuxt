<template>
  <div class="detail">
    <div class="left">
        点赞信息
    </div>
    <div class="content">
        
        主要内容
        <div class="down">
            分辨率低时展示点赞信息
        </div>
    </div>
    <div class="right">
        目录catalog
    </div>
    
  </div>
</template>
<script lang="ts">
export default {
  layout: "default",
}
</script>
<script setup lang="ts">
import {ref} from 'vue'
</script>

<style scoped lang='less'>
.detail {
    margin-top: 74px!important;
    height: 2000px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    .left {
        display: none;
        width: 48px;
        background-color: skyblue;
    }
    .content {
        width: 100%;
        padding: 32px 32px 0;
        box-sizing: border-box;
        margin-left: 0 10px;
        background-color: pink;
        .down {
            position: fixed;
            bottom: 0;
            z-index: 2;
            width: 100%;
            height: 48px;
            background-color: green;
        }
    }
    .right {
        margin-left: 15px;
        display: none;
        width: 240px;
        background-color: gray;
    }
    
}
@media screen and (min-width: 1000px){
    .detail {
      transition: all 0.3s;
      .content {
        width: calc(100% - 240px);
        .down {
            display: none;
        }
      }
      .right {
        display: block;
      }
    }
}
@media screen and (min-width: 1140px){
    .detail {
      transition: all 0.3s;
      .content {
        margin-left: 15px;
        width: 820px;
      }
      .left {
        display: block;
      }
    }
    
}
@media screen and (min-width: 1400px){
    .detail {
      max-width: 1100px;
      transition: all 0.3s;
      .content {
        width: calc(100% - 288px);
      }
    }
}
</style>