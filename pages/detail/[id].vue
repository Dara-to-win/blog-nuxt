<template>
  <div class="detail">
    <div class="left">
        <el-affix :offset="150">
          <ul>
            <li>
              <i class="iconfont icon-dianzan_kuai"></i>
              <span class="number">{{contentText.likeCounts}}</span>
            </li>
            <li>
              <i class="iconfont icon-pinglun1"></i>
              <span class="number">{{contentText.commentCounts}}</span>
            </li>
            <li>
              <i class="iconfont icon-shoucangxuanzhong"></i>
              <span class="number">{{contentText.collectCounts}}</span>
            </li>
          </ul>
        </el-affix>
    </div>
    <div class="content">
        <MainText :contentText="contentText" :ref="mainRef"></MainText>
        <div class="down">
            分辨率低时展示点赞信息
        </div>
    </div>
    <div class="right">
        <AuthorInfo :contentText="contentText"></AuthorInfo>
        <div class="mulu">

        </div>
    </div>
    
  </div>
</template>
<script lang="ts">
export default {
  layout: "default",
}
</script>
<script setup lang="ts">
import '@/assets/css/view.css'
import {ref, reactive} from 'vue'
const route = useRoute()
const id = ref(route.params.id)

// const contentText = reactive({
//   content: `<h3 style="text-align: start;">报错类型一般为两种</h3><h4 style="text-align: start;">对象类型</h4><blockquote><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;">对象没有数据的时候为undefined 这个时候访问内部内容就会报错</span></blockquote><ul><li style="text-align: start;">举个例子<br><strong>正常情况 对象有值的时候</strong></li></ul><pre><code >var obj={name:'张三',age:18}
//       #此时对象有数据访问不会报错
//       console.log(obj.name)</code></pre><p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"><strong>对象没值的时候</strong></span></p><pre><code >var obj={}
//       console.log(obj.name) 
//       #就会报错 Uncaught SyntaxError: Unexpected token '.'
//       #表示空对象{}不能使用.
//       </code></pre><p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"><strong>对象为undefined的时候</strong></span></p><pre><code >#本地数据为后端获取的 直接赋值 当res.data没值的时候undefined
//       this.myData=res.data
//       #当前值为undefined 
//       console.log(this.myData.name)
//       #报以下错误
//       # VM214:1 Uncaught TypeError: Cannot read properties of undefined (reading 'name')
//           at &lt;anonymous&gt;:1:11
//       </code></pre><p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"><strong>解决办法</strong></span></p><blockquote><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;">使用可选链操作符 </span><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;"><strong>?.<br></strong></span><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;">就以上问题进行修复<br>obj?.name<br>this.myData=res?.data</span></blockquote><h4 style="text-align: start;">数组类型</h4><blockquote><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;">数据没有值时 数组[index] 数组下标获取值会报错 尤其是对链式结构使用数组下标一层一层获取数据<br>举个例子: </span><span style="color: rgb(85, 86, 102); background-color: rgb(238, 240, 244); font-size: 16px;"><strong>this.data[0].children[0].children[0].children[0]</strong></span></blockquote><pre><code >在这种情况下 如果中间某一个数组没有数据就会出现报错
//       VM322:1 Uncaught TypeError: Cannot read properties of undefined (reading '[0]')
//           at &lt;anonymous&gt;:1:7</code></pre><h3 style="text-align: start;">解决办法同上</h3><p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">Vue 3 中兄弟间传值可以使用 Vuex，但小项目使用过于庞大，我们可以使用 </span><a href="https://so.csdn.net/so/search?q=mitt&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">mitt</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"> 进行兄弟组件间传值。</span></p><h1 style="text-align: start;">操作步骤</h1><h2 style="text-align: start;">第一步：安装 mitt</h2><p style="text-align: start;"><span style="color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); font-size: 14px;"><code>npm i mitt</code></span></p><h2 style="text-align: start;">第二步：创建文件（例如：eventBus.js）</h2><pre><code >import mitt from 'mitt'

