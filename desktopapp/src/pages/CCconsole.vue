
<template>
  <div class="p-grid p-nogutter p-mr-3">
    <div class="p-col-7">
      <div class="cc-console-wrapper">
        <div class="p-d-flex">
          <h5 class="p-text-bold p-mt-2">ChainCode Operation</h5>
          <div class="p-ml-auto p-mt-1">
            <Button
              class="p-ml-auto p-button-outlined p-button-sm p-button-primary"
              icon="pi pi-plus"
              label="Deploy new CC"
              @click.stop="setUpCCdisplay = true"
            ></Button>
          </div>
        </div>
        <Panel>
          <div class="p-grid p-fluid">
            <div class="p-col-12">
              <small>Selected Channel </small>
              <br />
              <Dropdown
                v-model="selectedChannel"
                :options="channelList"
                optionLabel="name"
                @change="hookCClist"
              />
            </div>
            <div class="p-col-12">
              <small>Selected Peer Organization</small>
              <br />
              <Dropdown v-model="selectedOrg" :options="orgList" />
            </div>
          </div>
        </Panel>
        <br />
        <Panel>
          <div class="p-grid p-fluid p-nogutter">
            <div class="p-col-3">
              <small>Command</small>
              <Dropdown
                v-model="ccComnand"
                :options="ccCommandOption"
                optionLabel="label"
              />
            </div>
            <div class="p-col-6">
              <small>Name</small>
              <Dropdown
                v-model="selectedCC"
                :options="ccList"
                optionLabel="name"
                @before-show="hookCClist"
                @change="setSelectedCC, updateInfo($event)"
              />
            </div>
            <div class="p-col-3">
              <br />
              <Button
                label="SEND"
                @click="callCommand()"
                style="height: 45px"
                class="p-button-outlined p-button-primary"
              />
            </div>
          </div>
        </Panel>
        <Panel>
          <template #header>
            <small>Parameter List</small>
          </template>
          <div class="p-grid p-fluid p-nogutter">
            <div
              v-for="(item, index) in args.length + 1"
              :key="index"
              class="p-col-12"
            >
              <InputArg
                @setArg="setArg($event, index)"
                @deleteArg="deleteArg(index)"
              ></InputArg>
            </div>
          </div>
        </Panel>
        <br />
        <Panel>
          <template #header>Response</template>
          <div class="p-col-12">
              <div class="p-inputgroup">
            <SelectButton
              v-model="selectedActive"
              :options="selectedOutput"
              optionLabel="name"
            />
              </div>
              
            <Panel v-if="selectedActive.active == 0">
              <ScrollPanel style="width: 100%; height: 200px">
                <p>{{ output.fabricPayload }}</p>
              </ScrollPanel>
            </Panel>

            <Panel v-if="selectedActive.active == 1">
              <ScrollPanel style="width: 100%; height: 200px">
                <p v-for="(item, index) in output.response" :key="index">
                  {{ item }}
                </p>
              </ScrollPanel>
            </Panel>

            <Panel v-if="selectedActive.active == 2">
              <ScrollPanel style="width: 100%; height: 200px">
                <p v-for="(item, index) in output.rawData" :key="index">
                  {{ item }}
                </p>
              </ScrollPanel>
            </Panel>
          </div>
        </Panel>
      </div>
    </div>
    <div class="p-col-fixed p-nogutter p-mt-3">
      <div
        style="border-left: 3px solid rgba(134, 224, 200, 0.178); height: 100%"
      ></div>
    </div>
    <div class="p-col p-mt-3 p-ml-3">
      <div class="p-mt-5">
        <br />
        <CCDetails
          :_selectedCC="selectedCC"
          ref="info"
          :selectedOrg="selectedOrg"
          @hookccList="hookCClist"
        ></CCDetails>
      </div>
    </div>
    <Dialog
      modal
      :dismissableMask="true"
      :closable="false"
      v-bind:visible="setUpCCdisplay"
    >
      <template #header>
        <span>Deploy New ChainCode</span>
        <Button
          @click="setUpCCdisplay = false"
          icon="pi pi-times"
          class="p-button-text p-ml-auto p-button-rounded"
        />
      </template>
      <DigSetupCC
        @openLog="displayLog"
        @closeDig="setUpCCDisplay"
        :_display="setUpCCdisplay"
      ></DigSetupCC>
    </Dialog>
    <div>
      <ConsoleDialogue
        :_displaylog="displaylog"
        @update:_displaylog="(val) => (displaylog = val)"
      />
      <CommandLoading
      :_display="cmdLoading"
      ></CommandLoading>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import ChainCode from "@/models/ChainCode";
