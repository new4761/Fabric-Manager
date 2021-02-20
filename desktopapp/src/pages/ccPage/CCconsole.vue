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
    <br>
    <br>
        <div class="p-grid p-jc-center  p-my-1">
      <div class="container p-col-12 ">
        {{ container }}
      </div>
    
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { ChainCode } from "@/models/ChainCode";
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import ChainCodeProcess from "@/module/ChainCodeProcess";
import Vue from "vue";
import Component from "vue-class-component";
import InputArg from "../../components/chaincode/InputArg.vue";
import DockerProcess from "@/module/DockerProcess";
const CCconsoleProps = Vue.extend({
  props: {
    ccID: String,
  },
});
@Component({
  components: { InputArg },
})
export default class CCconsole extends CCconsoleProps {
  container: Array<Object> = [];
  ccComnand: {label:string,value:string } = { label: "INVOKE", value: "invoke" };
  ccList = [];
  selectedCC = {};
  args: any = [];
  ccCommandOption = [
    { label: "INVOKE", value: "invoke" },
    { label: "QUERY", value: "query" },
  ];
  created() {
    this.hookCClist();
    this.dockerFunc();
    this.selectedCC = this.ccList[0];
  }
  mounted(){

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
  callCommand() {
    if (this.ccComnand.value == "invoke") {
      this.invoke();
    }
  }
  openManagerCC() {
    this.$router.push({ name: "CCManager" });
  }
  async invoke() {
    //TODO: Get real project path
    let projectPath = "";
    await ChainCodeProcess.invoke(projectPath, this.selectedCC, this.args);
  }
  query() {}
  //dokcer Function 
  async dockerFunc(){
    let obj = await DockerProcess.listContainer().then((res: any) => {
    //  console.log(DockerProcess.testCall(res[0]))
      return  DockerProcess.testCall(res[2].Id)
    // DockerProcess.getLog(res[0])
    });
    DockerProcess.callback(obj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
