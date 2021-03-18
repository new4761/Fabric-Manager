<template>
  <div>
    <div class="p-col-12">
      <div class="cc-list-header p-grid p-ai-center vertical-container">
        <div class="p-col-10">
          <Dropdown
            :options="orgList"
            v-model="selectedOrg"
            @change="setUserDataList($event.value)"
          />
        </div>
        <div class="p-col p-ml-auto">
          <Button
            label="Add newuser"
            clase="p-ml-auto  p-button-sm p-button-primary"
            @click="newUserDisplay = true,resetInput()"
          />
        </div>
      </div>
      <DataTable :value="userDataList">
        <Column field="name" header="Name"></Column>
        <Column field="role" header="Role"></Column>
      </DataTable>
      <Dialog
        modal
        :dismissableMask="true"
        :closable="false"
        v-bind:visible="newUserDisplay"
      >
        <template #header>
          <span
            >Add newuser to <b>{{ selectedOrg }}</b></span
          >
          <Button
            @click="newUserDisplay = false"
            icon="pi pi-times"
            class="p-button-text p-ml-auto p-button-rounded"
          />
        </template>
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field p-col-12">
            <label>Username</label>
            <InputText
              :class="{ 'p-invalid': inputGroup.inputName }"
              placeholder="Username"
              v-model="userName"
            />
            <small v-if="inputGroup.inputName" class="p-error"
              >Required input UserName
            </small>
          </div>
          <div class="p-field p-col-12">
            <label>Password</label>
            <Password
              :class="{ 'p-invalid': inputGroup.inputPW }"
              v-model="userPassword"
              placeholder="Password"
              :toggleMask="true"
            />
            <small v-if="inputGroup.inputPW" class="p-error"
              >Required input Password
            </small>
          </div>

          <div class="p-field p-col-12">
            <label>Role Identified</label>
            <Dropdown v-model="userRole" :options="roleType" />
          </div>
          <Button
            label="Enroll"
            clase="p-ml-auto  p-button-sm p-button-primary"
            @click="enroll(), checkInputGroup()"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import { fixOrgName } from "@/module/StringBuilder";
import Vue from "vue";
import Component from "vue-class-component";
import FabricSDK from "@/module/FabricSDK/FabricSDKController";
const IdentityMangerProps = Vue.extend({});
@Component({
  components: {},
})
export default class IdentityManger extends IdentityMangerProps {
  userDataList: Array<object> = [];
  orgUserList: object = {};
  orgList: Array<string> = [];
  newUserDisplay = false;
  userName: string = "";
  userPassword: string = "";
  userRole: string = "";
  selectedOrg = "";
  inputGroup = {
    inputName: false,
    inputPW: false,
  };
  roleType = ["client", "peer", "admin", "orderer"];
  created() {
    let _orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    this.userRole = this.roleType[0];
    if (_orgList.length > 0) {
      // let _orgUserList = NetworkConfig.getValue(netWorkConfigPath.userPath);
      // console.log(_orgList)
      this.orgList = _orgList;
      // this.orgUserList = _orgUserList
      this.selectedOrg = this.orgList[0];
      this.setUserDataList(this.orgList[0]);
    }
    //this.selectedChannel = this.channelList[0];
  }
  setUserDataList(data: string) {
    // @ts-ignore: Unreachable code error
    let newUserData: Array<object> = [];
    //console.log( this.orgUserList[fixOrgName(data)])
    this.orgUserList = NetworkConfig.getValue(netWorkConfigPath.userPath);
    //this.userDataList = this.orgUserList[fixOrgName(data)]);
    // @ts-ignore: Unreachable code error
    if (this.orgUserList[fixOrgName(data)] != undefined) {
      // @ts-ignore: Unreachable code error
      Object.entries(this.orgUserList[fixOrgName(data)]).forEach(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => {
          // @ts-ignore: Unreachable code error
          newUserData.push(value);
        }
      );
    }
    this.userDataList = newUserData;
    //  console.log( this.userDataList)
  }
  resetInput() {
    this.userName = "";
    this.userPassword = "";
    this.inputGroup.inputName = false;
    this.inputGroup.inputPW = false;
  }
  checkInputGroup() {
    if (this.userName == "") {
      this.inputGroup.inputName = true;
    } else {
      this.inputGroup.inputName = false;
    }
    if (this.userPassword == "") {
      this.inputGroup.inputPW = true;
    } else {
      this.inputGroup.inputPW = false;
    }
  }
  async enroll() {
    if (!(this.userName == "" || this.userPassword == "")) {
      await FabricSDK.EnrollIdentity(
        this.selectedOrg,
        this.userName,
        this.userPassword,
        this.userRole
      );
      this.setUserDataList(this.selectedOrg);
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
