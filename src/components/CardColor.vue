<template>
  <div class="public-column card" :style="'background: linear-gradient(135deg,' + leftColor + ',' + rightColor + ');'">
    <div class="public-column top">
      <slot name="top"/>
    </div>
    <div class="public-column bottom">
      <slot name="bottom"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftColor: {
      type: String,
      default: '#7874FF'
    },
    rightColor: {
      type: String,
      default: '#DAB4FE'
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
  }
}
</script>
<style lang="scss" scoped>
.card{
  width: 440px;
  height: 140px;
  box-shadow: 0px 10px 10px 0px rgba(218, 180, 254, 0.32);
  border-radius: 30px;
  padding: 30px;
  .top{
    border-bottom: 1px solid #FFFFFF;
    font-size: 22px;
  }
  .bottom{
    font-size: 40px;
  }
  .bottom,
  .top{
    flex: 1;
    justify-content: center;
    color: #FFFFFF;
    font-weight: 800;
  }
}
</style>
