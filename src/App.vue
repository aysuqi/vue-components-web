<template>
  <div class="wrapper" id="app" style="height:100%">
    <div class="wrapper-header">
      <ul class="ivu-menu ivu-menu-light ivu-menu-horizontal">
        <div class="wrapper-header-nav">
          <div class="wrapper-header">
            <ul class="ivu-menu ivu-menu-light ivu-menu-horizontal">
              <div class="wrapper-header-nav">
                <a href="/" class="wrapper-header-nav-logo">
                  <img src="https://qcloudtest-1256640731.cos.ap-guangzhou.myqcloud.com/1525871803220-Symp4ueRG.jpg">
                </a>

                <div class="wrapper-header-nav-list">
                  <li class="ivu-menu-item">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                      <!-- <FormItem prop="user">
                        <Input type="text" v-model="form.userCode" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                      </FormItem>
                      <FormItem prop="password">
                        <Input type="password" v-model="form.password" placeholder="密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                      </FormItem>
                      <FormItem>
                        <Button type="primary" @click="login('formInline')">登录</Button>
                      </FormItem> -->
                    </Form>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </ul>
    </div>
    <div style="height:100%">
      <router-view />
    </div>

  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import GlobalStyles from "@/components/globalStyles/Index.vue";
export default {
  name: "App",
  data() {
    return {
      form: {
        userCode: "",
        password: "",
        captcha: "1234"
      }
    };
  },
  methods: {
    // login() {
    //   this.form.userCode = this.form.userCode.trim();
    //   this.form.password = this.form.password.trim();
    //   this.form.captcha = this.form.captcha.trim();
    //   $store
    //     .dispatch("SingnIn", {
    //       params: this.encrypt(JSON.stringify(this.form))
    //     })
    //     .then(res => {
    //       if (res.statusCode == -1) {
    //         this.$Message.error(res.msg);
    //       } else {
    //         sessionStorage.crctoken = res.dataResult.crctoken;
    //         console.log(sessionStorage.crctoken);
    //         $axios.defaults.headers.crctoken = sessionStorage.crctoken;
    //         this.$Message.success("登录成功！");
    //       }
    //     });
    // },
    // encrypt(data) {
    //   var key = CryptoJS.enc.Latin1.parse(process.env.API.key.substring(0, 16));
    //   var iv = CryptoJS.enc.Latin1.parse(process.env.API.key.substring(0, 16));
    //   return CryptoJS.AES.encrypt(data, key, {
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.ZeroPadding
    //   }).toString();
    // }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}
.login {
  position: absolute;
  top: -60px;
  right: 0px;
}
</style>
