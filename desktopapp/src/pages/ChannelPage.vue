<template>
  <div class="p-m-5">
    <h1>
      channel
    </h1>

    <div class="p-col-12 p-md-6">
      <div class="p-inputgroup">
        <Button label="create" @click="create()" />
        <InputText placeholder="name" v-model="channelName" />
      </div>
    </div>

    <DataTable :value="channels" class="p-datatable-striped">
      <Column field="name" header="name"></Column>
      <Column header="operation">
        <template #body="slotProps">
          <div class="p-d-flex p-jc-center p-ai-center">
            <Button class="p-mx-1" label="join" @click="join(slotProps.name)" />
            <Button
              class="p-mx-1"
              label="query"
              @click="join(slotProps.name)"
            />
            <Button
              class="p-mx-1"
              label="update"
              @click="join(slotProps.name)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

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

@Component({
  components: { Terminal },
})
export default class ChannelPage extends Vue {
  projectDir: string = "";
  display: boolean = false;
  displaylog: boolean = false;
  channelName: string = "";
  channels: Array<string> = [];

  mounted() {
    this.init();
  }

  init() {
    this.projectDir = this.$store.state.project.path;
    this.channels = NetworkConfig.getValue("channel");
  }

  create() {
    let args: string[] = ["create"];
    args.push("-c " + this.channelName);
    const child = OSProcess.run(this.projectDir, args);
    this.$store.commit("setProcess", child);
    NetworkConfig.pushValueToArray("channel", { name: this.channelName });
    this.displaylog = true;
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
<style scoped></style>
