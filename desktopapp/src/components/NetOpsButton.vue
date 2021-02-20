<template>
  <div>
    <Button
      icon="pi pi-power-off"
      class="p-button-rounded p-button-success p-button-lg"
      @click="displayaction = true"
    />
    <div>
      <Dialog
        header="action"
        v-bind:visible="displayaction"
        :closable="false"
        modal
        :style="{ width: '50vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-col-12">
          <Button
            icon="pi pi-power-off"
            class="p-button-rounded p-button-success p-button-lg"
            @click="display = true"
          />

          <Button
            icon="pi pi-power-off"
            class="p-button-rounded p-button-danger p-button-lg"
            @click="netdown()"
          />

          <Button
            label="restart"
            @click="cleanup()"
            class="p-button-raised p-button-rounded p-m-1"
          />

          <Button
            label="clean"
            @click="cleanup()"
            class="p-button-raised p-button-rounded p-m-1"
          />
        </div>

        <Button
          class="p-button-danger p-ml-auto p-m-2"
          label="close"
          @click="displayaction = false"
        />
      </Dialog>
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
        <!-- <div class="console p-col-12">{{ output }}</div> -->

        <Terminal />

        <Button
          class="p-button-danger p-ml-auto p-m-2"
          label="close"
          @click="displaylog = false"
        />
      </Dialog>
    </div>

    <div>
      <Dialog
        header="Network up"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '30vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-col-12"></div>

        <span class="p-float-label">
          <InputText id="port" type="text" v-model="port" />
          <label for="port">port</label>
        </span>

        <span class="p-float-label">
          <Dropdown v-model="orgSelected" :options="org" />
          <label for="org">organization</label>
        </span>

        <div class="p-grid p-mt-5">
          <Button
            class="p-button-success p-m-2"
            label="create"
            @click="netup()"
          />

          <Button
            class="p-button-danger p-ml-auto p-m-2"
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
import Terminal from "./Terminal.vue";
@Component({
  components: { Terminal },
})
export default class NetOpsButton extends Vue {
  up: boolean = false;
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  displayaction: boolean = false;
  orgSelected: string = "";
  org: any[] = [];
  port: string = "";
  mounted() {
    this.init();
  }
  init() {
    this.projectDir = ProjectConfig.getPath(this.$store.state.project.id);
    this.org = Object.keys(NetworkConfig.getOrgName());
  }
  netup() {
    let args: string[] = ["netup"];
    if (this.orgSelected != "") {
      args.push("-o " + this.orgSelected);
    }
    if (this.port != "") {
      args.push("-e " + this.port);
    }
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess",child)
    this.displaylog = true;
    this.up = true;
  }
  netdown() {
    const child = OSProcess.run(this.projectDir, ["down"]);
    this.$store.commit("setProcess",child)
    this.displaylog = true;
    this.up = false;
  }
  cleanup() {
    const child = OSProcess.run(this.projectDir, ["cleanup"]);
    this.$store.commit("setProcess",child)
    this.displaylog = true;
  }
  data() {
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.console {
  background-color: rgb(2, 0, 122);
  border-radius: 5px;
  color: aliceblue;
  font-size: 10;
  white-space: break-spaces;
  padding: 1em;
  font-style: italic;
  overflow: auto;
  height: 500px;
}
</style>
