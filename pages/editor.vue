<template>
  <div class="editor">
    <EditorInfo></EditorInfo>
    <WangEditor class="mt-10"></WangEditor>
  </div>
</template>

<script setup>
import {} from 'vue'
const route = useRoute()
console.log(route.query.id)
</script>

<style scoped lang='less'>
.editor {
  margin: 0 auto;
  margin-top: 74px!important;
  padding-bottom: 10px;
  width: 100%;
  .mt-10 {
    margin-top: 10px;
  }
}
@media screen and (min-width: 768px){
    .editor {
      width: 750px;
      transition: all 0.3s;
    }
}
@media screen and (min-width: 992px){
    .editor {
      width: 850px;
      transition: all 0.3s;
    }
    
}
@media screen and (min-width: 1400px){
    .editor {
      width: 1100px;
      transition: all 0.3s;
    }
}
</style>