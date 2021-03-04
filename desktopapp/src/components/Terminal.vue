<template>
  <div class="p-my-5">
    <div class="p-d-flex">
      <div class="p-col-12">
        <ProgressBar mode="indeterminate" />
      </div>
    </div>
    <div class="p-d-flex">
      <div class="p-col-12">
        <div class="console">
          {{ output }}
        </div>
      </div>
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
export default class Terminal extends Vue {
  output: any = "------------Terminal--------------";
  process: any = this.$store.state.process;
  created() {}

  mounted() {
    this.displayOutput();
  }
  displayOutput() {
    this.output = "minifab:output \n";
    this.process.stdout.setEncoding("utf-8");
    this.process.stdout.on("data", (data: any) => {
      this.output += data.toString().replace(/\u21b5/g, "", "");
    });
    this.process.stderr.on("data", (data: any) => {
      this.output += data.toString().replace(/[^\x20-\x7E]+/g, "");
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";

/* \x{1B} */
.console {
  background-color: rgb(29, 29, 29);
  border-radius: 5px;
  color: aliceblue;
  font-size: 10;
  white-space: break-spaces;
  padding: 1em;
  overflow: auto;
  height: 300px;
  display: flex;
  flex-direction: column-reverse;
}
.p-progressbar {
  height: 10px;
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
