<template>

  <div class="love-container" >
    <link itemprop="thumbnailUrl" href="https://www.jihaneandzakaria2022.tk/wedd.png">
    <span itemprop="image" itemscope itemtype="image/jpeg"> 
      <link itemprop="url" href="https://www.jihaneandzakaria2022.tk/wedd.png"> 
    </span>
    <div class="sakura-falling"></div>
    <NavBar></NavBar>
    <Invitation  v-bind:playSound="playSound"/>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sakura from "../plugins/sakura";
const Fairouz = require("@/assets/fairouz.mp3").default;
export default Vue.extend({
  name: "IndexPage",
  data() {
    return {
      audio: {} as any,
      Fairouz
    }
  },
  mounted() {
    this.$store.commit('initializeSound');
    const sakura = new Sakura(".sakura-falling", {
      colors: [
        {
          gradientColorStart: "rgba(255, 183, 197, 0.9)",
          gradientColorEnd: "rgba(255, 197, 208, 0.9)",
          gradientColorDegree: 120,
        },
        {
          gradientColorStart: "rgba(255,189,189)",
          gradientColorEnd: "rgba(227,170,181)",
          gradientColorDegree: 120,
        },
        {
          gradientColorStart: "rgba(212,152,163)",
          gradientColorEnd: "rgba(242,185,196)",
          gradientColorDegree: 120,
        },
      ],
      delay: 200,
    });
    this.audio = new Audio(this.Fairouz);
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  },
  methods: {
    toggleSound() {
      this.$store.commit('toggleSound');
    },
    playSound() {
      if(this.isSoundEnabled) { 
        this.audio = new Audio(this.Fairouz);
        this.audio.play();
      }
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Niconne");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
  position: fixed;
  width: 100%;
  height: 100%;
}
body h1 {
  font-family: "Niconne", cursive !important;
  font-size: 35px !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2019 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: September 4, 2019
 */
@-webkit-keyframes fall {
  0% {
    opacity: 0.9;
    top: 0;
  }
  100% {
    opacity: 0.2;
    top: 100%;
  }
}

@keyframes fall {
  0% {
    opacity: 0.9;
    top: 0;
  }
  100% {
    opacity: 0.2;
    top: 100%;
  }
}

@-webkit-keyframes blow-soft-left {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -50%;
  }
}

@keyframes blow-soft-left {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -50%;
  }
}

@-webkit-keyframes blow-medium-left {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -100%;
  }
}

@keyframes blow-medium-left {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -100%;
  }
}

@-webkit-keyframes blow-soft-right {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 50%;
  }
}

@keyframes blow-soft-right {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 50%;
  }
}

@-webkit-keyframes blow-medium-right {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 100%;
  }
}

@keyframes blow-medium-right {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 100%;
  }
}

@-webkit-keyframes sway-0 {
  0% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  40% {
    -webkit-transform: rotate(28deg);
    transform: rotate(28deg);
  }
  100% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg);
  }
}

@keyframes sway-0 {
  0% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  40% {
    -webkit-transform: rotate(28deg);
    transform: rotate(28deg);
  }
  100% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg);
  }
}

@-webkit-keyframes sway-1 {
  0% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  40% {
    -webkit-transform: rotate(43deg);
    transform: rotate(43deg);
  }
  100% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
}

@keyframes sway-1 {
  0% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  40% {
    -webkit-transform: rotate(43deg);
    transform: rotate(43deg);
  }
  100% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
}

@-webkit-keyframes sway-2 {
  0% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  40% {
    -webkit-transform: rotate(56deg);
    transform: rotate(56deg);
  }
  100% {
    -webkit-transform: rotate(22deg);
    transform: rotate(22deg);
  }
}

@keyframes sway-2 {
  0% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  40% {
    -webkit-transform: rotate(56deg);
    transform: rotate(56deg);
  }
  100% {
    -webkit-transform: rotate(22deg);
    transform: rotate(22deg);
  }
}

@-webkit-keyframes sway-3 {
  0% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  40% {
    -webkit-transform: rotate(74deg);
    transform: rotate(74deg);
  }
  100% {
    -webkit-transform: rotate(37deg);
    transform: rotate(37deg);
  }
}

@keyframes sway-3 {
  0% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  40% {
    -webkit-transform: rotate(74deg);
    transform: rotate(74deg);
  }
  100% {
    -webkit-transform: rotate(37deg);
    transform: rotate(37deg);
  }
}

@-webkit-keyframes sway-4 {
  0% {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
  40% {
    -webkit-transform: rotate(68deg);
    transform: rotate(68deg);
  }
  100% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}

@keyframes sway-4 {
  0% {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
  40% {
    -webkit-transform: rotate(68deg);
    transform: rotate(68deg);
  }
  100% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}

@-webkit-keyframes sway-5 {
  0% {
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
  }
  40% {
    -webkit-transform: rotate(78deg);
    transform: rotate(78deg);
  }
  100% {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
}

@keyframes sway-5 {
  0% {
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
  }
  40% {
    -webkit-transform: rotate(78deg);
    transform: rotate(78deg);
  }
  100% {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }
}

@-webkit-keyframes sway-6 {
  0% {
    -webkit-transform: rotate(65deg);
    transform: rotate(65deg);
  }
  40% {
    -webkit-transform: rotate(92deg);
    transform: rotate(92deg);
  }
  100% {
    -webkit-transform: rotate(58deg);
    transform: rotate(58deg);
  }
}

@keyframes sway-6 {
  0% {
    -webkit-transform: rotate(65deg);
    transform: rotate(65deg);
  }
  40% {
    -webkit-transform: rotate(92deg);
    transform: rotate(92deg);
  }
  100% {
    -webkit-transform: rotate(58deg);
    transform: rotate(58deg);
  }
}

@-webkit-keyframes sway-7 {
  0% {
    -webkit-transform: rotate(72deg);
    transform: rotate(72deg);
  }
  40% {
    -webkit-transform: rotate(118deg);
    transform: rotate(118deg);
  }
  100% {
    -webkit-transform: rotate(68deg);
    transform: rotate(68deg);
  }
}

@keyframes sway-7 {
  0% {
    -webkit-transform: rotate(72deg);
    transform: rotate(72deg);
  }
  40% {
    -webkit-transform: rotate(118deg);
    transform: rotate(118deg);
  }
  100% {
    -webkit-transform: rotate(68deg);
    transform: rotate(68deg);
  }
}

@-webkit-keyframes sway-8 {
  0% {
    -webkit-transform: rotate(94deg);
    transform: rotate(94deg);
  }
  40% {
    -webkit-transform: rotate(136deg);
    transform: rotate(136deg);
  }
  100% {
    -webkit-transform: rotate(82deg);
    transform: rotate(82deg);
  }
}

@keyframes sway-8 {
  0% {
    -webkit-transform: rotate(94deg);
    transform: rotate(94deg);
  }
  40% {
    -webkit-transform: rotate(136deg);
    transform: rotate(136deg);
  }
  100% {
    -webkit-transform: rotate(82deg);
    transform: rotate(82deg);
  }
}

.sakura {
  pointer-events: none;
  position: absolute;
}
.controls{
  margin:8rem;
}
</style>
