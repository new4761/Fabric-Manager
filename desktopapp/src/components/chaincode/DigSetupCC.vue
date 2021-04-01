<template>
  <div>
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <small>Selected Channel </small>
        <br />
        <Dropdown
          v-model="selectedChannel"
          :options="channelList"
          optionLabel="name"
        />
      </div>
      <div class="p-col-12">
        <small>Selected Peer Organization</small>
        <br />
        <Dropdown v-model="selectedOrg" :options="orgList" />
      </div>
    </div>
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <small>Chaincode directory</small>
        <br />
        <div class="p-inputgroup">
          <InputText disabled v-model="path" :class="{'p-invalid':inputGroup.inputDir}" />
          <Button label="dir" @click="getDir()" />
        </div>
        <small  v-if="inputGroup.inputDir" class="p-error">Required selected directory</small>
        <br />
        <small>Chaincode Name and language type</small>
        <br />
        <div class="p-inputgroup">
          <InputText
            placeholder="CCName"
            v-model="ccName"
            :class="{'p-invalid':ccExists||inputGroup.inputName}"
            @change="checkCCisExit(),checkInputgroup()"
          />
          <Dropdown
            v-model="selectedCCtype"
            :options="ccType"
            :class="{'p-invalid':ccExists||inputGroup.inputName}"
            optionLabel="text"
            placeholder="Select CC type"
            @change="checkCCisExit(),checkInputgroup()"
          />
        </div>
       <small v-if="inputGroup.inputName" class="p-error">Required Chaincode name </small>
        <small v-if="ccExists" class="p-error"
          >ChainCode name with selected type already exists in this channel
        </small>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            Instantiate/Initialize Method
          </span>
          <span class="p-inputgroup-addon">
            <InputSwitch ckass="p-inputswitch-checked" v-model="useInit" />
          </span>
        </div>
        <br />
        <Panel  v-if="useInit">
          <template #header>
            <small>Parameter List</small>
          </template>
        <div v-for="(item, index) in args.length + 1" :key="index">
          <InputArg
            @setArg="setArg($event, index)"
            @deleteArg="deleteArg(index)"
          ></InputArg>
        </div>
        </Panel>
      </div>
    </div>
    <br />
    <br />
     <div class="p-grid">
             <Button
        label="Cancle"
        icon="pi pi-times"
        @click="close()"
        class="p-button-outlined p-button-danger"
      />
    <Button
      label="Deploy"
      icon="pi pi-upload"
      @click="deployCC(),checkInputgroup()"
         class="p-button-outlined p-button-primary p-ml-auto p-px-3"
    />
     </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { CCtype, netWorkConfigPath } from "../../models/EnvProject";
import FileManager from "../../module/FileManager";
import InputArg from "../../components/chaincode/InputArg.vue";
import ChainCodeProcess from "@/module/ChainCode/ChainCodeProcess";
import NetworkConfig from "@/models/NetworkConfig";
const DigSetupCCProps = Vue.extend({
  props: {
    _display: Boolean,
  },
});
@Component({
  components: { InputArg },
})
export default class DigSetupCC extends DigSetupCCProps {
  channelList = [];
  orgList = [];
  useInit = true;
  ccName = "";
  path = "";
  args: any = [];
  showDig: boolean = false;
  selectedOrg = "";
  ccExists = false;
  selectedChannel = { name: "" };
  selectedCCtype: { data: CCtype; text: string } = {
    data: CCtype.go,
    text: "go",
  };
  inputGroup = {
    inputDir: false,
    inputName: false,
  };
  ccType = [
    { data: CCtype.go, text: "go" },
    // { data: CCtype.java, text: "java" },
    { data: CCtype.node, text: "node" },
  ];
  close() {
    this.$emit("closeDig", false);
  }
  async getDir() {
    this.path = await FileManager.getDirPath();
  }
  created() {
    this.channelList = NetworkConfig.getValue(netWorkConfigPath.channelPath);
    this.selectedChannel = this.channelList[0];
    this.orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    this.selectedOrg = this.orgList[0];
  }
  setArg(value: any, index: number) {
    //handle vue array change
    this.$set(this.args, index, value);
  }
  checkCCisExit() {
    let _ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    let target = _ccList.find(
      (item: any) =>
        item.name == this.ccName &&
        item.type == this.selectedCCtype.data &&
        item.channel == this.selectedChannel.name
    );
    if (target == undefined) {
     // console.log(target);
      this.ccExists = false;
    } else {
      this.ccExists = true;
    }
  }
  checkInputgroup(){
    if(this.ccName==""){
      this.inputGroup.inputName=true
    }
    else{
      this.inputGroup.inputName=false
    }
    if(this.path==""){
      this.inputGroup.inputDir=true
    }
    else{
      this.inputGroup.inputDir=false
    }

  }
  deleteArg(index: number) {
    if (index == 0) {
      this.args = [];
    } else {
      //console.log(index)
      this.args.splice(index, index);
    }
  }
  async deployCC() {
    if(!(this.ccName==""||this.path=="")){
    this.$emit("openLog", true);
    //TODO: fix channel
    let _ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // console.log(_ccList);
    let target = _ccList.find(
      (item: any) =>
        item.name == this.ccName &&
        item.type == this.selectedCCtype.data &&
        item.channel == this.selectedChannel.name
    );
    let ccObj;
    if (target == undefined) {
      ccObj = await ChainCodeProcess.initNetworkConfig(
        this.ccName,
        this.selectedCCtype.data,
        this.path,
        this.selectedChannel.name
      );
    } else {
      ccObj = target;
    }
    await ChainCodeProcess.deployCCtoFabric(
      ccObj,
      this.useInit,
      this.args,
      this.selectedOrg
    );
  }
  this.close()
  this.$emit("openLog", false);
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
