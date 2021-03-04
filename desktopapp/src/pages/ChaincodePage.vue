<template>
  <div class="cc-list-wrapper">
    <!-- {{ ccList }} -->
    <DataTable :value="ccList" class="cc-list" :autoLayout="true">
      <Column field="name" header="Name"></Column>
      <Column field="type" header="Language"></Column>
      <Column field="channel" header="Channel"></Column>

      <Column header="state">
        <template #body="obj">
          <Tag class="p-tag-primary" :value="obj.data.state"></Tag>
        </template>
      </Column>
      <Column header="Last updated">
        <template #body="obj">
          {{ convertTime(obj.data.lastUpdate) }}
        </template></Column
      >
      <!-- <Column>
        <template #body="obj">
          {{ obj.data }}
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import ChainCodeProcess from "../module/ChainCodeProcess";
import Component from "vue-class-component";
import DigSetupCC from "../components/chaincode/DigSetupCC.vue";
import { CCtype, netWorkConfigPath } from "../models/EnvProject";
import NetworkConfig from "../models/NetworkConfig";
// eslint-disable-next-line no-unused-vars
import ChainCode from "@/models/ChainCode";
//import FabrickSDK from "../module/fabric/FabrickSDK";
const ChaincodePageProps = Vue.extend({
  // props: {
  //   _display: Boolean,
  // },
});
@Component({
  components: { DigSetupCC },
})
// window.open("/chaincode","_self")
export default class ChaincodePage extends ChaincodePageProps {
  ccName = "";
  ccType = CCtype.go;
  path = "";
  ccList = [];
  // test function
  testSDK() {
    //FabrickSDK.connect();
  }

  testsetup() {
    ChainCodeProcess.testFunction();
  }
  testcleanup() {
    ChainCodeProcess.testClean();
  }
  //end test
  close() {
    this.$emit("closeDig", false);
  }
  //end emit
  mounted() {
    this.hookCClist();
  }
  hookCClist() {
    this.ccList = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // to do fix date to read
  }
  //end emit
  //render function
  convertTime(unix: number) {
    let dateNow: number = Date.now();
    //  console.log(new Date(unix).getDate());
    let dayNow = new Date(dateNow).getTime();
    let dayUpdate = new Date(unix).getTime();
    return this.msToTime(dayNow - dayUpdate);
  }
  msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = ((s - mins) / 60) % 24;
    var day = Math.round((s - mins) / 60 / 24);
    if (day >= 1) {
      return day + " " + "Days ago";
    } else if (hrs >= 1) {
      return hrs + " " + "Hours ago";
    } else {
      return mins + " " + "Minutes ago";
    }
  }
  //end render
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

.cc-list-wrapper {
  padding: 10px 20px 20px 20px;
  background-color: $SubBgColor;
  width:100%
}

.cc-list.p-datatable {
  background-color: $SubBgColor;
  font-size: 12px;
  width: 100%;
}

.cc-list .p-column-title {
  font-size: 17px;
}

.cc-list tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.cc-list tr {
  font-size: 15px;
}
.cc-list tr:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover !important;
}

.cc-list a {
  color: $primaryColor;
}

.container-info {
  width: 50vh;
}

.cc-list .p-datatable-header {
  background-color: $SubBgColor !important;
}
</style>
