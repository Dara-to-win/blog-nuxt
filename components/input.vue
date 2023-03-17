<template>
    <!-- 创建容器 -->
    <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br></p>
    </div>
</template>

<script setup>
const quill = new Quill('#editor', {
    theme: 'snow'
});
</script>

<style scoped lang='less'>
</style>