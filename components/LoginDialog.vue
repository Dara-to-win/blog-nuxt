<template>
  <div class="">
    <el-dialog :model-value="dialogVisible" title="" align-center :before-close="handleClose" class="dialog">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="login">
          <Login></Login>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="register">
          <Register></Register>
        </el-tab-pane>
    </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('login')
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['dialogVisibleChange'])
const handleClose = () => {
  emits('dialogVisibleChange', false)
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>


<style scoped lang='less'>
:deep(.el-dialog__header) {
  padding: 0px;
}
:deep(.el-dialog__body) {
  padding: 30px;
}
:deep(.el-tabs__nav-scroll){
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-tabs__nav) {
  width: 100%;
}
:deep(.el-tabs__nav-scroll .el-tabs__item) {
  width: 50%;
  text-align: center;
  font-size: 20px;
  padding: 0px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
:deep(.el-dialog) {
  width: 480px; 
}
@media screen and (max-width: 1000px){
    :deep(.el-dialog) {
      width: 360px; 
    }
}
</style>