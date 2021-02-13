<template>
  <div>
    <p>{{ _display }}</p>
    <br />
    <p>{{ _ccName }}</p>
    <br />
    <p>{{ _ccType }}</p>
    <br />
    <p>{{ _path }}</p>
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
const DigSetupCCProps = Vue.extend({
  props: {
    _ccName: String,
    _display: Boolean,
    _ccType: String,
    _path:String
  },
});
@Component({
  components: {},
  // Vuex's component binding helper can use here
})
export default class DigSetupCC extends DigSetupCCProps {
  ccName = "";
  path = "";
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

  //test funtion
  setCCName() {
    this.$emit("setCCName", this.ccName);
  }
  // logCCtype(e:any){
  //    console.log(e.value.data)
  //  console.log(this.selectedCCtype)
  // }
  selectCCtype() {
    //  this.selectedCCtype = e.value.data;
    //console.log(this.selectedCCtype);
    this.$emit("setCCtype", this.selectedCCtype.data);
  }
  deploy(){
     this.$emit("deploy");
  }
  close() {
    this.$emit("closeDig", false);
  }
  async getDir() {
    this.path = await FileManager.getDirPath();
     this.$emit("setPath", this.path);
  }
}
</script>

<style></style>
