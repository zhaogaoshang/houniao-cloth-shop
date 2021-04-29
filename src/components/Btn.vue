<template>
  <div :class="['public-shou', 'btn', typeStyle]">
    <slot/>
  </div>
</template>
<script>
export default {
  props: {
    typeStyle: {
      type: String,
      default: 'moren'
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
.btn{
  display: inline-block;
  min-width: 80px;
  padding: 0 10px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  box-shadow: 0px 3px 6px 0px rgba(0, 129, 204, 0.28);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
}

.moren {
  background: $lan;
}

.su {
  border: 1px solid $lan;
  border-radius: 8px;
  color: $lan;
}
</style>
