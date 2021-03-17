<template>
  <div class="cc-page-wrapper">
        <div class="p-grid p-fluid">
      <div class="p-col-12">
        <small>Selected Channel </small>
        <br />
        <Dropdown
          v-model="selectedChannel"
          :options="channelList"
          optionLabel="name"
        />
      </div>
      <div class="p-col-12">
        <small>Selected Peer Organization</small>
        <br />
        <Dropdown v-model="selectedOrg" :options="orgList" />
      </div>
    </div>
    <div @click="toggle()">
      <div class="cc-list-header p-grid p-ai-center vertical-container">
        ChainCode
        <div
          :class="{
            'toggle-open': showSection,
            'toggle p-mx-2': true,
          }"
        >
          <i class="fas fa-angle-double-down"></i>
        </div>

        <Button
          class="p-ml-auto p-button-sm p-button-primary"
          icon="pi pi-plus"
          label="Deploy new CC"
          @click.stop="setUpCCdisplay = true"
        ></Button>
      </div>
    </div>
    <transition name="smooth">
      <div v-show="showSection">
        <div class="p-grid">
          <ChaincodePage></ChaincodePage>
        </div>
      </div>
    </transition>

    <hr class="dotted" />
    <div class="cc-console-wrapper">
      <div class="p-d-flex">
        <h5 class="p-text-bold">ChainCode Operation</h5>
      </div>

      <div class="p-grid p-fluid ">
        <div class="p-col-2">
          <small>Command</small>
          <hr class="dotted" />
          <Dropdown
            v-model="ccComnand"
            :options="ccCommandOption"
            optionLabel="label"
          />
        </div>

        <div class="p-col-8">
          <small>Name</small>
          <hr class="dotted" />
          <Dropdown
            v-model="selectedCC"
            :options="ccList"
            optionLabel="name"
            @before-show="hookCClist"
            @change="setSelectedCC"
          />
        </div>

        <div class="p-col-2">
          <br />
          <hr class="dotted" />
          <Button
            label="SEND"
            @click="callCommand()"
            class="p-button-outlined p-button-primary"
          />
        </div>
      </div>

      <div>
        <Accordion>
          <AccordionTab>
            <template #header>
              <span
                >ChainCode :
                <b>{{ selectedCC.name }}</b>
              </span>
              <Button label="upgrade" class="p-ml-auto" @click="upGradeCC()" />
            </template>
            {{ selectedCC }}
          </AccordionTab>
        </Accordion>
      </div>
      <div class="p-grid">
        <div class="cc-args-wrapper">
          <div
            v-for="(item, index) in args.length + 1"
            :key="index"
            class="cc-args-item"
          >
            <InputArg
              @setArg="setArg($event, index)"
              @deleteArg="deleteArg(index)"
            ></InputArg>
          </div>
        </div>
      </div>
      <div class="p-col-12">
        <ScrollPanel style="width: 100%">
          <TabView>
            <TabPanel header="payload">
              <p>{{ output.fabricPayload }}</p>
            </TabPanel>
            <TabPanel header="response">
              <p v-for="(item, index) in output.response" :key="index">
                {{ item }}
              </p>
            </TabPanel>
            <TabPanel header="rawoutput">
              <p v-for="(item, index) in output.rawData" :key="index">
                {{ item }}
              </p>
            </TabPanel>
          </TabView>
        </ScrollPanel>
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
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import ChainCode from "@/models/ChainCode";
import ConsoleDialogue from "../../components/ConsoleDialogue.vue";
import DigSetupCC from "../../components/chaincode/DigSetupCC.vue";
import { netWorkConfigPath, ccOutputPayload } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import ChainCodeProcess from "@/module/ChainCodeProcess";
import ChaincodePage from "../ChaincodePage.vue";
import Vue from "vue";
import Component from "vue-class-component";
import InputArg from "../../components/chaincode/InputArg.vue";
const CCconsoleProps = Vue.extend({
  props: {
    ccID: String,
  },
});
@Component({
  components: { InputArg, DigSetupCC, ChaincodePage, ConsoleDialogue },
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
  selectedChannel = "";
  args: any = [];
  //digBox var
  listCCdisplay = false;
  setUpCCdisplay = false;
  displaylog = false;
  selectedCC = {};
  output: ccOutputPayload = new ccOutputPayload();
  // rawOutput:any=""
  ccCommandOption = [
    //  { label: "INIT", value: "init" },
    { label: "INVOKE", value: "invoke" },
    { label: "QUERY", value: "query" },
  ];
  showSection: boolean = false;
  created() {
    this.hookCClist();
    try{
    let _channelList =NetworkConfig.getValue(netWorkConfigPath.channelPath);
    // 
    let _orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    //console.log(_channelList)
    //console.log(_orgList)
    if(_orgList.length > 0){
    this.orgList = _orgList
    this.selectedOrg = this.orgList[0];
    }
    if(_channelList!=undefined){
  
    this.selectedCC = this.ccList[0];
    this.channelList = _channelList;
    this.selectedChannel = this.channelList[0];
    }}
    catch(e){console.log(e)}
    
    //console.log(NetworkConfig.getValue(netWorkConfigPath.channelPath)+":dasdasdasdasd")
  }
  mounted() {
    //console.log( new Date(Date.now()).toISOString())
  }
  //TODO hook on selected channel
  hookCClist() {
    // console.log("hook")
    let _ccList =NetworkConfig.getValue(netWorkConfigPath.ccPath)
    if(_ccList!=undefined){
    this.ccList = _ccList;
    // to do fix date to read
    }
  }

  setSelectedCC(e: any) {
    this.selectedCC = e.value;
    //console.log( this.selectedCC)
  }
  toggle() {
    this.showSection = !this.showSection;
  }

  async upGradeCC() {
    //TODO: Get real project path

    await ChainCodeProcess.updateCCtoFabric(this.selectedCC, this.selectedOrg);
    this.hookCClist();
  }
  callCommand() {
    this.resetOutput();
    this.callPeerCC(this.ccComnand.value);
  }
  openManagerCC() {
    this.$router.push({ name: "CCManager" });
  }
  async callPeerCC(command: string) {
    this.output = await ChainCodeProcess.callCC_command(
      this.selectedCC,
      this.args,
      command,
      this.selectedOrg
    );
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
