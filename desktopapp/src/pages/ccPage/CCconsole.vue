<template>
  <div class="p-col-12">
    <div class="p-inputgroup">
      <Dropdown
        v-model="ccComnand"
        :options="ccCommandOption"
        optionLabel="label"
      />
      <Dropdown
        v-model="selectedCC"
        :options="ccList"
        optionLabel="name"
        placeholder="Select CC"
      />
    </div>
    <div v-for="(item, index) in args.length + 1" :key="index">
      <InputArg
        @setArg="setArg($event, index)"
        @deleteArg="deleteArg(index)"
      ></InputArg>
    </div>
    <br />
    <br />
    <Button label="SEND" @click="callCommand()" />
    <br />
    <br />
    <Button label="goDeploy" @click="openManagerCC()" />
    <br />
    <Button label="upgrade" @click="upGradeCC()" />
    <br />
    <div class="p-grid p-jc-center p-my-1">
      <div class="container p-col-12">
        {{ selectedCC }}
      </div>
      <div class="p-col-12">
        <TabView>
          <TabPanel header="response">
            <div v-for="(item, index) in output.response" :key="index">
              {{ item }}
            </div>
            <!-- {{output.response}} -->
          </TabPanel>
          <TabPanel header="rawoutput">
            <div v-for="(item, index) in output.rawData" :key="index">
              {{ item }}
            </div>
            <!-- {{output.rawData}} -->
          </TabPanel>
          <TabPanel header="payload">
            {{ output.fabricPayload }}
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { ChainCode } from "@/models/ChainCode";
import { netWorkConfigPath, ccOutputPayload } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import ChainCodeProcess from "@/module/ChainCodeProcess";
const isDevelopment = process.env.NODE_ENV !== "production";
import Vue from "vue";
import Component from "vue-class-component";
import InputArg from "../../components/chaincode/InputArg.vue";
const CCconsoleProps = Vue.extend({
  props: {
    ccID: String,
  },
});
@Component({
  components: { InputArg },
})
export default class CCconsole extends CCconsoleProps {
  container: any = "";
  ccComnand: { label: string; value: string } = {
    label: "INVOKE",
    value: "invoke",
  };
  ccList = [];
  selectedCC = []
  args: any = [];
  output: ccOutputPayload = new ccOutputPayload();
  // rawOutput:any=""
  ccCommandOption = [
    //  { label: "INIT", value: "init" },
    { label: "INVOKE", value: "invoke" },
    { label: "QUERY", value: "query" },
  ];
  created() {
    this.hookCClist();
    this.selectedCC = this.ccList[0];
  }
  mounted() {
    //console.log( new Date(Date.now()).toISOString())
  }
  hookCClist() {
    this.ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // to do fix date to read
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
  async upGradeCC(){
    //TODO: Get real project path
    let projectPath = "";
    if (isDevelopment) {
      projectPath = "test";
      await ChainCodeProcess.updateCCtoFabric(
        projectPath,
        this.selectedCC,
        this.args
      );
      this.hookCClist();
  }
  }
  callCommand() {
    this.resetOutput()
    // if (this.ccComnand.value == "invoke") {
    //   this.invoke();
    // }
    // else if (this.ccComnand.value == "query") {
    //   this.query();
    // }
    this.callPeerCC(this.ccComnand.value)
  }
  openManagerCC() {
    this.$router.push({ name: "CCManager" });
  }
  async callPeerCC(command:string) {
    //TODO: Get real project path
    let projectPath = "";
    this.output = await ChainCodeProcess.callCC_command(
      projectPath,
      this.selectedCC,
      this.args,
      command
    );
  }
  // query() {}
  resetOutput() {
    this.output.rawData = [];
    this.output.response = [];
    this.output.fabricPayload = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
