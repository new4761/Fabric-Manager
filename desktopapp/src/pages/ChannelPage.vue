<template>
  <div class="dirty-fix">
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
                  {{ convertDate(slotProps.data.date_create) }}
                </template>
              </Column>
              <Column header="Last updated">
                <template #body="slotProps">
                  {{ convertTime(slotProps.data.date_modify) }}
                </template>
              </Column>
            </DataTable>
          </div>
          <div v-else class="channel-list-empty p-text-center">
            <i class="fas fa-exclamation-circle"></i> no channel
          </div>
        </div>
      </div>
    </transition>
    <div class="p-d-flex p-jc-between p-ai-center config-view-header">
      <div>
        Channel:
        <Dropdown
          v-model="channelSelected"
          :options="channels"
          optionLabel="name"
          optionValue="name"
          v-on:change="updateForm()"
          class="channel-dropdown"
        />
      </div>
      <div class="p-col-6 p-text-right">
        <div class="p-d-flex p-jc-end">
          <Button
            icon="pi pi-download"
            class="p-button-sm p-button-secondary p-mx-3"
            label="query config"
            @click="channelQuery()"
          />

          <Button
            icon="pi pi-refresh"
            class="p-button-sm p-button-secondary"
            label="update config"
            @click="channelUpdate()"
          />
        </div>
      </div>
    </div>

    <ChannelEditPage :channelName="channelSelected" :key="componentKey" class="p-mt-3" />

    <div>
      <ConsoleDialogue :_displaylog="displaylog" @update:_displaylog="(val) => (displaylog = val)" />
    </div>

    <div>
      <Dialog
        header="Create new channel"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '300px' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-field p-grid p-fluid  p-jc-center">
          <div class="p-col-12 p-px-5">
            <small>Channel name</small>
            <br />
            <InputText
              id="channelName"
              v-model="channelName"
              :class="{
                'p-invalid': invalidChannel,
              }"
            />
            <br />
            <small class="p-error" v-if="invalidChannel">{{ errorChannel }}</small>
          </div>
        </div>
        <div class="p-grid p-jc-center p-mb-2">
          <small class="text-error">*this operation cannot be undone</small>
        </div>
        <div class="p-d-flex p-jc-end p-mt-1">
          <Button class="p-button-sm p-button-danger p-m-2 p-button-outlined" label="close" @click="display = false" />

          <Button class="p-button-sm p-button-primary p-m-2" label="create" @click="checkValid()" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess/OSProcess";
import NetworkConfig from "../models/NetworkConfig";
import logger from "../module/Logger";
import ChannelEditPage from "../components/channel/ChannelEdit.vue";
import ConsoleDialogue from "../components/ConsoleDialogue.vue";
import TimeConverter from "../module/Util/TimeConverter";

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
  invalidChannel: boolean = false;
  errorChannel: string = "";

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
    return TimeConverter.convertTime(unix);
  }

  convertDate(unix: number) {
    return TimeConverter.convertDate(unix);
  }

  toggle() {
    this.showSection = !this.showSection;
  }

  checkValid() {
    let channels = NetworkConfig.getValue("channel");
    let duplicate = false;
    let falsy = false;
    this.invalidChannel = false;
    console.log(channels);

    if (!this.channelName) {
      this.errorChannel = "cannot be empty.";
      this.invalidChannel = true;
      falsy = true;
    }
    //eslint-disable-next-line
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.channelName)) {
      this.errorChannel = "cannot contain special character.";
      this.invalidChannel = true;
      falsy = true;
    }

    channels.forEach((element: any) => {
      if (element.name == this.channelName) {
        duplicate = true;
        this.errorChannel = "duplicate channel name.";
        this.invalidChannel = true;
      }
    });

    if (!falsy && !duplicate) {
      this.create();
    }
  }

  async create() {
    this.displaylog = true;
    let args: string[] = ["create"];
    args.push("-c", this.channelName);
    await OSProcess.run(args);
    await OSProcess.run(["join", "-c", this.channelName]);
    await OSProcess.run(["channelquery", "-c", this.channelName]);

    if (this.join) {
      await OSProcess.run(["join", "-c", this.channelName]);
      this.join = false;
      this.$store.commit("setProcessStatus", true);
    } else {
      this.$store.commit("setProcessStatus", true);
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

  async channelQuery() {
    this.displaylog = true;
    let args: string[] = ["channelquery"];
    args.push("-c");
    args.push(this.channelSelected);
    await OSProcess.run(args);
    this.$store.commit("setProcessStatus", true);
  }

  async channelUpdate() {
    this.displaylog = true;
    let args: string[] = ["channelsign,channelupdate"];
    args.push("-c");
    args.push(this.channelSelected);
    await OSProcess.run(args);
    this.channelQuery();
  }
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

.config-view-header {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: rgb(73, 73, 73);
  color: white;
  font-size: 15px;
  font-weight: bold;
  overflow: visible;
}

.channel-config-header {
  padding: 10px 30px 10px 30px;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.channel-config-header {
  font-size: 20px;
  font-weight: bold;
  background-color: $SubBgColor;
}

// .channel-dropdown.p-dropdown {
//   height: 30px;
// }

.channel-dropdown .p-dropdown-label {
  font-size: 15px;
  padding: 5px 10px 5px 10px;
  color: $primaryColor;
  font-weight: bold;
  // z-index: 99 !important;
}

// .p-dropdown-item {
//   z-index: 99 !important;
// }
</style>
