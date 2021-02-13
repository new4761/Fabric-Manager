<template>
  <div>
    <h1>
      <Button label="testNetwork" @click="testsetup()" />
      <br />
      <Button label="testcleanup" @click="testcleanup()" />
      <br />
      <Button label="go" @click="testGo()" />
      <br />
      <Button label="node" />
      <br />
      <Button label="java" />
      <br />
      <Button label="demo" @click="display = !display"></Button>
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
      <!-- <Button label="testupLoad" @click="testUpload()" /> -->
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import ChainCodeProcess from "../module/ChainCodeProcess";
import Component from "vue-class-component";
import DigSetupCC from "../components/chaincode/DigSetupCC.vue";
import {  CCtype } from "../models/EnvProject";
@Component({
  components: { DigSetupCC },
})
// window.open("/chaincode","_self")
export default class ChaincodePage extends Vue {
  ccName = "";
  display = false;
  ccType = CCtype.go;
  path ="";
  // test function 
  testsetup() {
    ChainCodeProcess.testFunction();
  }
  testcleanup() {
    ChainCodeProcess.testClean();
  }
  async testGo() {
    // let ccstate: CCstate;
    // ccstate = await ChainCodeProcess.setupFolder(
    //   this.ccName,
    //   this.getselectCCtype()
    // );
    // console.log(ccstate);
    // ccstate = await ChainCodeProcess.deployCC(
    //   this.ccName,
    //   this.getselectCCtype(),
    //   ccstate
    // );
    // console.log(ccstate);
    // ccstate = await ChainCodeProcess.approve(ccstate);
    // console.log(ccstate);
    // ccstate = await ChainCodeProcess.commit(ccstate);
    // console.log(ccstate);
  }

  // end testfunction
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
  setPath(data:string){
    this.path = data
  }

  //end emit
    deployCC(){
    ChainCodeProcess.initNetworkConfig(this.ccName,this.ccType,this.path);
  }
  setUp() {}
  update() {}
  invoke() {}
  query() {}
  //test funtion
}
</script>

<style></style>
