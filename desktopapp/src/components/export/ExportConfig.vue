<template>
  <div class="p-col-12 ">
    <Button
      @click="display = true"
      icon="fas fa-file-export"
      label="configuration files"
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
        <span>ExportConnectionProfile</span>
      </template>
      <div>
      <div class="p-grid">
          <small>Selected config</small>
          <hr />
      </div>
      <div class="p-d-flex p-jc-between">
        <Button
          label="close"
          icon="pi pi-times"
          @click="close()"
          class="p-button-outlined p-button-danger p-button-sm p-mr-5"
        />
        <Button
          label="export"
          icon="pi pi-download"
          @click="exportConfig()"
          class="p-button-outlined p-button-primary p-button-sm p-ml-5"
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
const path = require("path");
@Component({
  components: {},
})
export default class ExportConfig extends Vue {
  exportDir: string = "";
  display:boolean = false;
  async exportConfig() {
    this.$store.state.project.path;

    let _configtx = path.join("vars", "configtx.yaml");
    let _core = path.join("vars", "core.yaml");
    let _cryptoConfig = path.join("vars", "crypto-config.yaml");
    await this.getDestination();

    if (this.exportDir) {
      FileManager.createDir(this.$store.state.project.path, "docker");
      FileManager.copyFilesDir(
        path.join(this.$store.state.project.path, _configtx),
        path.join(this.exportDir, "configtx.yaml")
      );

      FileManager.copyFilesDir(
        path.join(this.$store.state.project.path, _core),
        path.join(this.exportDir, "core.yaml")
      );

      FileManager.copyFilesDir(
        path.join(this.$store.state.project.path, _cryptoConfig),
        path.join(this.exportDir, "crypto-config.yaml")
      );
    }

    this.close()
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

    close(){
    this.display = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
