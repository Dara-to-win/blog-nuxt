<template>
    <!-- <Essay :essay="essay" v-for="essay in essayList" @click="goEssayDetail('/detail/' + essay.articleID)"/> -->
	<Essay :essay="essay" v-for="essay in essayList" @click="goEssayDetail('/detail/' + essay.id)"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// const essayList = ref([
//     {
// 	"articleID": "1622195620632739842",
// 	"snapshot": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51eef85c50284f059d94aeabc93a5038~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "求求别再叫我切图仔了，我是前端开发！",
// 	"preview": "大家好我是小卢，前几天在群里见到有群友抱怨一周内要完成这么一个大概20～30页的小程序。 群友: 这20多个页面一个星期让我开发完，我是不相信😮‍💨。 群友1: 跑吧，这公司留着没用了。",
// 	"author": "快跑啊小卢_",
// 	"viewCount": 510,
// 	"collectCount": 718,
// 	"commentCount": 867,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/a99401d07f0e29e915a74017b9d44d85~300x300.image",
// 	"category": "前端",
//     "articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:09.000+00:00"
// }, {
// 	"articleID": "1622195627310071810",
// 	"snapshot": "",
// 	"title": "青训营21天阅读打卡活动，坚持就拿大礼包",
// 	"preview": "“第三届字节跳动青训营后端专场” 开营在即！参与本次学习打卡活动除了能够收获社区精选出的技术干货外，也还有丰富奖品等你拿哦",
// 	"author": "青训营官方账号",
// 	"viewCount": 939,
// 	"collectCount": 591,
// 	"commentCount": 925,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/de432cd6200bc3d3f7d633a3ccd528d8~300x300.image",
// 	"category": "阅读",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:11.000+00:00"
// }, {
// 	"articleID": "1622195623543586818",
// 	"snapshot": "",
// 	"title": "一个vue开发者，初次接触基于schema的react后台管理系统",
// 	"preview": "入职接手了一个React的后台管理系统，只会点JSX皮毛的我，与schema数据类型的form表单组件的，爱恨情仇。",
// 	"author": "前端迪哥",
// 	"viewCount": 322,
// 	"collectCount": 963,
// 	"commentCount": 777,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/18635b1294b45491a0036a48e955be2f~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195625397469185",
// 	"snapshot": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09e2c38d60ed4515879f6ce966c47a4f~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "国产工具好强大-一个可以允许小程序运行在任意APP的容器技术",
// 	"preview": "小程序的定义 提到小程序，大多数第一眼恐怕想到的就是微信小程序或者是支付宝小程序，这也是因为微信和支付宝两者的用户基量大，很多人都是从使用微信或者支付宝开始知道小程序的，也正因为如此，小程序才被特指微",
// 	"author": "夕水",
// 	"viewCount": 157,
// 	"collectCount": 166,
// 	"commentCount": 848,
// 	"avatar": "https://p9-passport.byteacctimg.com/img/user-avatar/d8e5f941d4d4257826ba832f47cfd14f~300x300.image",
// 	"category": "阅读",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195627796611073",
// 	"snapshot": "",
// 	"title": "如何构建一个高可靠系统（上）",
// 	"preview": "什么是高可靠系统？站在使用者的角度，高可靠系统就是靠谱的系统，值得信赖的系统，不容易出现莫名其妙的问题，使用非常丝滑。本篇博客分为上下两部分，会从多个维度聊聊如何构建一个高可靠的系统。 过载保护：限流",
// 	"author": "CoderBear",
// 	"viewCount": 202,
// 	"collectCount": 136,
// 	"commentCount": 279,
// 	"avatar": "https://p3-passport.byteacctimg.com/img/user-avatar/9f91e6f981d627a17d12f0238ca15a8b~300x300.image",
// 	"category": "后端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:11.000+00:00"
// }, {
// 	"articleID": "1622195624457945090",
// 	"snapshot": "",
// 	"title": "13个很酷但很少有人知道的HTML元素",
// 	"preview": "本文正在参加「金石计划 . 瓜分6万现金大奖」 1. meter & progress 元素是显示进度条的语义正确方式。 除了在已知范围内显示标量测量值外，它还允许我们指定值的低，高和最佳范围。 效果",
// 	"author": "海拥",
// 	"viewCount": 215,
// 	"collectCount": 724,
// 	"commentCount": 632,
// 	"avatar": "https://p26-passport.byteacctimg.com/img/user-avatar/27c5a90fca52beadf8a2dc4bc0efb3f8~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195622062997505",
// 	"snapshot": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4f17f4030074b1cb0118d71731f4fd0~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "用canvas写一个支付宝画年画",
// 	"preview": "接近过年了，支付宝的集福的活动又开始了，集美们的五福集齐了没有。每年的集福活动都有一些小游戏，今年也不例外，画年画就是其中之一",
// 	"author": "郑丫头",
// 	"viewCount": 849,
// 	"collectCount": 802,
// 	"commentCount": 584,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/0448570cc96cc5b8db0d816b69ecf674~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:09.000+00:00"
// }, {
// 	"articleID": "1622195626399907841",
// 	"snapshot": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adacad17066346bf96cc011610c975bb~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "啥,要我前端去对接外部?我也不会呀",
// 	"preview": "我正在参加「掘金·启航计划」 一般来说，现在公司的业务都是后端去对接外部官方接口。但是现在加个紧急需求，往我这丢了几个对接文档，让前端去对接，我内心也是打咩。",
// 	"author": "小杨不睡了",
// 	"viewCount": 596,
// 	"collectCount": 483,
// 	"commentCount": 721,
// 	"avatar": "https://p9-passport.byteacctimg.com/img/user-avatar/df428c807d0a62df0df7c42173136d3f~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195623040270337",
// 	"snapshot": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af5f55f0aac467d898b5f13e1df9f01~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "用Three.js做个兔吉宝箱给大家拜个年",
// 	"preview": "不知不觉兔年已经来到，今年用什么形式庆贺新春呢，思来想去，就准备用Three.js做个拜年宝箱动画，宝箱落下后点击就可以打开，一直萌萌哒的小兔吉就给我拜年啦，而且每次说出的贺词都是不同的哦~",
// 	"author": "jsmask",
// 	"viewCount": 426,
// 	"collectCount": 215,
// 	"commentCount": 160,
// 	"avatar": "https://p3-passport.byteacctimg.com/img/user-avatar/3cc923506359b8170e1d8b9051bb2bef~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// },{
// 	"articleID": "1622195620632739842",
// 	"snapshot": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51eef85c50284f059d94aeabc93a5038~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "求求别再叫我切图仔了，我是前端开发！",
// 	"preview": "大家好我是小卢，前几天在群里见到有群友抱怨一周内要完成这么一个大概20～30页的小程序。 群友: 这20多个页面一个星期让我开发完，我是不相信😮‍💨。 群友1: 跑吧，这公司留着没用了。",
// 	"author": "快跑啊小卢_",
// 	"viewCount": 510,
// 	"collectCount": 718,
// 	"commentCount": 867,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/a99401d07f0e29e915a74017b9d44d85~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:09.000+00:00"
// }, {
// 	"articleID": "1622195627310071810",
// 	"snapshot": "",
// 	"title": "青训营21天阅读打卡活动，坚持就拿大礼包",
// 	"preview": "“第三届字节跳动青训营后端专场” 开营在即！参与本次学习打卡活动除了能够收获社区精选出的技术干货外，也还有丰富奖品等你拿哦",
// 	"author": "青训营官方账号",
// 	"viewCount": 939,
// 	"collectCount": 591,
// 	"commentCount": 925,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/de432cd6200bc3d3f7d633a3ccd528d8~300x300.image",
// 	"category": "阅读",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:11.000+00:00"
// }, {
// 	"articleID": "1622195623543586818",
// 	"snapshot": "",
// 	"title": "一个vue开发者，初次接触基于schema的react后台管理系统",
// 	"preview": "入职接手了一个React的后台管理系统，只会点JSX皮毛的我，与schema数据类型的form表单组件的，爱恨情仇。",
// 	"author": "前端迪哥",
// 	"viewCount": 322,
// 	"collectCount": 963,
// 	"commentCount": 777,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/18635b1294b45491a0036a48e955be2f~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195625397469185",
// 	"snapshot": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09e2c38d60ed4515879f6ce966c47a4f~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "国产工具好强大-一个可以允许小程序运行在任意APP的容器技术",
// 	"preview": "小程序的定义 提到小程序，大多数第一眼恐怕想到的就是微信小程序或者是支付宝小程序，这也是因为微信和支付宝两者的用户基量大，很多人都是从使用微信或者支付宝开始知道小程序的，也正因为如此，小程序才被特指微",
// 	"author": "夕水",
// 	"viewCount": 157,
// 	"collectCount": 166,
// 	"commentCount": 848,
// 	"avatar": "https://p9-passport.byteacctimg.com/img/user-avatar/d8e5f941d4d4257826ba832f47cfd14f~300x300.image",
// 	"category": "阅读",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195627796611073",
// 	"snapshot": "",
// 	"title": "如何构建一个高可靠系统（上）",
// 	"preview": "什么是高可靠系统？站在使用者的角度，高可靠系统就是靠谱的系统，值得信赖的系统，不容易出现莫名其妙的问题，使用非常丝滑。本篇博客分为上下两部分，会从多个维度聊聊如何构建一个高可靠的系统。 过载保护：限流",
// 	"author": "CoderBear",
// 	"viewCount": 202,
// 	"collectCount": 136,
// 	"commentCount": 279,
// 	"avatar": "https://p3-passport.byteacctimg.com/img/user-avatar/9f91e6f981d627a17d12f0238ca15a8b~300x300.image",
// 	"category": "后端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:11.000+00:00"
// }, {
// 	"articleID": "1622195624457945090",
// 	"snapshot": "",
// 	"title": "13个很酷但很少有人知道的HTML元素",
// 	"preview": "本文正在参加「金石计划 . 瓜分6万现金大奖」 1. meter & progress 元素是显示进度条的语义正确方式。 除了在已知范围内显示标量测量值外，它还允许我们指定值的低，高和最佳范围。 效果",
// 	"author": "海拥",
// 	"viewCount": 215,
// 	"collectCount": 724,
// 	"commentCount": 632,
// 	"avatar": "https://p26-passport.byteacctimg.com/img/user-avatar/27c5a90fca52beadf8a2dc4bc0efb3f8~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195622062997505",
// 	"snapshot": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4f17f4030074b1cb0118d71731f4fd0~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "用canvas写一个支付宝画年画",
// 	"preview": "接近过年了，支付宝的集福的活动又开始了，集美们的五福集齐了没有。每年的集福活动都有一些小游戏，今年也不例外，画年画就是其中之一",
// 	"author": "郑丫头",
// 	"viewCount": 849,
// 	"collectCount": 802,
// 	"commentCount": 584,
// 	"avatar": "https://p6-passport.byteacctimg.com/img/user-avatar/0448570cc96cc5b8db0d816b69ecf674~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:09.000+00:00"
// }, {
// 	"articleID": "1622195626399907841",
// 	"snapshot": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adacad17066346bf96cc011610c975bb~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "啥,要我前端去对接外部?我也不会呀",
// 	"preview": "我正在参加「掘金·启航计划」 一般来说，现在公司的业务都是后端去对接外部官方接口。但是现在加个紧急需求，往我这丢了几个对接文档，让前端去对接，我内心也是打咩。",
// 	"author": "小杨不睡了",
// 	"viewCount": 596,
// 	"collectCount": 483,
// 	"commentCount": 721,
// 	"avatar": "https://p9-passport.byteacctimg.com/img/user-avatar/df428c807d0a62df0df7c42173136d3f~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }, {
// 	"articleID": "1622195623040270337",
// 	"snapshot": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af5f55f0aac467d898b5f13e1df9f01~tplv-k3u1fbpfcp-watermark.image?",
// 	"title": "用Three.js做个兔吉宝箱给大家拜个年",
// 	"preview": "不知不觉兔年已经来到，今年用什么形式庆贺新春呢，思来想去，就准备用Three.js做个拜年宝箱动画，宝箱落下后点击就可以打开，一直萌萌哒的小兔吉就给我拜年啦，而且每次说出的贺词都是不同的哦~",
// 	"author": "jsmask",
// 	"viewCount": 426,
// 	"collectCount": 215,
// 	"commentCount": 160,
// 	"avatar": "https://p3-passport.byteacctimg.com/img/user-avatar/3cc923506359b8170e1d8b9051bb2bef~300x300.image",
// 	"category": "前端",
// 	"articleStatus": 0,
// 	"currentTime": "2023-02-05T11:29:10.000+00:00"
// }]);


const props = defineProps<{
	activeName: String,
}>()
const essayList = ref([]);

onMounted(() => {
	setTimeout(() => {
		getEssayList();
		console.log("essayList.value: ", essayList.value);
	}, 1000);
	
});

async function getEssayList() {
	let result;
	if(props.activeName === "recommend") {
		result = await getArticles({
			page: 1,
			pageSize: 10
		}, {});
	}else if(props.activeName === "hot") {
		result = await getHotArticles({}, {});
	}else if(props.activeName === "new") {
		result = await getNewArticles({}, {});
	}
	if(result?.code === 200) {
		essayList.value = result.data;
	}else {
		ElMessage({
			message: result?.msg,
			type: "error"
		});
		console.log("get faild")
		console.log(result);
	}
}
async function goEssayDetail(path) {
    await navigateTo(path);
}
</script>

<style scoped lang='less'></style>