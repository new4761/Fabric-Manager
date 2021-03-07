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
import { removeColorCode } from "../module/StringBuilder";
// import StdoutCapture from "../module/OSProcess/StdoutCapture";
import { mapState } from "vuex";

const TerminalProps = Vue.extend({
  computed: mapState(["process"]),
});

@Component({
  components: {},
})
export default class Terminal extends TerminalProps {
  output: any = "";
  process: any;
  stop: boolean = false;
  // @ts-ignore
  unsubscribe: Function;

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setProcess") {
        this.displayOutput();
      }
    });
  }

  mounted() {
    this.displayOutput();
  }

  displayOutput() {
    this.$store.state.process.stdout.setEncoding("utf-8");
    this.$store.state.process.stdout.on("data", (data: any) => {
      this.output += removeColorCode(data.toString());

    });
    this.$store.state.process.stderr.on("data", (data: any) => {
      this.output += removeColorCode(data.toString());
    });
   
  
  }

  beforeDestroy() {
    this.unsubscribe();
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
