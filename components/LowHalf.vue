<template>
  <transition>
    <div class="low-half">
      <div class="content">asas</div>
      <Sider />
    </div>
  </transition>
</template>

<script setup>
import {} from 'vue'
</script>

<style scoped lang='less'>
.low-half {
    display: flex;
    height: 2000px;
    margin: 0 auto;
    margin-top: 74px;
    justify-content: space-between;
    transition: all 0.3s;
    .content {
      width: 100%;
      background-color: skyblue;
    }
    
}
@media screen and (min-width: 768px){
    .low-half {
      width: 750px;
      transition: all 0.3s;
    }
}
@media screen and (min-width: 992px){
    .low-half {
      width: 850px;
      transition: all 0.3s;
      .content {
        width: calc(100% - 240px);
      }
    }
    
}
@media screen and (min-width: 1400px){
    .low-half {
      width: 1100px;
      transition: all 0.3s;
      .content {
        width: calc(100% - 240px);
      }
    }
}
</style>