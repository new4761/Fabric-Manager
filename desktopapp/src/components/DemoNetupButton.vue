<template>
  <div class="p-m-5">
    <Button label="netup" @click="netup()" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import fs from "fs";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";

@Component({
  components: {},
})
export default class DemoNetupButton extends Vue {
  netup() {
    console.log("up");
    let rawdata = fs.readFileSync("./tests/test.json");
    let data = JSON.parse(rawdata.toString());
    let projectDir = data.project_config[0].directory;
    OSProcess.testfunction(projectDir, "minifab netup");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
