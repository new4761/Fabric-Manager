<template>
  <div>
    <div v-if="channel">
      <div class=" p-grid p-jc-center">
        <div class="channel-edit-config-view">
          <div class="edit-config-panel">
            <div class="p-grid">
              <div class="edit-config-menu p-col-3">
                <PanelMenu :model="items" />
              </div>
              <div class="p-col">
                <div class="edit-config-content p-p-5 p-grid p-jc-center">
                  <div class="p-col-9">
                    <ScrollPanel class="edit-config-scroll">
                      <div v-show="selectedMenu === '_app'">
                        <h3 class="p-text-bold">Application</h3>
                        <hr class="dott" />

                        <InputForm
                          :data="channelApplication"
                          :jsonKey="'channel_group.groups.Application'"
                          :channel="channelName"
                        />

                        <!-- <ValueForm
                    :data="channelApplication"
                    :jsonKey="'channel_group.groups.Application'"
                    :channel="channelName"
                  /> -->
                      </div>
                      <div v-show="selectedMenu === '_orderer'">
                        <h3 class="p-text-bold">Orderer</h3>
                        <hr class="dott" />
                        <InputForm
                          :data="channelOrderer"
                          :jsonKey="'channel_group.groups.Orderer'"
                          :channel="channelName"
                        />

                        <ValueForm
                          :data="channelOrderer"
                          :jsonKey="'channel_group.groups.Orderer'"
                          :channel="channelName"
                        />
                      </div>
                      <div v-show="selectedMenu === '_channel'">
                        <h3 class="p-text-bold">Channel</h3>
                        <hr class="dott" />
                        <InputForm :data="channel" :jsonKey="'channel_group'" :channel="channelName" />

                        <ValueForm :data="channel" :jsonKey="'channel_group'" :channel="channelName" />
                      </div>
                      <div v-show="selectedMenu === '_apporg'">
                        <h3 class="p-text-bold">Application Organization</h3>
                        <hr class="dott" />
                        <div
                          v-for="(item, index) in Object.keys(channelApplication.groups)"
                          :key="index + 'app'"
                          class="p-my-2"
                          v-show="selectedMenu === '_apporg'"
                        >
                          <h5>{{ item }}</h5>
                          <InputForm
                            :data="channelApplication.groups[item]"
                            :jsonKey="'channel_group.groups.Application.groups'"
                            :groupKey="item"
                            :channel="channelName"
                          />

                          <ValueForm
                            :data="channelApplication.groups[item]"
                            :jsonKey="'channel_group.groups.Application.groups'"
                            :groupKey="item"
                            :channel="channelName"
                          />
                        </div>
                      </div>
                      <div v-show="selectedMenu === '_ordererorg'">
                        <h3 class="p-text-bold">orderer Organization</h3>
                        <hr class="dott" />
                        <div
                          v-for="(item, index) in Object.keys(channelOrderer.groups)"
                          :key="index + 'ord'"
                          class="p-my-2"
                          v-show="selectedMenu === '_ordererorg'"
                        >
                          <h5>{{ item }}</h5>
                          <InputForm
                            :data="channelOrderer.groups[item]"
                            :jsonKey="'channel_group.groups.Orderer.groups'"
                            :groupKey="item"
                            :channel="channelName"
                          />

                          <ValueForm
                            :data="channelOrderer.groups[item]"
                            :jsonKey="'channel_group.groups.Orderer.groups'"
                            :groupKey="item"
                            :channel="channelName"
                          />
                        </div>
                      </div>
                    </ScrollPanel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="table-channel-blocked p-d-flex p-jc-center p-ai-center">
      <div class="p-col p-text-center"><i class="fas fa-unlink"></i> no channel</div>
    </div>

    <div>
      <ConsoleDialogue :_displaylog="displaylog" @update:_displaylog="(val) => (displaylog = val)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ChannelConfig from "../../models/ChannelConfig";
import ConsoleDialogue from "../ConsoleDialogue.vue";
import InputForm from "./InputForm.vue";
import ValueForm from "./ValueForm.vue";
// import NetworkConfig from "../models/NetworkConfig";
// const fs = require("fs");
// const path = require("path");

const ChannelProps = Vue.extend({
  props: {
    channelName: String,
  },
});

@Component({
  components: { ConsoleDialogue, InputForm, ValueForm },
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
  selectedMenu: string = "_channel";

  items: any = [
    {
      label: "Channel",
      icon: "fas fa-network-wired",
      command: () => {
        this.updateComponent("_channel");
      },
    },
    {
      label: "Application",
      icon: "fas fa-file",
      command: () => {
        this.updateComponent("_app");
      },
    },
    {
      label: "Orderer",
      icon: "fas fa-file-signature",
      command: () => {
        this.updateComponent("_orderer");
      },
    },
    // {
    //   label: "org(//TODO)",
    //   icon: "fas fa-address-card",

    //   items: [
    //     {
    //       label: "app org",
    //       icon: "fas fa-address-card",
    //       command: () => {
    //         this.updateComponent("_apporg");
    //       },
    //     },
    //     {
    //       label: "orderer org",
    //       icon: "fas fa-address-card",
    //       command: () => {
    //         this.updateComponent("_ordererorg");
    //       },
    //     },
    //   ],
    // },
  ];

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
      this.channelApplication = ChannelConfig.getValue("channel_group.groups.Application");
      this.channelOrderer = ChannelConfig.getValue("channel_group.groups.Orderer");
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
  height: 100vh;
  background-color: rgb(51, 51, 51);
  // text-align: center;
}

.edit-config-content {
  width: 100%;
  height: 100vh;
  background-color: rgb(51, 51, 51);
}

.edit-config-menu {
  padding-top: 30px;
  height: 100vh;
  background-color: rgb(37, 37, 37);
}

.edit-config-scroll {
  width: 100%;
  height: calc(90vh - 230px);
}

.dirty-fix {
  overflow: hidden;
  height: calc(100vh - 40px);
}

.table-channel-blocked {
  height: calc((100vh - 40px) - 155.78px);
  background-color: rgb(43, 43, 43);
}
</style>
