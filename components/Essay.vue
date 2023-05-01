<template>
  <!-- <div class="essay">
    <div class="info mb-8">
        <span>{{essay.author}}</span>|
        <span>{{essay.category}}</span>|
    </div>
    <div class="preview">
        <div class="left">
            <h3 class="mb-8">{{essay.title}}</h3>
            <div class="mb-8">
                <p class="word">{{essay.preview}}</p>
            </div>
            <ul class="feedback">
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
        <div class="right" v-if="essay.snapshot !== ''? true:false">
            <img :src="essay.snapshot" alt="">
        </div>
    </div>
    
  </div> -->

  <div class="essay">
    <div class="info mb-8">
        <span>{{essay.author}}</span>|
        <span v-for="tag in essay.tags">{{tag.tagName}}</span>|
    </div>
    <div class="preview">
        <div class="left">
            <h3 class="mb-8">{{essay.title}}</h3>
            <div class="mb-8">
                <p class="word">{{essay.summary}}</p>
            </div>
            <ul class="feedback">
                <li>
                    <img src="/img/view.png" alt="">
                    <span>{{essay.viewCounts}}</span>
                </li>
                <li>
                    <img src="/img/like.png" alt="">
                    <span>{{essay.likeCounts}}</span>
                </li>
                <li>
                    <img src="/img/comments.png" alt="">
                    <span>{{essay.commentCounts}}</span>
                </li>
            </ul> 
        </div>
        <div class="right" v-if="essay.snapshot !== ''? true:false">
            <img :src="essay.snapshot" alt="">
        </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
// interface Essay {
//     articleID: String,
//     snapshot: String,
//     title: String,
//     preview: String,
//     author: String,
//     viewCount: Number,
//     collectCount: Number,
//     commentCount: Number,
//     avatar: String,
//     category: String,
//     articleStatus: Number,
//     currentTime: String
// }
interface Essay {
    id: String,
    // snapshot: String,
    title: String,
    summary: String,
    author: String,
    viewCounts: Number,
    // likeCounts: Number,
    commentCounts: Number,
    weight: Number,
    tags: String,
    body: Object,
    createDate: String,
    category: Object
}
const props = defineProps<{
    essay: Essay
}>()

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
            }
            .word {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #9ea6b0;
            }
            .feedback {
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
        }
        .right {
            width: 120px;
            margin-left: 24px;
            img {
                width: 120px;
                height: 80px;
                object-fit: contain;
            }
        }
    }
}
</style>