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
        <span>Export configuration files</span>
      </template>
      <div class="p-p-2">
        
          <small>Selected config</small>
          <hr />
        
        <div class="p-field-checkbox">
          <Checkbox v-model="exportCore" :binary="true" />
          <label>core.yaml</label>
        </div>

        <div class="p-field-checkbox">
          <Checkbox v-model="exportCrypto" :binary="true" />
          <label>cryptoconfig.yaml</label>
        </div>

        <div class="p-field-checkbox">
          <Checkbox v-model="exportTx" :binary="true" />
          <label>configtx.yaml</label>
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
  exportCore: boolean = true;
  exportTx: boolean = true;
  exportCrypto: boolean = true;
  display: boolean = false;

  async exportConfig() {
    this.$store.state.project.path;

    let _configtx = path.join("vars", "configtx.yaml");
    let _core = path.join("vars", "core.yaml");
    let _cryptoConfig = path.join("vars", "crypto-config.yaml");
    await this.getDestination();

    if (this.exportDir) {
      FileManager.createDir(this.$store.state.project.path, "docker");

      if (this.exportTx) {
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _configtx),
          path.join(this.exportDir, "configtx.yaml")
        );
      }
      if (this.exportCore) {
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _core),
          path.join(this.exportDir, "core.yaml")
        );
      }
      if (this.exportCrypto) {
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _cryptoConfig),
          path.join(this.exportDir, "crypto-config.yaml")
        );
      }
    }

    this.close();
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
