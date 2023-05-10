<template>
<!-- 注册表单区域 -->
<el-form
    ref="registerFormRef"
    :model="registerForm"
    :rules="registerFormRules"
    label-width="80px"
    class="register">
    <!-- 手机号 -->
    <el-form-item label="手机号" prop="account">
        <el-input
            prefix-icon="User"
            v-model="registerForm.account"
            clearable
            ></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
        <el-input
            prefix-icon="Lock"
            v-model="registerForm.password"
            type="password"
            show-password
            clearable
            ></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
            prefix-icon="Lock"
            v-model="registerForm.confirmPassword"
            type="password"
            show-password
            clearable
            ></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item class="btns">
        <el-button type="primary" @click="register(registerFormRef)">注册</el-button>
        <el-button type="info" @click="resetRegisterForm(registerFormRef)">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia"


const login = useStore.login();

const { dialogVisible, activeName } = storeToRefs(login);


// 注册表单数据 
const registerForm = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});
const registerFormRef = ref<FormInstance>();

const checkNumber = (rule: any, value: any, callback: any) => {
  // 验证手机号的正则表达式
  const regEmail = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}$/;
  if (regEmail.test(value)) {
    // 合法的手机号
    return callback();
  }
  callback(new Error("请输入合法的手机号"));
};
// 验证密码
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
// 注册表单验证规则
const registerFormRules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    // { validator: checkNumber, trigger: "blur", },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度在 6 到 16 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
    { min: 6, max: 16, message: "密码长度在 6 到 15 个字符", trigger: "blur" },
  ]
});
const register = (formEl: FormInstance | undefined) => {
    if(!formEl) {
      return;
    }
    formEl.validate( async valid => {
        if(!valid) {
          console.log("错误submit");
          return ;
        }
        else {
          const { data } = await useFetch("/register", {
            method: "post",
            baseURL: getBaseUrl(),
            body: {
              account: registerForm.account,
              password: registerForm.password,
              nickname: registerForm.account
            }
          });
          // console.log(data.value.msg);
          if(data.value.code === 200){
            ElMessage({
              message: data.value.msg === "success"? "注册成功" : data.value.msg,
              type: 'success',
            })
            login.activeName = "login";
          }else{
            console.log("register: ", data.value)
            ElMessage.error(data.value.msg);
          }
        }
    });
};
const resetRegisterForm = (formEl: FormInstance | undefined) => {
    formEl.resetFields();
};
</script>

<style scoped lang='less'>
.register{
    padding-top: 30px;
    :deep(.el-form-item__content){
        display: flex;
        justify-content: space-around;
    }
    .el-button {
        width: 100px;
    }
}
</style>