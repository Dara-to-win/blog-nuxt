<template>
  <div class="author">
    <div class="info">
        <el-avatar :size="40" fit="cover" :src="contentText.authorImg" style="margin-left: 15px"></el-avatar>
        <div class="right">
            <h5>{{contentText.authorName}}</h5>
            <p>{{contentText.authorIntro}}</p>
        </div>
    </div>
    <div class="record">
        <ul>
            <li>
                <i class="iconfont icon-dianzan_kuai"></i>
                <span >获得点赞 {{contentText.zan}}</span>
            </li>
            <li>
                <i class="iconfont icon-yanjing"></i>
                <span >文章被阅读 {{contentText.zan}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {} from 'vue'
const props = defineProps<{
    contentText
}>()
</script>

<style scoped lang='less'>
.author {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    .info {
        display: flex;
        border-bottom: 1px solid #ccc;
        padding-top: 10px;
        padding-bottom: 15px;
        .right {
            margin-left: 10px;
        }
    }
    .record {
        padding: 15px;
        ul li {
            i {
                font-size: 14px;
                color: #7bb9ff
            }
            span {
                margin-left: 10px;
            }
        }
    }
}
</style>