<template>
  <div>
    <!-- <p>{{ _display }}</p>
    <p>{{ useInit }}</p>
    <p>{{ ccName }}</p>
    <p>{{ selectedCCtype.data }}</p>
    <p>{{ path }}</p>
    <p>{{ args }}</p>
    <p>{{ selectedChannel.name }}</p>
    <p>{{ selectedOrg }}</p> -->
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
    <br>
    <div class="p-grid p-fluid">
      <div class="p-col-12">
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
         <br>
        <div v-for="(item, index) in args.length + 1" :key="index">
          <InputArg
            v-if="useInit"
            @setArg="setArg($event, index)"
            @deleteArg="deleteArg(index)"
          ></InputArg>
        </div>
        <br />
        <br />
        <Button label="dir" @click="getDir()" />
        <br />
        <br />
        <br />
        <Button label="deploy" @click="deployCC()" />
        <br />
        <br />
        <br />
        <Button label="close" @click="close()" />
      </div>
    </div>
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
    //TODO: fix channel
    let ccObj = await ChainCodeProcess.initNetworkConfig(
      this.ccName,
      this.selectedCCtype.data,
      this.path,
      this.selectedChannel.name
    );
    // this.hookCClist();
    //TODO: Get real project path

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
