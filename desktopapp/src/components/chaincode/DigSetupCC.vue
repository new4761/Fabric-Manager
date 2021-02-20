<template>
  <div>
    <p>{{ _display }}</p>
    <br />
    <p>{{ _ccName }}</p>
    <br />
    <p>{{ _ccType }}</p>
    <br />
    <p>{{ _path }}</p>
    <br />
    <p>{{ args }}</p>
    <br />
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <InputText
            placeholder="CCName"
            v-model="ccName"
            @change="setCCName()"
          />
          <Dropdown
            v-model="selectedCCtype"
            :options="ccType"
            optionLabel="text"
            placeholder="Select CC type"
            @change="selectCCtype()"
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
        <div v-for="(item,index) in (args.length+1)" :key="index" >
            <InputArg v-if="useInit" @setArg="setArg($event,index)" @deleteArg="deleteArg(index)"></InputArg>
        </div>
        <br />
        <br />
        <Button label="dir" @click="getDir()" />
        <br />
        <br />
        <br />
        <Button label="deploy" @click="deploy()" />
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
import { CCtype } from "../../models/EnvProject";
import FileManager from "../../module/FileManager";
import InputArg from "../../components/chaincode/InputArg.vue"
const DigSetupCCProps = Vue.extend({
  props: {
    _ccName: String,
    _display: Boolean,
    _ccType: String,
    _path: String,
  },
});
@Component({
  components: { InputArg }

})
export default class DigSetupCC extends DigSetupCCProps {
  useInit = true;
  ccName = "";
  path = "";
  args:any = [];
  showDig: boolean = false;
  selectedCCtype: { data: CCtype; text: string } = {
    data: CCtype.go,
    text: "go",
  };
  ccType = [
    { data: CCtype.go, text: "go" },
    { data: CCtype.java, text: "java" },

    { data: CCtype.node, text: "node" },
  ];
  setCCName() {
    this.$emit("setCCName", this.ccName);
  }
  selectCCtype() {
    this.$emit("setCCtype", this.selectedCCtype.data);
  }
  deploy() {
    this.$emit("deploy",this.useInit,this.args);
  }
  close() {
    this.$emit("closeDig", false);
  }
  async getDir() {
    this.path = await FileManager.getDirPath();
    this.$emit("setPath", this.path);
  }
  
  setArg(value:any,index:number){
    //handle vue array change 
    this.$set(this.args, index, value)
  }
  deleteArg(index:number){
    if(index==0){
      this.args =[]
    }
    else {
    //console.log(index)
    this.args.splice(index, index)
    }
  }
}
</script>

<style></style>
