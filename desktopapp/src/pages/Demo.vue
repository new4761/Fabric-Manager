<template>
  <div class="p-m-5">
    <Terminal />

    <Button
      label="calllog"
      @click="calllog()"
      class="p-button-raised p-button-rounded p-m-2"
    />

    <Button
      label="set global var id = 0"
      @click="setGlobal(0)"
      class="p-button-raised p-button-rounded p-m-2"
    />

    <Button
      label="set global var id = 1"
      @click="setGlobal(555)"
      class="p-button-raised p-button-rounded p-m-2"
    />

    <Card>
      <template #title>
        Demo Spec
      </template>
      <template #content>
        <DemoSpecButton></DemoSpecButton>
      </template>
    </Card>

    <Card>
      <template #title>
        Demo Netup
      </template>
      <template #content>
        <DemoNetupButton></DemoNetupButton>
      </template>
    </Card>

    <Card>
      <template #title>
        Demo Channel
      </template>
      <template #content>
        <ChannelPage></ChannelPage>
      </template>
    </Card>

    <Card>
      <template #title>
        Demo Docker
      </template>
      <template #content>
        <Button
          label="inspec"
          @click="list()"
          class="p-button-raised p-button-rounded p-m-1"
        />
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DemoSpecButton from "../components/DemoSpecButton.vue";
import DemoNetupButton from "../components/DemoNetupButton.vue";
import Terminal from "../components/Terminal.vue";
import ChannelPage from "./ChannelPage.vue";
import DockerProcess from "../module/DockerProcess";
import Logger from "../module/Logger";
@Component({
  components: {
    DemoSpecButton,
    DemoNetupButton,
    ChannelPage,
    Terminal,
  },
})
export default class Demo extends Vue {
  calllog() {
    // Vue.prototype.$logger.info("test: ", new Date().toJSON());
    Logger.log("info", "test ");
    Logger.log("warn", "test ");
    try {
      Logger.log("error", "test ");
    } catch (e) {
      console.log("ERROR:" + e.toString());
    }
  }

  list() {
    DockerProcess.ListContainer();
  }

  setGlobal(id: number) {
    console.log("before set: " + this.$store.state.project.id);
    this.$store.commit("project/setId", id);
    console.log("after set: " + this.$store.state.project.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
