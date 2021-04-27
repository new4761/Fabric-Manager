<template>
  <div>
    <div class="p-d-flex  p-my-2">
      <h6 class="p-text-bold p-my-2">ChainCode Detail</h6>
      <div class="p-ml-auto p-mt-1">
        <Button
          class="p-ml-auto p-button-outlined p-button-sm p-button-primary"
          icon="pi pi-arrow-circle-up"
          label="Upgrade CC"
          @click.stop="upgradeCCdisplay = true"
            :disabled = "!this.$store.state.docker.isOnline"
        ></Button>
      </div>
    </div>

    <Panel>
      <template #header> </template>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Name</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="name" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Type</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="type" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Directory</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="directory" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Channel</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="channel" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Version</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="version" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>LastUpdate</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="lastUpdate" />
        </div>
      </div>
      <div class="p-fluid p-grid">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>UseInit</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="useInit" />
        </div>
      </div>
      <div class="p-fluid p-grid" v-if="useInit == true">
        <div class="p-col-3">
          <div class="p-mt-2 p-ml-1"><small>Init Args</small></div>
        </div>
        <div class="p-col-9">
          <InputText class="p-inputtext-sm" style="color: white" disabled type="text" v-model="initArgs" />
        </div>
      </div>
      <Dialog modal :dismissableMask="true" :closable="false" v-bind:visible="upgradeCCdisplay">
        <template #header>
          <span>Upgrade ChainCode</span>
          <Button
            @click="upgradeCCdisplay = false"
            icon="pi pi-times"
            class="p-button-text p-ml-auto p-button-rounded"
          />
        </template>
        <DigUpgradeCC
          :selectedOrg="selectedOrg"
          :_selectedCC="_selectedCC"
          @openLog="displayLog"
          @closeDig="upgradeCCDisplay"
          :_display="upgradeCCdisplay"
          @hookccList="hookccList"
        ></DigUpgradeCC>
      </Dialog>
      <ConsoleDialogue :_displaylog="displaylog" @update:_displaylog="(val) => (displaylog = val)" />
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DigUpgradeCC from "@/components/chaincode/DigUpgradeCC.vue";
import ConsoleDialogue from "@/components/ConsoleDialogue.vue";
import Component from "vue-class-component";
import TimeConverter from "../../../module/Util/TimeConverter";
const CCDetailsProps = Vue.extend({
  props: {
    _selectedCC: Object,
    selectedOrg: String,
  },
});
@Component({
  components: { DigUpgradeCC, ConsoleDialogue },
})
export default class CCDetails extends CCDetailsProps {
  upgradeCCdisplay = false;
  name = "";
  type = "";
  directory = "";
  channel = "";
  version = "";
  lastUpdate = "";
  useInit = "";
  initArgs = "";
  displaylog = false;
  created() {
    this.setData(this._selectedCC);
  }
  hookccList() {
    this.$emit("hookccList");
  }
  setData(_selectedCC: any) {
    this.name = _selectedCC.name;
    this.type = _selectedCC.type;
    this.directory = _selectedCC.directory;
    this.channel = _selectedCC.channel;
    this.version = _selectedCC.version;
    this.lastUpdate = this.convertTime(_selectedCC.lastUpdate);
    this.useInit = _selectedCC.useInit;
    this.initArgs = _selectedCC.initArgs;
  }
  convertTime(unix: number) {
    return TimeConverter.convertTime(unix);
  }

  upgradeCCDisplay(data: boolean) {
    this.upgradeCCdisplay = data;
  }
  displayLog(data: boolean) {
    this.displaylog = data;
  }


}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

</style>
