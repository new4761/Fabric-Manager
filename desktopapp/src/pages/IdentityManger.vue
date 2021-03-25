<template>
  <div class="p-mx-4">
    <div class="p-col-12">
      <h5 class="p-text-bold p-mt-2">Identity Manager</h5>
      <hr />

      <div class="p-grid p-fluid p-nogutter">
        <div class="p-col-3">
          <small>Selected Peer Organization</small>
          <Dropdown
            class="p-mt-1"
            :options="orgList"
            v-model="selectedOrg"
            @change="setUserDataList($event.value)"
          />
        </div>
        <div class="p-col"></div>
        <div class="p-co3">
          <Button
            label="ADD NEW USER"
            icon="pi pi-user-plus"
            class="p-mt-4 p-ml-auto p-button-outlined p-button-sm p-button-warning"
            @click="(newUserDisplay = true), resetInput()"
          />
        </div>
      </div>
      <Panel class="p-mt-2">
        <template #header>Identity List</template>
        <DataTable :value="userDataList">
          <Column field="name" header="Name"></Column>
          <Column field="role" header="Role"></Column>
        </DataTable>
      </Panel>
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
        </div>
        <div class="p-grid p-mx-1 p-mt-1">
          <Button
            label="Cancle"
            icon="pi pi-times"
            @click="newUserDisplay = false"
            class="p-button-outlined p-button-danger"
          />
          <Button
            label="Enroll"
            icon="pi pi-user-plus"
            class="p-button-outlined p-button-primary p-ml-auto p-px-3"
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
