<template>
    <div style="border: 1px solid #ccc" class="box">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="overflow-y: hidden; height:800px;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
        @onChange="onChange"
        class="editor"
      />
    </div>
</template>

<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { ElMessage } from 'element-plus'
import { storeToRefs } from "pinia";

// pinia
const editors = useStore.editor();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }
editorConfig.placeholder = '请输入内容...'
editorConfig.scroll = false
editorConfig.maxLength = 1000
editorConfig.onMaxLength = (editor: IDomEditor) => {
  ElMessage.error('文章内容最大长度为1000')
}
editorConfig.MENU_CONF['uploadImage'] = {
    // 上传图片的配置
    // server: getBaseUrl() + '/upload',
    async customUpload(file: File, insertFn: InsertFnType) {
      let fd = new FormData();
      fd.append("image", file);
      const { data } = await useFetch("/upload", {
        method: "post",
        baseURL: getBaseUrl(),
        body: fd
      });
      // console.log(data.value.msg);
      if(data.value.code === 200){
        ElMessage({
          message: data.value.msg === "success"? "上传成功" : data.value.msg,
          type: 'success',
        })
        insertFn(data.value.data, "图片", data.value.data);
      }else{
        ElMessage.error(data.value.msg);
      }
    }
}

// 代码高亮
editorConfig.MENU_CONF['codeSelectLang'] = {
  codeLangs: [
    { text: 'CSS', value: 'css' },
    { text: 'HTML', value: 'html' }, 
    { text: 'XML', value: 'xml' } 
  ]
}

// watch(valueHtml, (newValue, oldValue) => {
//   editors.blogText = valueHtml;
//   // console.log('值发生了变化', newValue, oldValue)
  
// }, {immediate: true})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 编辑器内容变化
const onChange = () => {
  editors.blogText = valueHtml;
}
</script>

<style scoped lang='less'>
.editor {
  min-height: 500px;
  background-color: #fff;
}
</style>