<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="60px"
    class="login-form"
    hide-required-asterisk
  >
    <el-form-item label="账号" prop="account">
      <el-input
        v-model="ruleForm.account"
        type="text"
        prefix-icon="User"
        clearable
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        prefix-icon="Lock"
        show-password
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
        class="submit-btn"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia"


const login = useStore.login();


const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  account: "",
  password: "",
});
const checkNumber = (rule: any, value: any, callback: any) => {
  // console.log("value: ", value)
  // 验证手机号的正则表达式
  const regEmail = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}$/;
  if (regEmail.test(value)) {
    // 合法的手机号
    return callback();
  }
  callback(new Error("请输入合法的手机号"));
};
const rules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    // { validator: checkNumber, trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
});


// onMounted(() => {
//   console.log(getBaseUrl());
// });

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // const { data } = await useFetch("/login", {
      //   method: "post",
      //   baseURL: getBaseUrl() ?? "http://39.108.135.247:8888",
      //   body: {
      //     account: ruleForm.account,
      //     password: ruleForm.password
      //   }
      // });
      
      const result = await useLogin({
          account: ruleForm.account,
          password: ruleForm.password
        }, {});
      if(result?.code === 200) {
        ElMessage({
          message: result.msg === "success"? "登录成功" : result.msg,
          type: "success"
        });
        login.isLogin = true;
        login.dialogVisible = false;
        localStorage.setItem("token", result.data);
      }else{
        ElMessage({
          message: result.msg,
          type: "error"
        });
      }
    } else {
      return false;
    }
  });
};
</script>
<style lang="less" scoped>
.login-form {
  padding-top: 30px;
  .el-form-item {
    margin-top: 30px;
  }
  .submit-btn {
    width: 250px;
    margin: 0 auto;
    // margin-top: 50px;
  }
}
</style>