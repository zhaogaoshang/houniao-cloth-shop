<template>
  <div class="public-row user-box">
    <div class="public-row__align left-box">
      <slot></slot>
    </div>
    <div class="public-row__center">
      <img class="user-avatar" src="@/assets/logo.png" alt="用户头像">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
        <span>{{$store.state.user.userInfo.userName}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLoginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handleLoginOut () {
      localStorage.removeItem('vuex')
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.user-box{
  margin-bottom: 30px;
  width: 100%;
  justify-content: space-between;
  .user-avatar{
    width: 50px;
    height: 50px;
    background-color: $theme-lan;
    border-radius: $yj-10;
    margin-right: 20px;
  }
  .el-dropdown-link{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    cursor: pointer;
  }
  .margin-30{
    margin-left: 30px;
  }
  .left-box {
    flex: 1;
    justify-content: space-between;
    margin-right: 50px;
  }
}
</style>
