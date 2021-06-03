<template>
  <div class="login-page">
    <img class="bg-image" src="../../static/login-page-bg.png" alt="">
    <div class="write-box">
      <div class="public-row write-item">
        <span class="el-icon-user icon-color"></span>
        <input class="write-input" type="text" v-model="form.phone" placeholder="请输入用户名">
      </div>
      <div class="public-row write-item">
        <span class="el-icon-lock icon-color"></span>
        <input class="write-input" :type="passwordType" v-model="form.password" placeholder="请输入登录密码">
        <span class="el-icon-view public-shou" @click="passwordType = 'password'" v-if="passwordType == 'text'"></span>
        <span class="icon-Eyesclosed public-shou" @click="passwordType = 'text'" v-if="passwordType == 'password'"></span>
      </div>
      <div class="login-ben">
        <discolor-btn @click.native="handleSubmit">登录</discolor-btn>
      </div>
    </div>
  </div>
</template>
<script>
import DiscolorBtn from '../components/DiscolorBtn'
export default {
  components: { DiscolorBtn },
  name: 'Login',
  data () {
    return {
      passwordType: 'password',
      form: {
        phone: '',
        password: '',
        clientSideType: 0
      }
    }
  },
  created () {
    // window.print()
  },

  mounted: function () {
    // this.$store.commit('user/setUserInfo', {})
    this.$utils.handleHiddenLoading()
    this.$nextTick(() => {
    })
  },

  computed: {
  },
  methods: {
    handleSubmit () {
      this.$http.post(this.$apis.api_login_login, this.form).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$store.commit('user/setUserInfo', res.result)
        this.$store.commit('user/setToken', res.sign)
        this.$router.replace('/')
      }).catch(res => {
        // alert('post')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page{
  .bg-image{
    width: 100%;
    height: 500px;
  }
  .write-box{
    width: 360px;
    margin: 0 auto;
    margin-top: 127px;
    .title{
      font-size: 44px;
      font-weight: 800;
      color: #333333;
    }
    .discription{
      font-size: 18px;
      font-weight: 400;
      color: #999999;
      margin: 20px 0 30px;
    }
    .write-item{
      padding: 20px 0;
      border-bottom: 1px solid rgba($color: #000000, $alpha: .1);
      align-items: center;
      .write-input{
        background-color: rgba($color: #000000, $alpha: .0);
        flex: 1;
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }
  .icon-color{
    color: $theme-lan;
  }
  .login-ben{
    margin-top: 50px;
  }
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
  -webkit-box-shadow: 0 0 0px 1000px #f8f8f8 inset;
}

.printTest{
  width: 100px;
  height: 500px;
}
</style>
