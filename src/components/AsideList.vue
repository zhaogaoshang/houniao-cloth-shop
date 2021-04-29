<template>
  <div class="aside">
    <div class="item public-shou" v-for="(item, index) in list" :key="index" @click="handleSwitch(item)">
      <div :class="['public-row__align', 'list-item', $store.state.aside.activeItemPath.indexOf(item.path) === 0 ? 'active' : '']">
        {{item.name}}
      </div>
    </div>
    <div class="shim"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          name: '分类模型管理',
          icon: 'home.png',
          activeIcon: 'home-se.png',
          path: '/category/model'
        },
        {
          name: '账号管理',
          icon: 'cloth.png',
          activeIcon: 'cloth-se.png',
          path: '/account'
        },
        {
          name: '项目管理',
          icon: 'ren.png',
          activeIcon: 'ren-se.png',
          path: '/project'
        },
        {
          name: '量体部位管理',
          icon: 'mendian.png',
          activeIcon: 'mendian-se.png',
          path: '/volume'
        },
        {
          name: '特体部位管理',
          icon: 'yuangong.png',
          activeIcon: 'yuangong-se.png',
          path: '/special'
        },
        {
          name: '部位管理',
          icon: 'yuangong.png',
          activeIcon: 'yuangong-se.png',
          path: '/position'
        },
        {
          name: '面料管理',
          icon: 'mianliao.png',
          activeIcon: 'mianliao-se.png',
          path: '/cloth'
        },
        {
          name: '面料品牌管理',
          icon: 'dingdan.png',
          activeIcon: 'dingdan-se.png',
          path: '/fabric/brand'
        }
      ]
    }
  },
  created () {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleSwitch (item) {
      this.$router.replace(item.path)
    }
  }
}
</script>
<style lang="scss" scoped>
.aside{
  flex: 1;
  .item{
    padding-left: 30px;
    .list-item{
      height: 60px;
      padding: 0px 10px;
      padding-left: 20px;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      font-size: 22px;
      font-weight: 500;
      color: white;
      .item-icon{
        width: 20px;
        height: 20px;
        margin: 0 18px 0 38px;
      }
      .title{
        width: 88px;
        text-align-last: justify;
      }
    }
  .active{
    background: $f7;
    color: $theme-lan;
  }
  }
  .shim{
    height: 100px;
  }
}
</style>
