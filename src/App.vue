<template>
  <div id="app">
    <transition name="fold">
      <keep-alive include="Index">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
  },
  mounted () {
    // window.addEventListener('onbeforeunload', _ => {
    //   // 鼠标相对于用户屏幕的水平位置 - 窗口左上角相对于屏幕左上角的水平位置 = 鼠标在当前窗口上的水平位置
    //   var n = window.event.screenX - window.screenLeft
    //   // 鼠标在当前窗口内时，n<m，b为false；鼠标在当前窗口外时，n>m，b为true。20这个值是指关闭按钮的宽度
    //   var b = n > document.documentElement.scrollWidth - 20
    //   // 鼠标在客户区内时，window.event.clientY>0；鼠标在客户区外时，window.event.clientY<0
    //   if ((b && window.event.clientY < 0) || window.event.altKey || window.event.ctrlKey) { // 关闭浏览器时你想做的事
    //     alert('"关闭"')
    //     this.$store.commit('category/agent', 123)
    //     this.$store.commit('client/agent', null)
    //     this.$store.commit('aside/clear', null)
    //   } else if (window.event.clientY > document.body.clientHeight || window.event.altKey) {
    //     this.$store.commit('category/agent', 456)
    //     // 刷新浏览器时你想做的事
    //     alert('"刷新"')
    //   }
    // })
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import url("./css/bases.scss");
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .3s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .3s;
}

@keyframes fold-in {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fold-out {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}

#app{
  // background: $theme-lan;
}
</style>
