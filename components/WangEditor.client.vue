<template>
    <div style="border: 1px solid #ccc" class="box">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
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

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
const { $emitter } = useNuxtApp()

watch(valueHtml, (newValue, oldValue) => {
  $emitter.emit("response", newValue)
  // console.log('值发生了变化', newValue, oldValue)
}, {immediate: true})

// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }
editorConfig.placeholder = '请输入内容...'
editorConfig.scroll = false
editorConfig.maxLength = 1000
editorConfig.onMaxLength = (editor: IDomEditor) => {
  ElMessage.error('文章内容最大长度为1000')
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped lang='less'>
.editor {
  min-height: 500px;
  background-color: #fff;
}
</style>