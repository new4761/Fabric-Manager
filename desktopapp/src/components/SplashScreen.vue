<template>
  <div class="splash-wrapper p-d-flex p-jc-center">
    <div class="splash-container p-col p-text-center p-as-center">
      <ProgressSpinner
        style="width:100px;height:100px"
        strokeWidth="3"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// const TerminalProps = Vue.extend({
//   props: {
//     input: String,
//   },
// });

@Component({
  components: {},
})
export default class SplashScreen extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/style/_variables.scss";
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #cdffec !important;
  }
  40% {
    stroke: #b0fdd9 !important;
  }
  66% {
    stroke: #2fbd76 !important;
  }
  80%,
  90% {
    stroke: #009443 !important;
  }
}
.splash-wrapper {
  display: flex;
  align-items: stretch;
}
.splash-container {
  align-items: stretch;
}
</style>
