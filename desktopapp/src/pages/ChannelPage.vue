<template>
  <div class="p-m-5">

    <div class="p-py-5">
      <div class="p-col-12 p-md-6">
        <div class="p-inputgroup">
          <Button label="create" />
          <InputText placeholder="name" v-model="channelName" />
        </div>
      </div>
      <div class="p-col-12 p-md-6">
        <div class="p-inputgroup">
          <Button label="join" />
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import fs from "fs";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";

@Component({
  components: {},
})
export default class ChannelPage extends Vue {
  projectDir: string = "";
  output: any = "hey";
  display: boolean = false;
  channelName: string = "";

  mounted() {
    this.init();
  }

  init() {
    let rawdata = fs.readFileSync("./tests/net-config.json");
    let data = JSON.parse(rawdata.toString());
    this.projectDir = data.project_config.directory;
  }

  create() {
    let args: string[] = ["create"];
    args.push("-c " + this.channelName);
    OSProcess.run(this.projectDir, args);
  }

  join() {
    let args: string[] = ["join"];
    OSProcess.run(this.projectDir, args);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
