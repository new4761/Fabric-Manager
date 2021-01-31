<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import ProjectConfig from "../models/ProjectConfig";
@Component({
  components: {},
})
export default class Terminal extends Vue {
//   projectDir: string = "";
//   mounted() {
//     this.projectDir = ProjectConfig.getPath();
//     this.testrun();
//   }

//   testrun() {
//     var cmd = require("node-cmd");
//     const processRef = cmd.run("docker ps -a");
//     let data_line = "";

//     processRef.stdout.on("data", function(data: any) {
//       data_line += data;
//       if (data_line[data_line.length - 1] == "\n") {
//         console.log(data_line);
//       }
//     });

//     processRef.stdin.write("docker system prune -f");
//   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
