<template>
  <div class="p-m-5 p-p-5">
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <terminal></terminal>
      </div>
    </div>
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <!-- <Button
          label="back"
          class="p-button-outlined p-button-secondary"
          @click="back()"
        /> -->
      </div>
      <div class="p-col p-text-right">
        <Button label="next" class="p-button-outlined" @click="next()"  v-if="this.$store.state.processStatus" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "../components/Terminal.vue";
import OSProcess from "../module/OSProcess/OSProcess";
import FileManager from "../module/FileManager";
const fs = require("fs");
const path = require("path");
const TerminalProps = Vue.extend({
  props: {
    command: String,
    directory: String,
    id: Number,
  },
});

@Component({
  components: {
    Terminal,
  },
})
export default class SplashConsolePage extends TerminalProps {
  projectDir: string = "";

  created() {
    console.log(this.command);
    this.run();
  }

  async run() {
    let args = this.command.split("#");
    console.log(args);
    await OSProcess.run(args,this.directory);
    this.$store.commit("setProcessStatus", true);

    try {
      let _genesis = path.join(this.$store.state.project.path, "genesis.block");
      if (!fs.existsSync(_genesis)) {
        console.log("copy!!!")
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, "vars", "genesis.block"),
          path.join(this.$store.state.project.path, "genesis.block")
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  back() {
    this.$router.push("/");
  }

  next() {
    this.$store.commit("setProcessStatus", false);
    this.$store.commit("project/setId", this.id);
    this.$router.push("/home");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
