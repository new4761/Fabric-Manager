<template>
  <div>
    <!-- <div class="p-d-flex">
      <Button
        icon="fas fa-play"
        class="p-button-success p-button-lg p-m-1 p-p-1 p-button-outlined"
        @click="display = true"
      />

      <Button icon="fas fa-power-off" class=" p-button-danger p-button-lg p-m-1 p-button-outlined" @click="netdown()" />

      <Button icon="fas fa-trash" class=" p-button-secondary p-button-lg p-m-1 p-button-outlined" @click="cleanup()" />
    </div> -->
    <ConfirmDialog></ConfirmDialog>
    <div class="p-d-flex p-jc-center">
      <a class="power-button-offline" v-if="!this.$store.state.docker.isOnline" @click="display = true"
        ><i class="fa fa-power-off"></i
      ></a>
      <a class="power-button-online" v-if="this.$store.state.docker.isOnline" @click="netdown()"
        ><i class="fa fa-power-off"></i
      ></a>
    </div>

    <div>
      <ConsoleDialogue :_displaylog="displaylog" @update:_displaylog="(val) => (displaylog = val)" />
    </div>

    <div>
      <Dialog
        header="Network up"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '300px', padding: '0px' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-field p-grid p-fluid p-jc-center p-mt-1">
          <div class="p-col-12 p-px-5">
            <small>Selected Organization</small>
            <br />
            <Dropdown v-model="orgSelected" :options="org" style="width:100%;" />
          </div>
        </div>
        <div class="p-field p-grid p-fluid  p-jc-center">
          <div class="p-col-12 p-px-5">
            <small>expose port (optional)</small>
            <br />
            <InputText type="number" id="port" v-model="port" />
          </div>
        </div>
        <div class="p-d-flex p-jc-end p-mt-1 ">
          <Button class="p-button-danger p-m-2 p-button-outlined p-button-sm" label="close" @click="display = false" />
          <Button class="p-button-primary  p-ml-auto p-m-2 p-button-sm" label="start" @click="netup()" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ConsoleDialogue from "./ConsoleDialogue.vue";
import NetworkConfig from "../models/NetworkConfig";
import OSProcess from "../module/OSProcess/OSProcess";
import ProjectConfig from "../models/ProjectConfig";
import FileManager from "../module/FileManager";
const fs = require("fs");
const path = require("path");

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

  mounted() {
    this.init();
  }
  init() {
    this.projectDir = ProjectConfig.getPath(this.$store.state.project.id);
    this.org = Object.keys(NetworkConfig.getOrgData());
  }
  async netup() {
    this.$store.commit("setProcessContext", "netup");
    this.display = false;
    this.displaylog = true;
    this.up = true;
    let args: string[] = ["restart"];
    if (this.orgSelected != "") {
      args.push("-o");
      args.push(this.orgSelected);
    }
    if (this.port != "") {
      args.push("-e");
      args.push(this.port);
    } else {
      args.push("-e");
      args.push("true");
    }
    await OSProcess.run(args);
    this.$store.commit("docker/setActiveContainer");
    this.$store.commit("setProcessStatus", true);

    try {
      let _genesis = path.join(this.$store.state.project.path, "genesis.block");
      if (!fs.existsSync(_genesis)) {
        console.log("copy!!!");
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, "vars", "genesis.block"),
          path.join(this.$store.state.project.path, "genesis.block")
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
  async netdown() {
    this.$confirm.require({
      message: "Do you want to shutdown the network?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        this.$store.commit("setProcessContext", "netdown");
        this.displaylog = true;
        this.up = false;
        await OSProcess.run(["down"]);
        this.$store.commit("docker/setActiveContainer");
        this.$store.commit("setProcessStatus", true);
      },
      reject: () => {
        //callback to execute when user rejects the action
      },
    });
  }
  async cleanup() {
    this.displaylog = true;
    await OSProcess.run(["cleanup"]);
    this.$store.commit("docker/setActiveContainer");
    this.$store.commit("setProcessStatus", true);
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

a.power-button-offline {
  display: block;
  width: 70px;
  height: 70px;
  font-size: 2em;
  border: 2px solid #2c2c2c;
  background-color: #353535;
  text-align: center;
  line-height: 70px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  transition: color 0.8s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  // color:$primaryColor
  color: $dangerBgColor;
}
.power-button-offline:hover {
  color: $primaryColor;
}

a.power-button-online {
  display: block;
  width: 70px;
  height: 70px;
  font-size: 2em;
  border: 2px solid #2c2c2c;
  background-color: #353535;
  text-align: center;
  line-height: 70px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  transition: color 0.8s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  color: $primaryColor;
}
.power-button-online:hover {
  color: $dangerBgColor;
}
</style>
