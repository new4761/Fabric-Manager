<template>
  <div class="p-my-5">
    <button @click="testget()">get google test</button>

    <button @click="clearlog()">clear data</button>
    <transition name="slide-fade" mode="out-in">
    <div class="console">{{ output }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Terminal extends Vue {
  output: any = "------------Terminal--------------";
  // timer:number = 0;

  created() {
      this.testget()
      setInterval(() => this.testget(), 5000);
  }

  clearlog() {
     this.output = ""
  }

  testget() {
    var cproc = require("child_process");

    let proc = cproc.spawn("ping", ["www.google.com"]);

    proc.stdout.on("data", (res: any) => {
      this.output += res;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.console {
  background-color: rgb(2, 0, 122);
  border-radius: 5px;
  color: aliceblue;
  font-size: 10;
  white-space: break-spaces;
  padding: 1em;
  font-style: italic;
  overflow: auto;
  height: 500px;
}

.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
