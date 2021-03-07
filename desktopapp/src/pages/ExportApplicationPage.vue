<template>
  <div>
            <div class="p-col-12">
        <small>Selected Channel </small>
        <br />
        <Dropdown
          v-model="selectedChannel"
          :options="channelList"
          optionLabel="name"
        />
      </div>
<Button label="Submit" iconPos="right"  @click="generate()"/>
  </div>
</template>

<script lang="ts">
import { netWorkConfigPath } from "@/models/EnvProject";
import ExportAppProcess from "@/module/ExportAppProcess";
import NetworkConfig from "@/models/NetworkConfig";
import Vue from "vue";
import Component from "vue-class-component";

const ExportApplicationPageProps = Vue.extend({
  props: {
    _display: Boolean,
  },
});
@Component({
  components: {  },
})
export default class ExportApplicationPage extends ExportApplicationPageProps {
      selectedChannel = { name: "" };
      channelList = [];
  created() {
    this.channelList = NetworkConfig.getValue(netWorkConfigPath.channelPath);
    this.selectedChannel = this.channelList[0];
  }
  generate(){   
   ExportAppProcess.generateProcess(this.selectedChannel.name)
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";


</style>
