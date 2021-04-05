<template>
  <div>
<LogView/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import LogView from "../components/LogView.vue";


@Component({
  components: {

    LogView,
  },
})
export default class LogPage extends Vue {
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
