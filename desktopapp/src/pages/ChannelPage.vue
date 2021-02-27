<template>
  <div>
    <div class="p-d-flex p-jc-between">
      <div class="p-col">
        <h1>
          Channel
        </h1>
      </div>
    </div>

    <div class="channel-wrapper p-grid p-jc-center p-my-4">
      <div class="channel-header">
        Channel list
        <div class="p-col-4">
          <div class="p-inputgroup">
            <InputText placeholder="new channel" v-model="channelName" />
            <Button label="create" @click="create()" />
          </div>
        </div>
      </div>
      <div v-if="channels">
        <DataTable :value="channels" class="p-datatable-striped">
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
      <div v-else class="channel-empty p-text-center">
        <i class="fas fa-exclamation-circle"></i>  no channel
      </div>
    </div>

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
<style>
.channel-empty {
  width: 100%;
  height: 350px;
  background-color: rgb(206, 206, 206);
  line-height: 350px;
  font-size: 30px;
  color: rgb(105, 105, 105);
}
.channel-wrapper {
  padding-left: 1em;
  padding-right: 1em;
}

.channel-header {
  border-radius: 5px 5px 0px 0px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(49, 155, 255);
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>
