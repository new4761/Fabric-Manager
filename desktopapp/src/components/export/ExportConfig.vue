<template>
  <div>
    <Button @click="exportConfig()" label="export" />
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
  async exportConfig() {
    this.$store.state.project.path;

    let _configtx = path.join("vars", "configtx.yaml");
    let _core = path.join("vars", "core.yaml");
    let _cryptoConfig = path.join("vars", "crypto-config.yaml");
    let _env = path.join("vars", "run");
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
      FileManager.copyFileExtension(
        path.join(this.$store.state.project.path, _env),
        path.join(this.exportDir, "docker"),
        ".env"
      );
      ComposeConfig.defaultOutputPath = path.join(this.exportDir, "docker");
      ComposeConfig.createFile();
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
