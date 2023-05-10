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
        
        <!-- <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        /> -->
        <!-- <div class="tag_selection">
          <div class="mark_tag">
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
            <el-button
              class="button-new-tag ml-1"
              size="small"
              @click="showInput"
            >
              + 添加文章标签
            </el-button>
          </div>
          <div class="tag_box" v-if="inputVisible">
            <el-tag v-for="tag in allTags">{{tag.tagName}}</el-tag>
          </div>
        </div> -->
        <el-tag
          v-for="tag in ruleForm.dynamicTags"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag.tagName }}
        </el-tag>
        <el-popover placement="top" :width="300" trigger="click">
          <template #reference>
            <el-button class="button-new-tag ml-1" size="small" @click="showInput">+ 添加文章标签</el-button>
          </template>
          <el-tag v-for="tag in allTags" style="margin: 5px 5px" @click="addTag(tag)">{{tag.tagName}}</el-tag>
        </el-popover>
      </el-form-item>
      <el-form-item label="文章摘要" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          action
          list-type="picture-card"
          :limit="2"
          :file-list="imageList"
          :on-change="handleChangeImage"
          :show-file-list="true"
          :before-upload="beforeAvatarUpload"
          accept=".jpg, .jpeg, .png"
          :http-request="uploadImage"
        >
          <img
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          />
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
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
import type { FormInstance, FormRules, ElInput, UploadRequestOptions } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { storeToRefs } from "pinia";


const editor = useStore.editor();
const login = useStore.login();

const allTags = ref([]);

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
const imageList = [];
const handleChangeImage = (file, fileList) => {
  if(fileList.length > 1) {
    fileList.splice(0, 1);
  }
}
const checkTag = (rule, value, callback) => {
    // console.log("value: ", value)
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

const showInput = async () => {
  inputVisible.value = true;
  // nextTick(() => {
  //   // InputRef.value!.input!.focus();
  // });
  const result = await getAllTags();
  if(result.code === 200) {
    allTags.value = result.data;
    // console.log("allTags: ", allTags.value);
  }else{
    ElMessage({
      message: result.msg,
      type: "error"
    });
  }
};

const addTag = (tag) => {
  if(ruleForm.dynamicTags.length >= 3) {
    ElMessage({
      message: "标签不能超过3个",
      type: "error"
    });
  }else{
    if(ruleForm.dynamicTags.indexOf(tag) === -1) {
      // console.log("ruleForm.dynamicTags: ", ruleForm.dynamicTags);
      ruleForm.dynamicTags.push(tag);
    }else{
      ElMessage({
        message: "标签不可重复",
        type: "error"
      });
    }
  }
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    ruleForm.dynamicTags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};


const uploadImage = async (options: UploadRequestOptions) => {
  let fd = new FormData();
  fd.append("snapshot", options.file);
  const { data } = await useFetch("/upload/addImg", {
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
    // const getImg = await useFetch(`/upload/getImgById/${data.value.data}`, {
    //   method: "get",
    //   baseURL: getBaseUrl(),
    // });
    // console.log("getImg ", getImg);
    // ruleForm.imageUrl = `http://39.108.135.247:8888/upload/getImgById/287767590862849`;
    // editor.snapshot = `http://39.108.135.247:8888/upload/getImgById/287767590862849`; // data.value.data
    editor.snapshot = `http://39.108.135.247:8888/upload/getImgById/${data.value.data}`;
    // console.log("image: ", ruleForm.imageUrl);
  }else{
    ElMessage.error(data.value.msg);
  }
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (editor.blogText === "<p><br></p>") {
        // console.log("blogText.value: ", blogText)
        ElMessage.error("博客内容不能为空");
        return;
      }
      const data = await publishArticle({
        body: {
          content: editor.blogText 
        },
        // author: login.id,
        tags: ruleForm.dynamicTags,
        category: ruleForm.type,
        summary: ruleForm.desc,
        title: ruleForm.title,
        snapshotImg: editor.snapshot
      }, {
        Authorization: login.loginToken
      });
      console.log("Blog data: ", data);
      if(data?.code === 200){
        ElMessage({
          message: data?.msg === "success"? "发布成功" : data.msg,
          type: 'success',
        })
        await navigateTo("/");
      }else{
        ElMessage.error(data?.msg);
      }
      // console.log("blogText: ", editor.blogText);
      // console.log("submit!");
    } else {
      // console.log("error submit!", fields);
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
  .tag_selection {
    position: relative;
    .tag_box {
      width: 300px;
      position: absolute;
      z-index: 10;
      background-color: #fff;
      border: 1px solid #e3e3e3;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
      // display: none;
      .el-tag {
        margin: 10px;
      }
    }
  }
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