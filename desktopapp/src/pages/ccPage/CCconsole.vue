<template>
  <div>
    <div class="p-col-12">
      <Accordion>
        <AccordionTab>
          <template #header>
            <span
              >Network selection = Current Channel :
              <b>{{ selectedChannel.name }}</b> Current Organization :
              <b>{{ selectedOrg }}</b>
            </span>
          </template>
          <div class="p-grid p-fluid">
            <div class="p-col-2">
              <small>Selected Channel </small>
              <br />
              <Dropdown
                v-model="selectedChannel"
                :options="channelList"
                optionLabel="name"
              />
            </div>
            <div class="p-col-10">
              <small>Selected Peer Organization</small>

              <br />
              <Dropdown v-model="selectedOrg" :options="orgList" />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
      <hr class="dotted" />
      <div class="p-d-flex">
        <h5 class="p-text-bold">ChainCode selection</h5>
        <Button
          class="p-ml-auto p-button-sm"
          icon="pi pi-plus"
          label="Deploy new CC"
          @click="setUpCCdisplay = true"
        ></Button>
        <Button
          class="p-button-sm p-ml-2"
          icon="pi pi-bars"
          label="CCList"
          @click="listCCdisplay = !listCCdisplay"
        ></Button>
      </div>
      <div class="p-grid p-fluid">
        <div class="p-col-2">
          <small>CC Command</small>
          <hr class="dotted" />
          <Dropdown
            v-model="ccComnand"
            :options="ccCommandOption"
            optionLabel="label"
          />
        </div>
        <div class="p-col-8">
          <small>CC Name</small>
          <hr class="dotted" />
          <Dropdown
            v-model="selectedCC"
            :options="ccList"
            optionLabel="name"
            @click="hookCClist()"
            @change="setSelectedCC"
          />
        </div>

        <div class="p-col-2">
          <br />
          <hr class="dotted" />
          <Button label="SEND" @click="callCommand()" />
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

    <Dialog
      modal
      :dismissableMask="true"
      :closable="false"
      v-bind:visible="setUpCCdisplay"
    >
      <template #header>
        <span>Deploy New ChaiCode</span>
        <Button
          @click="setUpCCdisplay = false"
          icon="pi pi-times"
          class="p-button-text p-ml-auto p-button-rounded"
        />
      </template>
      <DigSetupCC
        @closeDig="setUpCCDisplay"
        :_display="setUpCCdisplay"
      ></DigSetupCC>
    </Dialog>
    <Dialog
      modal
      :closable="false"
      v-bind:visible="listCCdisplay"
      :style="{ width: '80vw' }"
      ><template #header>
        <span>ChainCode List</span>
        <Button
          @click="setUpCCListisplay(false)"
          icon="pi pi-times"
          class="p-button-text p-ml-auto p-button-rounded"
        />
      </template>
      <ChaincodePage
        @closeDig="setUpCCDisplay"
        :_display="listCCdisplay"
      ></ChaincodePage>
    </Dialog>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import ChainCode from "@/models/ChainCode";
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
  components: { InputArg, DigSetupCC, ChaincodePage },
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
  selectedCC = {};
  output: ccOutputPayload = new ccOutputPayload();
  // rawOutput:any=""
  ccCommandOption = [
    //  { label: "INIT", value: "init" },
    { label: "INVOKE", value: "invoke" },
    { label: "QUERY", value: "query" },
  ];
  created() {
    this.hookCClist();
    this.selectedCC = this.ccList[0];
    this.channelList = NetworkConfig.getValue(netWorkConfigPath.channelPath);
    this.selectedChannel = this.channelList[0];
    this.orgList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    this.selectedOrg = this.orgList[0];
  }
  mounted() {
    //console.log( new Date(Date.now()).toISOString())
  }
  //TODO hook on selected channel
  hookCClist() {
    this.ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // to do fix date to read
  }
  test() {
    console.log(NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath));
  }
  setSelectedCC(e) {
    this.selectedCC = e.value;
    //console.log( this.selectedCC)
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
<style scoped></style>
