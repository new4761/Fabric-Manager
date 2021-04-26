<template>
  <div class="p-col-12">
    <Button
      @click="display = true"
      icon="fab fa-docker"
      label="docker compose"
      class="p-button-outlined p-button-primary p-button-sm"
    />

    <Dialog
      modal
      :dismissableMask="true"
      :closable="false"
      v-bind:visible="display"
      :style="{ width: '300px', padding: '0px' }"
      :contentStyle="{ overflow: 'visible' }"
    >
      <template #header>
        <span>Export compose files</span>
      </template>
      <div>
        <div class="p-grid p-fluid">
          <div class="p-col-12">
            <!-- <small>Organization identity to exports</small> -->
            <hr />
            <div class="p-field-checkbox">
              <Checkbox v-model="exportKey" :binary="true" />
              <label>export keyfiles</label>
            </div>
          </div>
        </div>

        <div class="p-d-flex p-jc-end">
          <Button
            label="close"
            icon="pi pi-times"
            @click="display = false"
            class="p-button-outlined p-button-danger p-button-sm p-mx-3"
          />
          <Button
            label="export"
            icon="pi pi-download"
            @click="exportCompose()"
            class="p-button-outlined p-button-primary p-button-sm"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const { dialog } = require("electron").remote;
import FileManager from "../../module/FileManager";
import ComposeConfig from "../../module/ComposeConfig";
import { exportConfigPath } from "@/models/EnvProject";
const path = require("path");
@Component({
  components: {},
})
export default class ExportCompose extends Vue {
  exportDir: string = "";
  exportKey: boolean = true;
  display: boolean = false;
  async exportCompose() {
    console.log("export!!!");
    this.$store.state.project.path;
    let _env = path.join("vars", "run");
    let _key = path.join("vars", "keyfiles");
    let _core = path.join("vars","core.yaml");
    let _configtx = path.join("vars","configtx.yaml");
    let _crypto_config = path.join("vars","crypto-config.yaml");
    await this.getDestination();
    if (this.exportDir) {
      FileManager.copyFileExtension(
        path.join(this.$store.state.project.path, _env),
        path.join(this.exportDir, "docker"),
        ".env"
      );
      if (this.exportKey) {
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _key),
          path.join(this.exportDir,"docker",exportConfigPath.folder_cli, "keyfiles")
        );
      }
      ComposeConfig.defaultOutputPath = path.join(this.exportDir, "docker");
      ComposeConfig.createFile();
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, "genesis.block"),
          path.join(this.exportDir,"docker",exportConfigPath.folder_cli, "genesis.block")
        );
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _configtx),
          path.join(this.exportDir,"docker",exportConfigPath.folder_cli, "configtx.yaml")
        );
       FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _crypto_config),
          path.join(this.exportDir,"docker",exportConfigPath.folder_cli, "crypto-config.yaml")
        );
       FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _core),
          path.join(this.exportDir,"docker",exportConfigPath.folder_cli, "core.yaml")
        );
      this.close();
    }
  }

  async getDestination() {
    await dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((result) => {
        this.exportDir = result.filePaths[0];
      });
  }

  close() {
    this.display = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
