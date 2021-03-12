<template>
  <div>
    <div @click="toggle()">
      <div class="channel-list-header p-grid p-ai-center vertical-container">
        Channel
        <div
          :class="{
            'channel-toggle-open': showSection,
            'channel-toggle p-mx-2': true,
          }"
        >
          <i class="fas fa-angle-double-down"></i>
        </div>

        <Button
          class="p-ml-auto p-button-sm p-button-primary"
          icon="pi pi-plus"
          label="Create new channel"
          @click.stop="display = true"
        ></Button>
      </div>
    </div>
    <transition name="channel-smooth">
      <div v-show="showSection">
        <div class="channel-list-wrapper p-grid p-jc-center p-my-4">
          <div v-if="channels">
            <DataTable :value="channels" class="channel-list">
              <Column field="name" header="Name"></Column>
              <Column header="Date create">
                <template #body="slotProps">
                  {{ toDate(slotProps.data.date_create) }}
                </template>
              </Column>
              <Column header="Last updated">
                <template #body="slotProps">
                  {{ convertTime(slotProps.data.date_modify) }}
                </template>
              </Column>
              <!-- <Column header="operation">
                <template #body="slotProps">
                  <div class="p-d-flex p-jc-center p-ai-center">
                    <Button
                      class="p-mx-1"
                      label="join"
                      @click="join(slotProps.data.name)"
                    />
                    <Button
                      class="p-mx-1"
                      label="edit"
                      @click="editChannel(slotProps.data.name)"
                    />
                  </div>
                </template>
              </Column> -->
            </DataTable>
          </div>
          <div v-else class="channel-list-empty p-text-center">
            <i class="fas fa-exclamation-circle"></i> no channel
          </div>
        </div>
      </div>
    </transition>

    <hr class="dotted" />
    <div class="p-grid p-ai-center p-jc-between channel-config-header">
      <div class="p-col">Config</div>
      <div class="p-col p-text-right">
        <Dropdown
          v-model="channelSelected"
          :options="channels"
          optionLabel="name"
          optionValue="name"
          v-on:change="updateForm()"
        />
      </div>
    </div>
    <ChannelEditPage :channelName="channelSelected" :key="componentKey" />

    <div>
      <ConsoleDialogue
        :_displaylog="displaylog"
        @update:_displaylog="(val) => (displaylog = val)"
      />
    </div>

    <div>
      <Dialog
        header="Create network"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '30vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-grid p-jc-center p-p-3">
          <span class="p-float-label">
            <InputText id="channelName" v-model="channelName" />
            <label for="channelName">channelName</label>
          </span>
        </div>

        <div class="p-grid p-jc-center p-mb-2">
          <small class="text-error">*this operation cannot be undone</small>
        </div>

        <div class="p-d-flex p-jc-end p-mt-1">
          <Button
            class="p-button-primary p-m-2"
            label="create"
            @click="create()"
          />

          <Button
            class="p-button-danger p-ml-auto p-m-2 p-button-outlined"
            label="close"
            @click="display = false"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";
import NetworkConfig from "../models/NetworkConfig";
import logger from "../module/Logger";
import ChannelEditPage from "./ChannelEditPage.vue";
import ConsoleDialogue from "../components/ConsoleDialogue.vue";
import { OsType } from "../models/EnvProject";

@Component({
  components: { ConsoleDialogue, ChannelEditPage },
})
export default class ChannelPage extends Vue {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channelName: string = "";
  channelSelected: string = "";
  channels: any = [];
  showSection: boolean = false;
  join: boolean = false;
  componentKey: number = 0;
  private osType: OsType = OsType.WINDOW;

  created() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    try {
      this.channels = NetworkConfig.getValue("channel");
      this.channelSelected = this.channels[0].name;
      console.log(this.channelSelected);
    } catch (err) {
      logger.log("warn", "no channel");
    }
  }

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

  toDate(stamp: any) {
    var date = new Date(stamp).toDateString();
    return date;
  }

  toggle() {
    this.showSection = !this.showSection;
  }

  async create() {
    this.displaylog = true;
    let args: string[] = ["create"];
    args.push("-c", this.channelName);
    await OSProcess.run_new(args, this.osType);
    await OSProcess.run_new(["join", "-c", this.channelName], this.osType);
    await OSProcess.run_new(
      ["channelquery", "-c", this.channelName],
      this.osType
    );

    if (this.join) {
      await OSProcess.run_new(["join", "-c", this.channelName], this.osType);
      this.join = false;
    }
    NetworkConfig.pushValueToArray("channel", {
      name: this.channelName,
      date_create: +new Date(),
      date_modify: +new Date(),
    });
    this.display = false;
  }

  editChannel(name: string) {
    this.$router.push({
      name: "ChannelEdit",
      params: {
        channelName: name,
      },
    });
  }

  updateForm() {
    this.componentKey += 1;
  }

  // join(name: string) {
  //   this.displaylog = true;
  //   let args: string[] = ["join"];
  //   args.push("-c " + name);
  //   const child = OSProcess.run(this.projectDir, args);
  //   this.$store.commit("setProcess", child);
  // }

  // query(name: string) {
  //   this.displaylog = true;
  //   let args: string[] = ["channelquery"];
  //   args.push("-c " + name);
  //   const child = OSProcess.run(this.projectDir, args);
  //   this.$store.commit("setProcess", child);
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/style/_variables.scss";

.channel-list-header {
  padding: 30px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.channel-header {
  padding: 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
  height: 110px;
}

.channel-list-header {
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.channel-list-empty {
  width: 100%;
  height: 350px;
  background-color: rgb(206, 206, 206);
  line-height: 350px;
  font-size: 30px;
  color: rgb(105, 105, 105);
}
.channel-list-wrapper {
  padding: 10px 40px 40px 40px;
  background-color: $SubBgColor;
}

.channel-list.p-datatable {
  background-color: $SubBgColor;
  font-size: 12px;
  width: 100%;
}

.channel-list .p-column-title {
  font-size: 17px;
}

.channel-list tr,
th {
  background-color: $SubBgColor !important;
  transition: all 0.3s !important;
}
.channel-list tr {
  font-size: 15px;
}
.channel-list tr:hover {
  color: $primaryColor;
  background-color: $SubBgColorHover !important;
}

.channel-list a {
  color: $primaryColor;
}

.channel-list .p-datatable-header {
  background-color: $SubBgColor !important;
}

.channel-smooth-enter,
.channel-smooth-leave-to {
  overflow: hidden;
  max-height: 0;
}

.channel-smooth-enter-to,
.channel-smooth-leave {
  overflow: hidden;
  max-height: 1000px;
}

.channel-smooth-leave-active {
  overflow: hidden;
  transition: max-height 0.3s;
}

.channel-smooth-enter-active {
  overflow: hidden;
  transition: max-height 1s;
}

.channel-toggle {
  transition: transform 0.2s ease;
}
.channel-toggle-open {
  transform: rotate(180deg);
  color: $primaryColor;
}

.channel-config-header {
  padding: 10px 30px 10px 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.channel-config-header {
  font-size: 20px;
  font-weight: bold;
}
</style>
