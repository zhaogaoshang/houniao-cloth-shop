<template>
  <div class="container public-row">
    <aside-box stylePick="2">
      <aside-list></aside-list>
    </aside-box>
    <!-- 右边 -->
    <div class="public-right__box public-column">
      <router-view/>
    </div>
  </div>
</template>
<script>
import AsideBox from '../components/AsideBox.vue'
import AsideList from '../components/AsideList.vue'
export default {
  components: { AsideBox, AsideList },
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
<style lang="scss">
.public-right__box{
}
</style>