//       const emitter = mitt()
//       export default emitter</code></pre><h2 style="text-align: start;">第三步：将该文件引入至需要进行发送及接受的 .vue 文件中</h2><pre><code >import emitter from "../untils/bus";</code></pre><h2 style="text-align: start;">第四步：发送端写入下列代码</h2><pre><code >// 前面是事件，后面是要传入的参数
//       emitter.emit("response", response)</code></pre><h2 style="text-align: start;">第五步：接收端写入下列代码</h2><pre><code >// 这样两个组件间就可以进行传值通信了
//       emitter.on("response", (response) =&gt; {
//           console.log(response)
//       })</code></pre><p><br></p>`,
//   title: 'Nuxt.js从入门与分析，实践后的近万字总结',
//   authorName: '逐步前进',
//   authorImg: '/img/avatar.jpg',
//   authorIntro: '前端工程师',
//   time: '2023年3月21日 15:52',
//   cover: '/img/avatar.jpg',
//   likeCounts: 168,
//   collectCounts: 160,
//   commentCounts: 120,
// })

const contentText = reactive({});


const lis = ref([]);
const mainRef = (el) => lis.value.push(el);
// const mainRef = ref<null | HTMLElement>(null);
onMounted(()=> {
  setTimeout(()=>{
    // getTitle();
    getArticles();
    getAuthor();
  }, 500)
})

async function getArticles() {
  const result = await getArticlesDetail({
  }, {}, route.params.id);
  console.log("result: ", result);
  if(result.code === 200) {
    contentText.content = result?.data.body.content;
    contentText.title = result?.data.title;
    contentText.authorId = result?.data.authorId;
    contentText.time = result?.data.createDate;
    contentText.cover = result?.data.snapshotImg;
    contentText.likeCounts = result?.data.likeCounts;
    contentText.collectCounts = result?.data.collectCounts;
    contentText.commentCounts = result?.data.commentCounts;
    contentText.viewCounts = result?.data.viewCounts;
  }else{
    ElMessage({
      message: result.msg,
      type: "error",
    });
  }
}

async function getAuthor() {
  setTimeout(async ()=>{
    console.log("contentText.value: ", contentText);
    console.log("contentText.authorId: ", contentText.authorId);
    const result = await getAuthorInfo({}, {}, contentText.authorId);
    if(result.code === 200) {
      contentText.authorName = result?.data.nickname;
      contentText.authorImg = result?.data.avatar;
      contentText.authorIntro = result?.data.introduce;
    }else{
      ElMessage({
        message: result.msg,
        type: "error",
      });
    }
    console.log("author: ", result);
    console.log("contentText.authorId: ", contentText.authorId);
  }, 500);
}

const getTitle = () => {
  
  // console.log("mainRef:", mainRef.value)
  // const titleTag = ["h1", "h2", "h3", "h4", "h5", "h6"]
  // mainRef.value.childNodes.forEach((e, index)=> {
  //   if(titleTag.includes(e.nodeName)){
  //     console.log(e)
  //   }
  // })
  // const title = mainRef.querySelector('h1')
  // console.log(title)
  console.log("lis: ", lis, lis[0])
}

</script>

<style scoped lang='less'>
.detail {
    margin-top: 74px!important;
    // height: 2000px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    .left {
        display: none;
        width: 48px;
        margin-top: 150px;
        li {
          position: relative;
          font-size: 20px;
          background-color: #fff;
          width: 48px;
          height: 48px;
          margin-bottom: 20px;
          border-radius: 50%;
          text-align: center;
          line-height: 48px;
          i {
            font-size: 24px;
          }
          .number {
            position: absolute;
            font-size: 11px;
            height: 17px;
            line-height: 17px;
            padding: 0 5px;
            border-radius: 5px;
            top: -5px;
            right: -10px;
            color: #fff;
            background-color: #c2c8d1;
          }
          &:hover {
            color: #1e80ff;
            .number {
              background-color: #1e80ff;
            }
          }
        }
    }
    .content {
        width: 100%;
        padding: 32px 32px 0;
        box-sizing: border-box;
        margin-left: 0 10px;
        background-color: #fff;
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
        // background-color: gray;
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