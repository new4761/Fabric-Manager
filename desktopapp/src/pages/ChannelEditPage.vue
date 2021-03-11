<template>
  <div>
    <!-- <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <Button
          label="back"
          icon="fas fa-angle-double-left"
          class="p-button"
          @click="back()"
        />
      </div>
      <div class="p-col  p-text-right">
        <h1>Channel {{ channelName }}</h1>
      </div>
    </div> -->
    <div class="channel-edit-wrapper">
      <div class="p-d-flex p-jc-center">
        <div class="channel-edit-config-view">
          <div class="config-view-header">
            channel config
            <div class="p-col-4 p-text-right">
              <Button
                icon="pi pi-refresh"
                class="p-button-sm p-button-secondary"
                label="query config"
                @click="query()"
              />
            </div>
          </div>

          <div class="edit-config-panel">
            <div class="p-grid">
              <div class="edit-config-menu p-col-3">
                <PanelMenu :model="items" />
              </div>

              <div class="edit-config-content p-col-9 p-p-5">
                <InputForm
                  :data="channelApplication"
                  :jsonKey="'channel_group.groups.Application'"
                  v-show="selectedMenu === '_app'"
                />

                <InputForm
                  :data="channelOrderer"
                  :jsonKey="'channel_group.groups.Orderer'"
                  v-show="selectedMenu === '_orderer'"
                />

                <InputForm
                  :data="channel"
                  :jsonKey="'channel_group'"
                  v-show="selectedMenu === '_channel'"
                />

                <div
                  v-for="(item, index) in Object.keys(
                    channelApplication.groups
                  )"
                  :key="index+'app'"
                  class="p-my-2"
                  v-show="selectedMenu === '_apporg'"
                >
                  <InputForm
                    :data="channelApplication.groups[item]"
                    :jsonKey="'channel_group.groups.Application.groups'"
                    :groupKey="item"
                    class="p-my-5"
                  />
                </div>

                <div
                  v-for="(item, index) in Object.keys(channelOrderer.groups)"
                  :key="index+'ord'"
                  class="p-my-2"
                   v-show="selectedMenu === '_ordererorg'"
                >
                  ---{{ item }}---
                  <InputForm
                    :data="channelOrderer.groups[item]"
                    class="p-my-5"
                  />
                </div>
              </div>
            </div>

            <!-- <InputForm :data="channelApplication" class="p-my-5" /> -->
          </div>
          <!-- <Dropdown
              v-model="selectedAppOrg"
              :options="Object.keys(channelApplication.groups)"
              placeholder="Select a City"
              v-on:change="updateComponent()"
            />
            ---{{ selectedAppOrg }}---
            <InputForm
              :data="channelApplication.groups[selectedAppOrg]"
              :jsonKey="'channel_group.groups.Application.groups'"
              :groupKey="selectedAppOrg"
              class="p-my-5"
              :key="componentKey"
            /> -->

          <!-- <Accordion :multiple="true" v-show="!notshow">
              <AccordionTab header="app org">
                <div
                  v-for="(item, index) in Object.keys(
                    channelApplication.groups
                  )"
                  :key="index"
                  class="p-my-2"
                >
                </div>
              </AccordionTab>
              <AccordionTab header="app">
                <InputForm :data="channelApplication" class="p-my-5" />
              </AccordionTab>
              <AccordionTab header="orderer org">
                <div
                  v-for="(item, index) in Object.keys(channelOrderer.groups)"
                  :key="index"
                  class="p-my-2"
                >
                  ---{{ item }}---
                  <InputForm
                    :data="channelOrderer.groups[item]"
                    class="p-my-5"
                  />
                </div>
              </AccordionTab>
              <AccordionTab header="orderer">
                <InputForm :data="channelOrderer" class="p-my-5" />
              </AccordionTab>
              <AccordionTab header="channel">
                <InputForm
                  :data="channel"
                  class="p-my-5"
                  :jsonKey="'channel_group'"
              /></AccordionTab>
            </Accordion> -->
        </div>
      </div>
    </div>

    <div>
      <ConsoleDialogue
        :_displaylog="displaylog"
        @update:_displaylog="(val) => (displaylog = val)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";