import ConsoleDialogue from "../components/ConsoleDialogue.vue";
import DigSetupCC from "../components/chaincode/DigSetupCC.vue";
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import ChainCodeProcess from "@/module/ChainCodeProcess";
import ChaincodeList from "@/components/chaincode/ChaincodeList.vue";
import Vue from "vue";
import Component from "vue-class-component";
import CCDetails from "@/components/chaincode/console/CCDetails.vue";
import CommandLoading from "@/components/chaincode/console/ccCommandLoading.vue";
import InputArg from "../components/chaincode/InputArg.vue";
const CCconsoleProps = Vue.extend({
  props: {
    ccID: String,
  },
});
@Component({
  components: {
    CCDetails,
    InputArg,
    DigSetupCC,
    ChaincodeList,
    ConsoleDialogue,CommandLoading
  },
})
export default class CCconsole extends CCconsoleProps {
  container: any = "";
  ccComnand: { label: string; value: string } = {
    label: "INVOKE",
    value: "invoke",
  };
  ccList = [];
  channelList = [];
  orgList = [];
  selectedOrg = "";
  selectedChannel: any = "";
  args: any = [];
  cmdLoading= false;
  //digBox var
  listCCdisplay = false;
  setUpCCdisplay = false;
  displaylog = false;
  selectedCC = {};
  output: any = {};
  selectedActive: any = { name: "Response", active: 0 };
  selectedOutput = [
    { name: "Response body", active: 0 },
    { name: "Debug", active: 1 },
    { name: "Debug Raw", active: 2 },
  ];
  // rawOutput:any=""
  ccCommandOption = [
    //  { label: "INIT", value: "init" },
    { label: "INVOKE", value: "invoke" },
    { label: "QUERY", value: "query" },
  ];
  showSection: boolean = false;

  $refs!: {
    info: CCDetails;
  };
  updateInfo(e: any) {
    //console.log(e.value);
    this.$refs.info.setData(e.value);
  }
  created() {
    // this.demoOutput();
    try {
      let _channelList = NetworkConfig.getValue(netWorkConfigPath.channelPath);
      //
      let _orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
      //console.log(_channelList)
      //console.log(_orgList)
      if (_orgList.length > 0) {
        this.orgList = _orgList;
        this.selectedOrg = this.orgList[0];
      }
      if (_channelList != undefined) {
        this.channelList = _channelList;
        this.selectedChannel = this.channelList[0];
        this.hookCClist();
        this.selectedCC = this.ccList[0];
      }
    } catch (e) {
      console.log(e);
    }

    //console.log(NetworkConfig.getValue(netWorkConfigPath.channelPath)+":dasdasdasdasd")
  }
  mounted() {
    //console.log( new Date(Date.now()).toISOString())
  }
  hookCClist() {
    // console.log("hook")
    let _ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    this.ccList = _ccList.filter(
      (obj: ChainCode) => obj.channel == this.selectedChannel.name
    );
    if (this.ccList.length > 0) {
      this.selectedCC = this.ccList[0];
    }

    // to do fix date to read
  }

  setSelectedCC(e: any) {
    this.selectedCC = e.value;
    //console.log( this.selectedCC)
  }
  toggle() {
    this.showSection = !this.showSection;
  }

  async callCommand() {
    this.callPeerCC(this.ccComnand.value);
  }
  openManagerCC() {
    this.$router.push({ name: "CCManager" });
  }
  async callPeerCC(command: string) {
    this.cmdLoading = true;
    this.resetOutput();
    let output = await ChainCodeProcess.callCC_command(
      this.selectedCC,
      this.args,
      command,
      this.selectedOrg
    );
    this.output.rawData = output.rawData;
    this.output.response = output.response;
    this.output.fabricPayload = output.fabricPayload;
     this.cmdLoading = false;
    //console.log(output)
  }
  // query() {}
  resetOutput() {
    this.output.rawData = [];
    this.output.response = [];
    this.output.fabricPayload = "";
  }
  // component function
  setArg(value: any, index: number) {
    //handle vue array change
    this.$set(this.args, index, value);
  }

  displayLog(data: boolean) {
    this.displaylog = data;
  }

  setUpCCDisplay(data: boolean) {
    this.setUpCCdisplay = data;
  }
  setUpCCListisplay(data: boolean) {
    this.listCCdisplay = data;
  }
  deleteArg(index: number) {
    if (index == 0) {
      this.args = [];
    } else {
      //console.log(index)
      this.args.splice(index, index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
.vl {
  border-left: 6px solid rgb(20, 34, 20);
  height: 500px;
}
.cc-list-header {
  padding: 30px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.cc-console-wrapper {
  padding: 20px;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.cc-args-wrapper {
  padding: 20px;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.smooth-enter,
.smooth-leave-to {
  overflow: hidden;
  max-height: 0;
}

.smooth-enter-to,
.smooth-leave {
  overflow: hidden;
  max-height: 1000px;
}

.smooth-leave-active {
  overflow: hidden;
  transition: max-height 0.3s;
}

.smooth-enter-active {
  overflow: hidden;
  transition: max-height 1s;
}

.toggle {
  transition: transform 0.2s ease;
}
.toggle-open {
  transform: rotate(180deg);
  color: $primaryColor;
}
</style>
