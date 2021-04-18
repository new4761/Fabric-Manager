<template>
  <div>
    <div class="identity-header p-grid p-ai-center vertical-container">
      Indentity Manager
    </div>

    <div class="p-grid p-nogutter identity-wrapper p-jc-center">
      <div class="p-col-12">
        <div
          class="p-d-flex p-jc-between p-ai-center identity-table-header p-py-2"
        >
          <div class="p-col">
            <div class="identity-table-header-text">
              Identity List
              <Dropdown
               class="indentity-dropdown p-ml-3"
                v-model="showOrg"
                :options="orgList"
                @change="setUserDataList($event.value)"
                
              />
            </div>
          </div>
          <div class="p-col p-text-right">
            <Button
              label="ADD NEW USER"
              icon="pi pi-user-plus"
              class="p-ml-auto p-button-outlined p-button-sm p-button-warning p-mr-3"
              @click="(newUserDisplay = true), resetInput()"
            />
          </div>
        </div>
        <Panel>
          <template #header>
            <div></div>
          </template>
          <div
            v-if="userDataList.length === 0"
            class="table-indentity-blocked p-d-flex p-jc-center p-ai-center"
          >
            <div class="p-col p-text-center">
              <i class="fas fa-unlink"></i> no user indentity
            </div>
          </div>
          <DataTable :value="userDataList" class="table-indentity" :scrollable="true" scrollHeight="flex"  v-else>
            <Column field="name" header="Name"></Column>
            <Column field="role" header="Role"></Column>
          </DataTable>
        </Panel>
        <Dialog
          modal
          :dismissableMask="true"
          :closable="false"
          v-bind:visible="newUserDisplay"
          :style="{ width: '400px', padding: '0px' }"
          :contentStyle="{ overflow: 'visible' }"
        >
          <template #header>
            <span>Add newuser</span>
            <!-- <span
              >Add newuser to <b>{{ selectedOrg }}</b></span
            >
            <Button
              @click="newUserDisplay = false"
              icon="pi pi-times"
              class="p-button-text p-ml-auto p-button-rounded"
            /> -->
          </template>
          <div class="p-fluid p-grid p-formgrid">
            <div class="p-field p-col-12">
              <label>Peer Organization</label>

              <Dropdown
                class="p-mt-1"
                :options="orgList"
                v-model="selectedOrg"
              />
            </div>

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
              <label>Role</label>
              <Dropdown v-model="userRole" :options="roleType" />
            </div>
          </div>
          <div class="p-grid p-mx-1 p-mt-1 p-jc-end">
            <Button
              label="Close"
              icon="pi pi-times"
              @click="newUserDisplay = false"
              class="p-button-outlined p-button-danger p-mx-3"
            />
            <Button
              label="Enroll"
              icon="pi pi-user-plus"
              class="p-button-outlined p-button-primary p-px-3"
              @click="enroll(), checkInputGroup(), (newUserDisplay = false)"
            />
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import { fixOrgName } from "@/module/OSProcess/StringBuilder";
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
  showOrg = "";
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
      this.showOrg = this.orgList[0];
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
  // TODO: add pop up error handle
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
.table-indentity {
  height: calc((100vh - 40px) - 155.78px - 30px);
}

.table-indentity-blocked {
  height: calc((100vh - 40px) - 155.78px - 30px);
}

.identity-header {
  padding: 30px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
  height: 90px;
}
.identity-table-header {
  width: 100%;
  background-color: rgb(73, 73, 73);
}
.identity-table-header-text {
  color: $primaryColor;
  font-size: 18px;
  font-weight: bold;
  padding-left: 15px;
}
.indentity-dropdown .p-dropdown-label {
  font-size: 15px;
  padding: 5px 10px 5px 10px;
  color: rgb(253, 253, 180);
  font-weight: bold;
}
</style>
