<template>
  <div>
    <div class="p-d-flex">
      <Button
        icon="fas fa-power-off"
        class="p-button-success p-button-lg p-m-1 p-p-1 p-button-outlined"
        @click="display = true"
      />

      <Button
        icon="fas fa-power-off"
        class=" p-button-danger p-button-lg p-m-1 p-button-outlined"
        @click="netdown()"
      />

      <Button
        icon="fas fa-trash"
        class=" p-button-secondary p-button-lg p-m-1 p-button-outlined"
        @click="cleanup()"
      />
    </div>

    <div>
      <ConsoleDialogue
        :_displaylog="displaylog"
        @update:_displaylog="(val) => (displaylog = val)"
      />
    </div>

    <div>
      <Dialog
        header="Network up"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '40vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-d-flex">
          <div class="p-col-12 p-ml-5 p-my-1">
            <span class="p-float-label">
              <Dropdown
                id="organization"
                v-model="orgSelected"
                :options="org"
              />
              <label for="organization">Default organization</label>
            </span>
          </div>
        </div>

        <div class="p-col-12 p-d-flex">
          <div class="p-ml-5 p-my-1">
            <span class="p-float-label">
              <InputText id="port" v-model="port" />
              <label for="port">port (optional)</label>
            </span>
          </div>
        </div>
        <div class="p-d-flex p-jc-end p-mt-1">
          <Button
            class="p-button-primary p-m-2"
            label="start"
            @click="netup()"
          />

          <Button
            class="p-button-danger p-ml-auto p-m-2 p-button-outlined"
            label="close"
            @click="display = false"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";
import NetworkConfig from "../models/NetworkConfig";
import ProjectConfig from "../models/ProjectConfig";
import ConsoleDialogue from "./ConsoleDialogue.vue";

import { OsType } from "../models/EnvProject";

@Component({
  components: { ConsoleDialogue },
})
export default class NetOpsButton extends Vue {
  up: boolean = false;
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  expose: boolean = false;
  orgSelected: string = "";
  org: any[] = [];
  port: string = "";
  command: string = "";

  private osType: OsType = OsType.WINDOW;

  mounted() {
    this.init();
  }
  init() {
    this.projectDir = ProjectConfig.getPath(this.$store.state.project.id);
    this.org = Object.keys(NetworkConfig.getOrgName());
  }
  async netup() {
    this.display = false;
    this.displaylog = true;
    this.up = true;
    this.command = "";
    let args: string[] = ["restart,anchorupdate"];
    if (this.orgSelected != "") {
      args.push("-o");
      args.push(this.orgSelected);
    }
    if (this.port != "") {
      args.push("-e");
      args.push(this.port);
    }
    await OSProcess.run_new(args);
    this.$store.commit("docker/setActiveContainer");
    this.command = args.join();
  }
  async netdown() {
    this.displaylog = true;
    this.up = false;
    this.command = "";
    await OSProcess.run_new(["down"]);
    this.$store.commit("docker/setActiveContainer");
    this.command = "down";
  }
  cleanup() {
    this.displaylog = true;
    this.command = "";
    const child = OSProcess.run(this.projectDir, ["cleanup"]);
    this.$store.commit("setProcess", child);
    this.command = "cleanup";
  }

  data() {
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";

.p-inputtext {
  width: 150px;
}
.p-dropdown {
  width: 200px;
}
</style>
