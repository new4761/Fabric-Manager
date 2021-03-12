<template>
  <div class="p-m-5 p-p-5">
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <terminal></terminal>
      </div>
    </div>
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <Button
          label="back"
          class="p-button-outlined p-button-secondary"
          @click="back()"
        />
      </div>
      <div class="p-col p-text-right">
        <Button label="next" class="p-button-outlined" @click="next()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Terminal from "../components/Terminal.vue";
import OSProcess from "../module/OSProcess";
import { OsType } from "../models/EnvProject";
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
  private osType: OsType = OsType.WINDOW;
  created() {
    console.log(this.command);
    this.run();
    // console.log(this.directory);
    // const child = OSProcess.run(this.directory, args);
    // this.$store.commit("setProcess", child);
  }

  async run() {
    let args = this.command.split("#");
    console.log(args);
    await OSProcess.run_new(args, this.osType,this.directory);
  }

  back() {
    this.$router.push("/");
  }

  next() {
    this.$store.commit("project/setId", this.id);
    this.$router.push("/home");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
