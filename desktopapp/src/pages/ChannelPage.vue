<template>
  <div>
    <!-- <div class="p-grid p-jc-between">
      <div class="channel-header">
        Channel
        <hr class="dotted" />
      </div>
    </div> -->

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
          @click.stop=""
        ></Button>
      </div>
    </div>
    <transition name="channel-smooth">
      <div v-show="showSection">
        <div class="channel-list-wrapper p-grid p-jc-center p-my-4">
          <!-- <div class="channel-list-header">
            Channel list
            <div class="p-col-4">
              <div class="p-inputgroup">
                <InputText placeholder="new channel" v-model="channelName" />
                <Button label="create" @click="create()" />
              </div>
            </div>
          </div> -->
          <div v-if="channels">
            <DataTable :value="channels" class="channel-list">
              <Column field="name" header="name"></Column>
              <Column header="operation">
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
              </Column>
            </DataTable>
          </div>
          <div v-else class="channel-list-empty p-text-center">
            <i class="fas fa-exclamation-circle"></i> no channel
          </div>
        </div>
      </div>
    </transition>

    <hr class="dotted" />

    <div>
      <Dialog
        header="log"
        v-bind:visible="displaylog"
        :closable="false"
        modal
        :style="{ width: '80vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <Terminal />
        <Button
          class="p-button-danger p-ml-auto p-m-2"
          label="close"
          @click="displaylog = false"
        />
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OSProcess from "../module/OSProcess";
import Terminal from "../components/Terminal.vue";
import NetworkConfig from "../models/NetworkConfig";
import logger from "../module/Logger";

@Component({
  components: { Terminal },
})
export default class ChannelPage extends Vue {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channelName: string = "";
  channelSelected: string = "";
  channels: Array<string> = [];
  showSection: boolean = false;

  mounted() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    try {
      this.channels = NetworkConfig.getValue("channel");
      this.channelSelected = this.channels[0];
    } catch (err) {
      logger.log("warn", "no channel");
    }
  }

  toggle() {
    this.showSection = !this.showSection;
  }

  create() {
    let args: string[] = ["create"];
    args.push("-c " + this.channelName);
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    NetworkConfig.pushValueToArray("channel", { name: this.channelName });
    this.displaylog = true;
  }

  editChannel(name: string) {
    this.$router.push({
      name: "ChannelEdit",
      params: {
        channelName: name,
      },
    });
  }

  join(name: string) {
    let args: string[] = ["join"];
    args.push("-c " + name);
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    this.displaylog = true;
  }

  query(name: string) {
    let args: string[] = ["channelquery"];
    args.push("-c " + name);
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    this.displaylog = true;
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
  width: 100%;
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

</style>
