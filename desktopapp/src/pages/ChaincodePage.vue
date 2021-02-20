<template>
  <div class="p-grid p-mx-3">
    <div class="p-col-12 p-mx-3">
      <h1>
        <Button label="testNetwork" @click="testsetup()" />
        <br />
        <Button label="testcleanup" @click="testcleanup()" />
        <br />
        <!-- <Button label="go" @click="testGo()" />
        <br /> -->
        <Button label="SDK" @click="testSDK()" />
        <br />
               <Button label="console" @click="callConsole()" />
        <!-- <Button label="node" />
        <br />
        <Button label="java" />
        <br /> -->
        <Button label="demo" @click="display = !display"></Button>
      </h1>
    </div>
    <DataTable :value="ccList">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="type" header="Language"></Column>
      <Column header="Lastupdate">
        <template #body="obj">
          {{ convertTime(obj.data.lastUpdate) }}
        </template></Column
      >
      <Column header="state">
        <template #body="obj">
          <Tag :value="obj.data.state"></Tag>
        </template>
      </Column>
      <Column>
        <template #body="obj">
          {{ obj.data }}
        </template>
      </Column>
    </DataTable>

    <Dialog
      modal
      :dismissableMask="true"
      :showHeader="false"
      v-bind:visible="display"
    >
      <DigSetupCC
        @deploy="deployCC"
        @setCCName="setCCName"
        @closeDig="setDisplay"
        :_display="display"
        :_ccName="ccName"
        :_ccType="ccType"
        @setCCtype="setCCtype"
        :_path="path"
        @setPath="setPath"
      ></DigSetupCC>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import ChainCodeProcess from "../module/ChainCodeProcess";
import Component from "vue-class-component";
import DigSetupCC from "../components/chaincode/DigSetupCC.vue";
const isDevelopment = process.env.NODE_ENV !== "production";
import { CCtype, netWorkConfigPath } from "../models/EnvProject";
import NetworkConfig from "../models/NetworkConfig";
// eslint-disable-next-line no-unused-vars
import { ChainCode } from "@/models/ChainCode";
//import FabrickSDK from "../module/fabric/FabrickSDK";

@Component({
  components: { DigSetupCC },
})
// window.open("/chaincode","_self")
export default class ChaincodePage extends Vue {
  ccName = "";
  display = false;
  ccType = CCtype.go;
  path = "";
  ccList = [];
  // test function
  testSDK() {
    //FabrickSDK.connect();
  }

  testsetup() {
    ChainCodeProcess.testFunction();
  }
  testcleanup() {
    ChainCodeProcess.testClean();
  }
  //end test
  //emit function
  setCCtype(data: CCtype) {
    this.ccType = data;
  }
  setCCName(data: string) {
    this.ccName = data;
  }
  setDisplay(data: boolean) {
    this.display = data;
  }
  setPath(data: string) {
    this.path = data;
  }
  //end emit
  mounted() {
    this.hookCClist();
  }
  hookCClist() {
    this.ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // to do fix date to read
  }
  //end emit
  //render function
  convertTime(unix: number) {
    let dateNow: number = Date.now();
  //  console.log(new Date(unix).getDate());
    let dayNow = new Date(dateNow).getTime();
    let dayUpdate = new Date(unix).getTime();
    return this.msToTime(dayNow - dayUpdate);
  }
  msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = ((s - mins) / 60) % 24;
    var day = Math.round((s - mins) / 60 / 24);
    if (day >= 1) {
      return day + " " + "Days ago";
    } else if (hrs >= 1) {
      return hrs + " " + "Hours ago";
    } else {
      return mins + " " + "Minutes ago";
    }
  }
  callConsole(){
    //console.log(obj)
    this.$router.push({ name: 'ConsoleCC'});
  }
  //end render
  //CC function
  async deployCC(useInti: boolean, args: any) {
    //TODO: fix channel
    let channel = "testchannel";
    let ccObj = await ChainCodeProcess.initNetworkConfig(
      this.ccName,
      this.ccType,
      this.path,
      channel
    );
    this.hookCClist();
    //TODO: Get real project path
    let projectPath = "";
    if (isDevelopment) {
      projectPath = "test";
      await ChainCodeProcess.deployCCtoFabric(
        projectPath,
        ccObj,
        useInti,
        args
      );
      this.hookCClist();
    }
  }
  initCC() {}
  update() {}
  //test funtion
}
</script>

<style></style>
