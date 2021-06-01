<template>
  <div class="p-my-5">
    <div class="p-d-flex">
      <div class="p-col-12">
        <ProgressBar mode="indeterminate" />
      </div>
    </div>
    <div class="p-d-flex">
      <div class="p-col-12">
        <div class="console" ref="term" v-html="highlight()">placeholder</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { removeColorCode } from "../module/OSProcess/StringBuilder";
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
      this.highlight();
      //@ts-ignore
      this.$refs.term.scrollTop = this.$refs.term.scrollHeight;
    });
    this.$store.state.process.stderr.on("data", (data: any) => {
      this.output += removeColorCode(data.toString());
      this.highlight();
      //@ts-ignore
      this.$refs.term.scrollTop = this.$refs.term.scrollHeight;
    });
  }

  highlight() {
    var temp = this.output;

    temp = temp.replace(new RegExp("ok", "gi"), (match: string) => {
      return '<span class="term-success">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("failed", "gi"), (match: string) => {
      return '<span class="term-error">' + match + "</span>";
    });

    temp = temp.replace(
      /* eslint-disable-next-line */
      new RegExp("(?<=\#)(.*?)(?=\:)", "gi"),
      (match: string) => {
        return '<span class="term-success">' + match + "</span>";
      }
    );

    temp = temp.replace(
      /* eslint-disable-next-line */
      new RegExp("^[^/].*", "gi"),
      (match: string) => {
        return '<span class="term-path">' + match + "</span>";
      }
    );

    return temp;
  }

  beforeDestroy() {
    this.unsubscribe();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/style/_variables.scss";

.console {
  background-color: rgb(29, 29, 29);
  color: rgb(212, 212, 212);
  border-radius: 5px;
  font-size: 8;
  white-space: break-spaces;
  padding: 1em;
  overflow: auto;
  height: 50vh;
}
.p-progressbar {
  height: 10px;
}

.term-error {
  font-weight: bold;
  color: rgb(255, 97, 97);
}

.term-info {
  font-weight: bold;
  color: rgb(103, 184, 255);
}

.term-success {
  font-weight: bold;
  color: rgb(180, 255, 217);
}

.term-path {
  font-weight: lighter;
  color: rgb(255, 226, 147);
}
</style>
