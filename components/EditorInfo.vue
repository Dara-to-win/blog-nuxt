<template>
  <div class="editor-info">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="文章类型">
          <el-option label="原创" value="original" />
          <el-option label="转载" value="reprint" />
          <el-option label="翻译" value="translate" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签" prop="dynamicTags">
        <el-tag
          v-for="tag in ruleForm.dynamicTags"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + New Tag
        </el-button>
      </el-form-item>
      <el-form-item label="文章摘要" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          发布博客
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import type { FormInstance, FormRules, ElInput } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import emitter from "~~/plugins/eventBus";
import func from "~~/vue-temp/vue-editor-bridge";

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  title: "",
  type: "",
  desc: "",
  imageUrl: "",
  dynamicTags: [],
  blogText: "",
});
const checkTag = (rule, value, callback) => {
    console.log("value: ", value)
    if(value.length === 0)
        callback(new Error("请输入文章标签"))
    else
        callback()
}
const rules = reactive<FormRules>({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    { min: 5, max: 100, message: "文章标题 5 ~ 100 字", trigger: "blur" },
  ],
  type: [
    {
      required: true,
      message: "请选择文章类型",
      trigger: "change",
    },
  ],
  dynamicTags: [{ required: true, message: "请输入文章标签", trigger: "blur" },
        { validator: checkTag, trigger: "blur" }
  ],
  desc: [{ required: false, message: "请输入文章摘要", trigger: "blur" }],
  cover: [{ required: false, message: "请输入文章封面", trigger: "blur" }],
});


const handleClose = (tag: string) => {
  ruleForm.dynamicTags.splice(ruleForm.dynamicTags.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    ruleForm.dynamicTags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  ruleForm.imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const { $emitter } = useNuxtApp();
$emitter.on("response", (response) => {
  // console.log("response: ", response)
  ruleForm.blogText = response;
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.blogText === "<p><br></p>") {
        // console.log("blogText.value: ", blogText)
        ElMessage.error("博客内容不能为空");
        return;
      }
      console.log("blogText: ", ruleForm.blogText);
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
<style scoped lang='less'>
.editor-info {
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  background-color: #fff;
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .ml-1 {
    margin-left: 10px;
  }
  .w-20 {
    width: 80px;
  }
  .mx-1 {
    margin-right: 10px;
  }
}
@media screen and (min-width: 768px) {
  .editor-info {
    width: 750px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 992px) {
  .editor-info {
    width: 850px;
    transition: all 0.3s;
  }
}
@media screen and (min-width: 1400px) {
  .editor-info {
    width: 1100px;
    transition: all 0.3s;
  }
}
</style>