<template>
  <div>
    <Button
      icon="pi pi-power-off"
      class="p-button-rounded p-button-success p-button-lg"
      @click="display = true"
      v-show="!up"
    />

    <Button
      icon="pi pi-power-off"
      class="p-button-rounded p-button-danger p-button-lg"
      @click="netdown()"
      v-show="up"
    />

    <Button
      label="clean"
      @click="cleanup()"
      class="p-button-raised p-button-rounded p-m-1"
    />

    <div>
      <Dialog
        header="log"
        v-bind:visible="display2"
        :closable="false"
        modal
        :style="{ width: '80vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="console p-col-12">{{ output }}</div>

        <Button
          class="p-button-danger p-ml-auto p-m-2"
          label="close"
          @click="display2 = false"
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
@Component({
  components: {},
})
export default class DemoNetupButton extends Vue {
  up: boolean = false;
  projectDir: string = "";
  output: string = "hey";
  display: boolean = false;
  display2: boolean = false;
  orgSelected: string = "";
  org: any[] = [];
  port: string = "";
  mounted() {
    this.init();
  }
  init() {
    this.projectDir = ProjectConfig.getPath();
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
    console.log(args);
    const child = OSProcess.run(this.projectDir, args);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data: any) => {
      this.output = data.toString();
    });
    this.display2 = true;
    this.up = true;
  }
  netdown() {
    const child = OSProcess.run(this.projectDir, ["down"]);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data: any) => {
      this.output = data.toString();
    });
    this.display2 = true;
    this.up = false;
  }
  cleanup() {
    const child = OSProcess.run(this.projectDir, ["cleanup"]);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data: any) => {
      this.output += data.toString();
    });
    this.display2 = true;
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