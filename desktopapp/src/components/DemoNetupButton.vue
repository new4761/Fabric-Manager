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
    
    let rawdata = fs.readFileSync("./tests/net-config.json");
    let data = JSON.parse(rawdata.toString());
    console.log(data);
    let projectDir = data.project_config.directory;
    OSProcess.run(projectDir, ["netup", "-o org0.example.com","-e 7000"]);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
