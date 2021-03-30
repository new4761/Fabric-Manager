<template>
  <div>
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <div class="p-fluid p-grid">
          <div class="p-col-3">
            <div class="p-mt-2 p-ml-1"><small>Name</small></div>
          </div>
          <div class="p-col-9">
            <InputText
              class="p-inputtext-sm"
              style="color: white"
              disabled
              type="text"
              v-model="name"
            />
          </div>
        </div>
        <div class="p-fluid p-grid">
          <div class="p-col-3">
            <div class="p-mt-2 p-ml-1"><small>Type</small></div>
          </div>
          <div class="p-col-9">
            <InputText
              class="p-inputtext-sm"
              style="color: white"
              disabled
              type="text"
              v-model="type"
            />
          </div>
        </div>
        <br />
        <small>Chaincode directory</small>
        <br />
        <div class="p-inputgroup">
          <InputText disabled v-model="path" />
          <Button label="dir" @click="getDir()" />
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
        <Panel v-if="useInit">
          <template #header>
            <small>Parameter List</small>
          </template>
          <div v-for="(item, index) in initArgs.length + 1" :key="index">
            <InputArg
              @setArg="setArg($event, index)"
              @deleteArg="deleteArg(index)"
              :_value="initArgs[index]"
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
        label="Upgrade"
        icon="pi pi-arrow-circle-up"
        @click="upGradeCC()"
        class="p-button-outlined p-button-primary p-ml-auto p-px-3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ChainCodeProcess from "@/module/ChainCode/ChainCodeProcess";
import Vue from "vue";
import Component from "vue-class-component";
import FileManager from "../../module/FileManager";
import InputArg from "./InputArg.vue";
const DigUpGradeCCProps = Vue.extend({
  props: {
    _display: Boolean,
    _selectedCC: Object,
    selectedOrg: String,
  },
});
@Component({
  components: { InputArg },
})
export default class DigUpgradeCC extends DigUpGradeCCProps {
  useInit = true;
  name = "";
  type = "";
  path = "";
  initArgs: any = [];
  showDig: boolean = false;
  ccExists = false;
  close() {
    this.$emit("closeDig", false);
  }
  async getDir() {
    this.path = await FileManager.getDirPath();
  }
  created() {
    this.setData(this._selectedCC);
  }
  setData(_selectedCC: any) {
    this.name = _selectedCC.name;
    this.type = _selectedCC.type;
    this.path = _selectedCC.directory;
    this.useInit = _selectedCC.useInit;
    this.initArgs = _selectedCC.initArgs;
  }
  setArg(value: any, index: number) {
    //handle vue array change
    this.$set(this.initArgs, index, value);
  }

  deleteArg(index: number) {
    if (index == 0) {
      this.initArgs = [];
    } else {
      //console.log(index)
      this.initArgs.splice(index, index);
    }
  }
  async upGradeCC() {
    this.$emit("openLog", true);
    this._selectedCC.directory = this.path;
    this._selectedCC.useInit = this.useInit;
    if (this._selectedCC.useInit == false) {
      this._selectedCC.initArgs = [];
    } else {
      this._selectedCC.initArgs = this.initArgs;
    }
    await ChainCodeProcess.updateCCtoFabric(this._selectedCC, this.selectedOrg);
    this.$emit("hookccList");
    //  this.hookCClist();
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
