<template>
  <div>
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <Button
          label="back"
          icon="fas fa-angle-double-left"
          class="p-button"
          @click="back()"
        />
      </div>
      <div class="p-col  p-text-right">
        <h1>Channel {{ channelName }}</h1>
      </div>
    </div>
    <div class="channel-edit-wrapper p-d-flex p-jc-center ">
      <div class="p-col">
        <div class="p-d-flex p-jc-center">
          <div class="channel-edit-config-view p-col">
            <div class="config-view-header">
              channel config
              <div class="p-col-4 p-text-right">
                <Button
                  icon="pi pi-refresh"
                  class="p-button-sm p-button-secondary"
                  label="query config"
                  @click="query()"
                />
              </div>
            </div>
            <div class="config-view-panel ">{{ channelConfig }}</div>
          </div>
        </div>
        <div class="p-d-grid p-jc-center">
          <div class="channel-edit-config-edit p-col ">
            <div class="edit-config-panel">
              for editing
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Dialog
        header="log"
        v-bind:visible="displaylog"
        :closable="false"
        modal
        :style="{ width: '80vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <Terminal />
        <Button
          class="p-button-danger p-ml-auto p-m-2"
          label="close"
          @click="displaylog = false"
        />
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";
import Terminal from "../components/Terminal.vue";
// import NetworkConfig from "../models/NetworkConfig";
const fs = require("fs");
const path = require("path");

const ChannelProps = Vue.extend({
  props: {
    channelName: String,
  },
});

@Component({
  components: { Terminal },
})
export default class ChannelEditPage extends ChannelProps {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channelConfig: any = {};

  mounted() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    let str = fs.readFileSync(
      path.join(
        this.$store.state.project.path +
          "/vars/" +
          this.channelName +
          "_config.json"
      ),
      "utf8"
    );
    this.channelConfig = JSON.parse(str);
  }

  back() {
    this.$router.push("/channel");
  }

  query() {
    let args: string[] = ["channelquery"];
    args.push("-c " + this.channelName);
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    this.displaylog = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.config-view-header {
  border-radius: 5px 5px 0px 0px;
  width: 100%;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(73, 73, 73);
  color: white;
  font-size: 15px;
  font-weight: bold;
}

.channel-edit-config-view {
  width: 100%;
}
.config-view-panel {
  max-width: 800px;
  height: 400px;
  background-color: darkblue;
  color: aliceblue;
  font-size: 12px;
  white-space: break-spaces;
  padding: 1em;
  overflow: auto;
}
.channel-edit-config-edit {
  width: 100%;
}
.edit-config-panel {
  width: 100%;
  height: 300px;
  line-height: 300px;
  font-size: 30px;
  background-color: rgb(168, 168, 168);
  text-align: center;
}
</style>
