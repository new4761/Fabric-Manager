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
      <Button label="demo" @click="setUp()"></Button>
      <!-- <Button label="testupLoad" @click="testUpload()" /> -->
    </h1>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <InputText
            placeholder="CCName"
            v-model="ccName"
            @change="logCCName()"
          />
          <Dropdown
            v-model="selectedCCtype"
            :options="ccType"
            optionLabel="text"
            placeholder="Select CC type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import { CCstate, CCtype } from "../models/EnvProject";
import ChainCodeProcess from "../module/ChainCodeProcess";
import Component from "vue-class-component";
@Component({
  components: {},
})
// window.open("/chaincode","_self")
export default class ChaincodePage extends Vue {
  ccName: string = "";
  selectedCCtype: { data: CCtype; text: string } = {
    data: CCtype.go,
    text: "go",
  };
  ccType = [
    { data: CCtype.go, text: "go" },
    { data: CCtype.java, text: "java" },
    { data: CCtype.node, text: "node" },
  ];

  //test funtion
  logCCName() {
    console.log(this.ccName);
  }
  // logCCtype(e:any){
  //    console.log(e.value.data)
  //  console.log(this.selectedCCtype)
  // }
  getselectCCtype() {
    //  this.selectedCCtype = e.value.data;
    //console.log(this.selectedCCtype);
    return this.selectedCCtype.data;
  }
  testsetup() {
    ChainCodeProcess.testFunction();
  }
  testcleanup() {
    ChainCodeProcess.testClean();
  }
    async testGo() {
    let ccstate: CCstate;
    ccstate = await ChainCodeProcess.setupFolder(
      this.ccName,
      this.getselectCCtype()
    );
    console.log(ccstate);
    ccstate = await ChainCodeProcess.deployCC(
      this.ccName,
      this.getselectCCtype(),
      ccstate
    );
    console.log(ccstate);
    ccstate = await ChainCodeProcess.approve(ccstate);
    console.log(ccstate);
    ccstate = await ChainCodeProcess.commit(ccstate);
    console.log(ccstate);
  }
  testUpload() {
    ChainCodeProcess.testUpLoad();
  }
  // end testfunction
  setUp(){}
  update() {}
  invoke() {}
  query() {}
  //test funtion

}
</script>

<style></style>