import ChannelConfig from "../models/ChannelConfig";
import ConsoleDialogue from "../components/ConsoleDialogue.vue";
import InputForm from "../components/channel/InputForm.vue";
// import NetworkConfig from "../models/NetworkConfig";
// const fs = require("fs");
// const path = require("path");
import { OsType } from "../models/EnvProject";
const ChannelProps = Vue.extend({
  props: {
    channelName: String,
  },
});

@Component({
  components: { ConsoleDialogue, InputForm },
})
export default class ChannelEditPage extends ChannelProps {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channel: any = {};
  channelPolicies: any = {};
  channelValues: any = {};
  channelApplication: any = {};
  channelOrderer: any = {};
  channelPoliciesString: string = "";
  notshow: boolean = false;

  selectedAppOrg: string = "";
  componentKey: number = 0;
  selectedMenu: string = "_app";

  items: any = [
    {
      label: "Channel",
      icon: "pi pi-fw pi-file",
      command: () => {
        this.updateComponent("_channel");
      },
    },
    {
      label: "Application",
      icon: "pi pi-fw pi-file",
      command: () => {
        this.updateComponent("_app");
      },
    },
    {
      label: "Orderer",
      icon: "pi pi-fw pi-file",
      command: () => {
        this.updateComponent("_orderer");
      },
    },

    {
      label: "app org",
      icon: "pi pi-fw pi-file",
      command: () => {
        this.updateComponent("_apporg");
      },
    },
    {
      label: "orderer org",
      icon: "pi pi-fw pi-file",
      command: () => {
        this.updateComponent("_ordererorg");
      },
    },
  ];

  private osType: OsType = OsType.WINDOW;
  created() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    try {
      ChannelConfig.setFile(this.channelName);
      this.channel = ChannelConfig.getValue("channel_group");
      this.channelPolicies = ChannelConfig.getValue("channel_group.policies");
      this.channelValues = ChannelConfig.getValue("channel_group.values");
      this.channelApplication = ChannelConfig.getValue(
        "channel_group.groups.Application"
      );
      this.channelOrderer = ChannelConfig.getValue(
        "channel_group.groups.Orderer"
      );
      // ChannelConfig.updateConfig(
      //   "channel_group.groups.Application.groups.org1-example-com.mod_policy",
      //   "Admins"
      // );
    } catch (e) {
      console.log(e);
      this.notshow = true;
    }
  }

  back() {
    this.$router.push("/channel");
  }

  updateComponent(selected: string) {
    // this.componentKey += 1;
    this.selectedMenu = selected;
  }

  async query() {
    this.displaylog = true;
    let args: string[] = ["channelquery"];
    args.push("-c");
    args.push(this.channelName);
    await OSProcess.run_new(args, this.osType);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/style/_variables.scss";

.p-accordion-content {
  background-color: rgb(73, 73, 73) !important;
  margin: 0 !important;
}
.p-accordion-tab.p-accordion-tab-active {
  margin: 0 !important;
}
.config-view-header {
  width: 100%;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(73, 73, 73);
  color: white;
  font-size: 15px;
  font-weight: bold;
}

.channel-edit-config-view {
  width: 100%;
}
.config-view-panel {
  max-width: 1000px;
  height: 400px;
  background-color: darkblue;
  color: aliceblue;
  font-size: 12px;
  white-space: break-spaces;
  word-wrap: break-word;
  padding: 1em;
  overflow: scroll;
}
.channel-edit-config-edit {
  width: 100%;
}
.edit-config-panel {
  height: 70vh;
  background-color: rgb(168, 168, 168);
  // text-align: center;
}

.edit-config-content {
  height: 70vh;
  background-color: rgb(87, 87, 87);
  overflow: auto;
}

.edit-config-menu {
  height: 70vh;
  background-color: rgb(37, 37, 37);
  overflow: auto;
}
</style>
