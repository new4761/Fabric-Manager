<template>
  <div>
    <div class="p-d-flex p-jc-between">
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
    </div>
    <div class="channel-edit-wrapper p-d-flex p-jc-center ">
      <div class="p-col">
        <div class="p-d-flex p-jc-center">
          <div class="channel-edit-config-view p-col">
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

            <Accordion :multiple="true" v-if="!notshow">
              <AccordionTab header="Application">
                <div
                  v-for="(item, index) in Object.keys(
                    channelApplication.groups
                  )"
                  :key="index"
                  class="p-my-2"
                >
                  <div class="config-view-panel">
                    {{ channelApplication.groups[item].policies }}
                    <br />
                    {{ channelApplication.groups[item].Values }}
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Orderer">
                <div
                  v-for="(item, index) in Object.keys(channelOrderer.groups)"
                  :key="index"
                  class="p-my-2"
                >
                  <div class="config-view-panel">
                    {{ channelOrderer.groups[item] }}
                    <br />
                    {{ channelOrderer.groups[item].values }}
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="policies">
                <!-- <div class="config-view-panel">{{ channelPolicies }}</div> -->
                <Textarea v-model="channelPoliciesString" rows="5" cols="30" />
              </AccordionTab>
              <AccordionTab header="value">
                <div class="config-view-panel">{{ channelValues }}</div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
        <div class="p-d-grid p-jc-center">
          <div class="channel-edit-config-edit p-col ">
            <div class="edit-config-panel">
              for editing
            </div>
          </div>
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
  components: { ConsoleDialogue },
})
export default class ChannelEditPage extends ChannelProps {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channelPolicies: any = {};
  channelValues: any = {};
  channelApplication: any = {};
  channelOrderer: any = {};
  channelPoliciesString: string = "";
  notshow: boolean = false;
  private osType: OsType = OsType.WINDOW;
  created() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    try {
      ChannelConfig.setFile(this.channelName);
      this.channelPolicies = ChannelConfig.getValue("channel_group.policies");
      this.channelValues = ChannelConfig.getValue("channel_group.values");
      this.channelApplication = ChannelConfig.getValue(
        "channel_group.groups.Application"
      );
      this.channelOrderer = ChannelConfig.getValue(
        "channel_group.groups.Orderer"
      );
      ChannelConfig.updateConfig(
        "channel_group.groups.Application.groups.org1-example-com.mod_policy",
        "Admins"
      );
    } catch (e) {
      console.log(e);
      this.notshow = true;
    }
  }

  back() {
    this.$router.push("/channel");
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
  border-radius: 5px 5px 0px 0px;
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
  width: 100%;
  height: 300px;
  line-height: 300px;
  font-size: 30px;
  background-color: rgb(168, 168, 168);
  text-align: center;
}
</style>
