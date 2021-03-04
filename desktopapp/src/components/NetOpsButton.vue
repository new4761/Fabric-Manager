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
      <Dialog
        :header="command"
        v-bind:visible="displaylog"
        :closable="false"
        modal
        :style="{ width: '80vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <Terminal />
        <Button
          class="p-button-danger p-m-2"
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
            label="create"
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
import Terminal from "./Terminal.vue";
@Component({
  components: { Terminal },
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

  mounted() {
    this.init();
  }
  init() {
    this.projectDir = ProjectConfig.getPath(this.$store.state.project.id);
    this.org = Object.keys(NetworkConfig.getOrgName());
  }
  netup() {
    this.command = "";
    let args: string[] = ["restart"];
    if (this.orgSelected != "") {
      args.push("-o " + this.orgSelected);
    }
    if (this.port != "") {
      args.push("-e " + this.port);
    }
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    this.command = args.join();
    this.displaylog = true;
    this.up = true;
  }
  netdown() {
    this.command = "";
    const child = OSProcess.run(this.projectDir, ["down"]);
    this.$store.commit("setProcess", child);
    this.command = "down";
    this.displaylog = true;
    this.up = false;
  }
  cleanup() {
    this.command = "";
    const child = OSProcess.run(this.projectDir, ["cleanup"]);
    this.$store.commit("setProcess", child);
    this.command = "cleanup";
    this.displaylog = true;
  }

  restart() {
    this.command = "";
    const child = OSProcess.run(this.projectDir, ["restart"]);
    this.$store.commit("setProcess", child);
    this.command = "restart";
    this.displaylog = true;
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
