<template>
  <div class="p-col-12 ">
    <Button
      @click="display = true"
      icon="fas fa-file-export"
      label="network config"
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
        <span>Export network</span>
      </template>
      <div class="p-p-2">
        <small>config files and artifacts</small>
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

        <div class="p-field-checkbox">
          <Checkbox v-model="exportTx" :binary="true" />
          <label>genesis.block</label>
        </div>

        <div class="p-grid p-fluid">
          <div class="p-col-12">
            <small>network container</small>
            <hr />
            <div class="p-field-checkbox">
              <Checkbox v-model="exportKey" :binary="true" />
              <label>export MSP</label>
            </div>
            <div class="p-field-checkbox">
              <Checkbox v-model="exportKey" :binary="true" />
              <label>export Docker-compose.yaml</label>
            </div>
          </div>
        </div>

        <br />

        <div class="p-d-flex p-jc-end">
          <Button
            label="close"
            icon="pi pi-times"
            @click="close()"
            class="p-button-outlined p-button-danger p-button-sm p-mx-3"
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
import ComposeConfig from "../../module/ComposeConfig";
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
  exportKey: boolean = true;
  exportCompsoe: boolean = true;

  async exportConfig() {
    this.$store.state.project.path;

    let _configtx = path.join("vars", "configtx.yaml");
    let _core = path.join("vars", "core.yaml");
    let _cryptoConfig = path.join("vars", "crypto-config.yaml");
    let _env = path.join("vars", "run");
    let _key = path.join("vars", "keyfiles");
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
      FileManager.copyFileExtension(
        path.join(this.$store.state.project.path, _env),
        path.join(this.exportDir, "docker"),
        ".env"
      );
      if (this.exportKey) {
        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, _key),
          path.join(this.exportDir, "keyfiles")
        );

        FileManager.copyFilesDir(
          path.join(this.$store.state.project.path, "genesis.block"),
          path.join(this.exportDir, "genesis.block")
        );
      }
      if (this.exportCompsoe) {
        ComposeConfig.defaultOutputPath = path.join(this.exportDir, "docker");
        ComposeConfig.createFile();
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
