<template>
  <div class="p-my-5">
    <transition name="slide-fade" mode="out-in">
      <div class="console">{{ output }}</div>
    </transition>
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
export default class Terminal extends Vue {
  // mounted() {
  //   this.displayOutput();
  // }
  // displayOutput() {
  //   this.output = "minifab:output";
  //   this.child.stdout.setEncoding("utf8");
  //   this.child.stdout.on("data", (data: any) => {
  //     this.output += data.toString();
  //   });
  //   this.child.stderr.on("data", (data: any) => {
  //     this.output += data.toString();
  //   });
  //}
  output: any = "------------Terminal--------------";
  timer: number = 0;
  created() {
    // this.testget();
    // setInterval(() => this.testget(), 500);
  }
  clearlog() {
    this.output = "";
  }
  async testget() {
    // const used = process.memoryUsage();
    // for (let key in used) {
    //   console.log(
    //     `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    //   );
    // }

    // this.output = await process.getProcessMemoryInfo()
    // var cproc = require("child_process");
    // let proc = cproc.spawn("ping", ["www.google.com"]);
    // proc.stdout.on("data", (res: any) => {
    //   this.output = res;
    // });
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
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
