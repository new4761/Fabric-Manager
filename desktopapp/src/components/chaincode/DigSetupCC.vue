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
    <br />
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <small>Chaincode directory</small>
        <br />
        <div class="p-inputgroup">
          
          <InputText disabled v-model="path" />
          <Button label="dir" @click="getDir()" />
        </div>
        <br />

        <small>Chaincode and language</small>
        <br />
        <div class="p-inputgroup">
          <InputText placeholder="CCName" v-model="ccName" />
          <Dropdown
            v-model="selectedCCtype"
            :options="ccType"
            optionLabel="text"
            placeholder="Select CC type"
          />
        </div>
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
        <div v-for="(item, index) in args.length + 1" :key="index">
          <InputArg
            v-if="useInit"
            @setArg="setArg($event, index)"
            @deleteArg="deleteArg(index)"
          ></InputArg>
        </div>
      </div>
    </div>
    <br />
    <br />

    <Button label="deploy" @click="deployCC()"  class="p-button-outlined p-button-primary" />

    <Button label="close" @click="close()"  class="p-button-outlined p-button-danger" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { CCtype, netWorkConfigPath } from "../../models/EnvProject";

import FileManager from "../../module/FileManager";
import InputArg from "../../components/chaincode/InputArg.vue";
import ChainCodeProcess from "@/module/ChainCodeProcess";
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
  selectedChannel = { name: "" };
  selectedCCtype: { data: CCtype; text: string } = {
    data: CCtype.go,
    text: "go",
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

  deleteArg(index: number) {
    if (index == 0) {
      this.args = [];
    } else {
      //console.log(index)
      this.args.splice(index, index);
    }
  }
  async deployCC() {
    this.$emit("openLog", true);
    //TODO: fix channel
    let ccObj = await ChainCodeProcess.initNetworkConfig(
      this.ccName,
      this.selectedCCtype.data,
      this.path,
      this.selectedChannel.name
    );
    await ChainCodeProcess.deployCCtoFabric(
      ccObj,
      this.useInit,
      this.args,
      this.selectedOrg
    );
    // this.hookCClist();
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
