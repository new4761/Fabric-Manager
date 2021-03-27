<template>
  <div class="cc-list-wrapper">
    <DataTable :value="ccList" class="cc-list" 
    :paginator="true" :rows="5">
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
    </DataTable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { CCtype, netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import TimeConverter from "@/module/Util/TimeConverter";
const ChaincodeListProps = Vue.extend({
  // props: {
  //   _display: Boolean,
  // },
});
@Component({
})
export default class ChaincodeList extends ChaincodeListProps {
  ccName = "";
  ccType = CCtype.go;
  path = "";
  ccList = [];
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
    return TimeConverter.convertTime(unix);
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
