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
            @click="newUserDisplay = true"
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
          <span>Add newuser</span>
          <Button
            @click="newUserDisplay = false"
            icon="pi pi-times"
            class="p-button-text p-ml-auto p-button-rounded"
          />
        </template>
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field p-col-12">
            <label>Username</label>
            <InputText placeholder="Username" v-model="userName"/>
          </div>
          <div class="p-field p-col-12">
            <label>Password</label>
            <Password
              v-model="userPassword"
              placeholder="Password"
              :toggleMask="true"
            />
          </div>
          <Button
            label="Enroll"
            clase="p-ml-auto  p-button-sm p-button-primary"
            @click="enroll()"
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
//import FabricSDK from "@/module/FabricSDK/FabricSDKController";
import MinifabricController from "@/module/MinifabricController";
const IdentityMangerProps = Vue.extend({});
@Component({
  components: {},
})
export default class IdentityManger extends IdentityMangerProps {
  userDataList: object = {};
  orgUserList: object = {};
  orgList: Array<string> = [];
  newUserDisplay = false;
  userName: string = "";
  userPassword: string = "";
  selectedOrg = "";
  created() {
    this.orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    this.orgUserList = NetworkConfig.getValue(netWorkConfigPath.userPath);
    this.selectedOrg = this.orgList[0];
    this.setUserDataList(this.orgList[0]);
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
  test(){
    MinifabricController.fixWalletIdentitiesForWindow()
  }
  async enroll() {
   await FabricSDK.EnrollIdentity(
      this.selectedOrg,
      this.userName,
      this.userPassword
    );
    this.setUserDataList(this.selectedOrg)
  }

}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
