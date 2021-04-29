<template>
  <div class="public-column container">
    <keep-alive include="ClothList">
      <router-view></router-view>
    </keep-alive>
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
  }
}
</script>
<style lang="scss" scoped>
.container{
  flex: 1;
}
</style>
