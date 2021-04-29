<template>
  <div class="public-column__center left-box">
    <div class="public-row__center logo-box">
      <img class="public-shou logo-image" src="@/assets/logo.png" alt="logo" @click="handleGoIndex">
    </div>
    <div class="public-row info-box" v-if="stylePick == 2">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stylePick: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handleGoIndex () {
      this.$router.replace('/')
      this.$store.commit('aside/switch', {path: '/'})
    }
  }
}
</script>
<style lang="scss" scoped>
.left-box{
  width: 300px;
  height: 100%;
  border-radius: 0 $yj-50 $yj-50 0;
  background: $theme-lan;
  overflow: hidden;
  .info-box{
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    margin-right: -35px;
    width: 100%;
    align-items: stretch;
  }
  .logo-box{
    .logo-image{
      width: 130px;
      height: 153px;
    }
  }
}
</style>
