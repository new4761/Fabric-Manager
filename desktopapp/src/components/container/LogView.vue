<template>
  <div class="log-wrapper p-grid p-jc-center p-my-1">
      <div class="log-header">
        main log
      </div>
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
<style lang="scss">
@import "@/assets/style/_variables.scss";


.log-wrapper {
  padding-left: 1em;
  padding-right: 1em;
}

.log-header {
  border-radius: 5px 5px 0px 0px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(0, 0, 0);
  color: white;
  font-size: 15px;
  font-weight: bold;
}
.log {
  background-color: rgb(56, 56, 56);
  border-radius: 0px 0px 5px 5px;
  color: aliceblue;
  font-size: 12px;
  white-space: break-spaces;
  word-break: break-all;
  padding: 1em;
  overflow: auto;
  height: 250px;
}

.info {
  font-weight: bold;
  color: rgb(103, 184, 255);
}

.warn {
  font-weight: bold;
  color: rgb(255, 190, 93);
}

.error {
  font-weight: bold;
  color: rgb(255, 97, 97);
}

.timestamp {
  font-size: 10px;
  font-weight: lighter;
  color: rgb(134, 134, 134);
}
</style>
