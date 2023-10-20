<template>
  <div class="login">
    <Header title="登录" />
    <div class="img">丑团</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          color="#ffc400"
        >
          登录
        </van-button>
        <van-button
          round
          block
          type="primary"
          color="#ffc400"
          class="register"
          @click="toRegister"
        >
          去注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Header from "../../components/Header.vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    let data = reactive({
      username: "",
      password: "",
    });
    //去注册
    const toRegister = () => {
      router.push("./register");
    };
    //提交按钮
    const onSubmit = (value) => {
      if (!localStorage.userInfo) {
        Toast("账号未注册");
        return;
      } else {
        let userInfo = JSON.parse(localStorage.userInfo);
        if (userInfo["用户名"] === value["用户名"]) {
          if (userInfo["密码"] === value["密码"]) {
            Toast("登录成功");
            localStorage.setItem("isLogin", "1");
            router.push("./home");
          } else {
            Toast("密码错误");
          }
        } else {
          Toast("账号不存在或输入错误");
        }
      }
    };
    return {
      ...toRefs(data),
      onSubmit,
      toRegister,
    };
  },
};
</script>

<style lang='less' scoped>
.login {
  .img {
    width: 200px;
    height: 200px;
    background-color: #ffc400;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
</style>