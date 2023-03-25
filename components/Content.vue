<template>
  <div class="essay">
    <div class="preview">
        <div class="right" v-if="essay.snapshot !== ''? true:false">
            <img :src="essay.snapshot" alt="">
        </div>
        <div class="left">
            <h3 class="mb-8">{{essay.title}}</h3>
            <el-tag class="mb-8"> {{ essay.category }}</el-tag>
            <div class="info">
                <div class="feedback">
                    <ul>
                        <li>
                            <img src="/img/view.png" alt="">
                            <span>{{essay.viewCount}}</span>
                        </li>
                        <li>
                            <img src="/img/like.png" alt="">
                            <span>{{essay.collectCount}}</span>
                        </li>
                        <li>
                            <img src="/img/comments.png" alt="">
                            <span>{{essay.commentCount}}</span>
                        </li>
                    </ul> 
                </div>
                <div class="operate">
                    <ul>
                        <li @click="editContent">编辑</li>
                        <li @click="viewContent">浏览</li>
                        <li @click="deleteContent">删除</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
interface Essay {
    articleID: String,
    snapshot: String,
    title: String,
    preview: String,
    author: String,
    viewCount: Number,
    collectCount: Number,
    commentCount: Number,
    avatar: String,
    category: String,
    articleStatus: Number,
    currentTime: String
}
const props = defineProps<{
    essay: Essay
}>()
const router = useRouter()
const editContent = () => {
    router.push({
        path: '/editor',
        query: {
            id: props.essay.articleID
        }
    })
}
const viewContent = () => {
    router.push({
        path: `/detail/${props.essay.articleID}`,
    })
}
const deleteContent = () => {
    
}

</script>

<style scoped lang='less'>
.mb-8 {
    margin-bottom: 8px;
}
.essay {
    width: 100%;
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #ccc;
    .info {
        color: #9ea6b0;
        font-size: 14px;
        span {
            padding-right: 10px;
        }
    }
    .preview {
        width: 100%;
        display: flex;
        .left {
            // width: calc(100% - 144px);
            // width: 100%;
            flex: 1;
            // 解决右边元素失效的问题   https://baijiahao.baidu.com/s?id=1721899116766856090&wfr=spider&for=pc
            overflow: hidden;
            h3 {
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis; 
               font-weight: 500;
            }
            .word {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #9ea6b0;
            }
            .info {
                display: flex;
                justify-content: space-between;
                .feedback ul {
                    display: flex;
                    li {
                        display: flex;
                        margin-right: 20px;
                        height: 20px;
                        align-items: center;
                        img {
                            width: 14px;
                            height: 14px;
                        }
                        span {
                            margin-left: 4px;
                            font-size: 13px;
                        }
                    }
                }
                .operate ul {
                    display: flex;
                    li {
                        padding: 0 10px;
                        font-size: 13px;
                        cursor: pointer;
                    }
                }
            }
        }
        .right {
            width: 120px;
            margin-right: 24px;
            img {
                width: 120px;
                height: 80px;
                object-fit: contain;
            }
        }
    }
}
</style>