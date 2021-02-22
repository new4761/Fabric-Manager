<template>
  <div class="p-grid p-jc-center  p-my-1">
    <div class="log p-col-12 " id="log" v-html="highlight()"></div>
  </div>
</template>

<script lang="ts">
import fs from "fs";
import Vue from "vue";
import Component from "vue-class-component";

// import DockerProcess from "./module/DockerProcess";
@Component({
  components: {},
})
export default class LogView extends Vue {
  log: string = "";

  created() {
    this.readLog();
    this.highlight();
  }

  readLog() {
    this.log = fs.readFileSync("./log/project.log", "utf8");
    this.highlight();
  }

  highlight() {
    var temp = this.log;
    temp = temp.replace(new RegExp("INFO", "gi"), (match) => {
      return '<span class="info">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("WARN", "gi"), (match) => {
      return '<span class="warn">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("ERROR", "gi"), (match) => {
      return '<span class="error">' + match + "</span>";
    });

    temp = temp.replace(
      new RegExp(
        "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]",
        "gi"
      ),
      (match) => {
        return '<span class="timestamp">' + match + "</span>";
      }
    );
    return temp;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
