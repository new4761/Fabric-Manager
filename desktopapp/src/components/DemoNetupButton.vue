<template>
  <div>
    <Button
      label="network up"
      @click="display = true"
      class="p-button-raised p-button-rounded p-m-1"
    />

    <Button
      label="network down"
      @click="netdown()"
      class="p-button-raised p-button-rounded p-m-1"
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
        <div class="p-col-12">{{ output }}</div>

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
import fs from "fs";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";

@Component({
  components: {},
})
export default class DemoNetupButton extends Vue {
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
    let rawdata = fs.readFileSync("./tests/net-config.json");
    let data = JSON.parse(rawdata.toString());
    this.projectDir = data.project_config.directory;

    this.org = data.project_config.fabric.orderers.concat(
      data.project_config.fabric.peers
    );

    this.org.forEach((element, index) => {
      this.org[index] = element.replace(/^[^.]*./gm, "");
    });
    this.org = [...new Set(this.org)];
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
      console.log("stdout: " + data.toString());
      this.output = data.toString()
    });

    this.display2 = true;
  }

  netdown() {
    const child = OSProcess.run(this.projectDir, ["down"]);

    child.stdout.setEncoding("utf8");

    child.stdout.on("data", (data: any) => {
      console.log("stdout: " + data.toString());
       this.output = data.toString()
    });

    this.display2 = true;
  }

  cleanup() {
    const child = OSProcess.run(this.projectDir, ["cleanup"]);

    child.stdout.setEncoding("utf8");

    child.stdout.on("data", (data: any) => {
      console.log("stdout: " + data.toString());
       this.output += "/n" + data.toString()
    });

    this.display2 = true;
  }

  data() {
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
