<template>
  <div class="p-m-5">
    <Button
      label="inspec"
      @click="list()"
      class="p-button-raised p-button-rounded p-m-1"
    />
    <!-- <Terminal /> -->
    <!-- {{this.$store.commit("docker/getContainerCount")}} -->

    <!-- <Card>
      <template #title>
        Demo Spec
      </template>
      <template #content>
        <CreateNetButton></CreateNetButton>
      </template>
    </Card>

    <Card>
      <template #title>
        Demo Netup
      </template>
      <template #content>
        <NetOpsButton></NetOpsButton>
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
    </Card> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CreateNetButton from "../components/project/CreateNetButton.vue";
import NetOpsButton from "../components/NetOpsButton.vue";
import Terminal from "../components/Terminal.vue";
import ChannelPage from "./ChannelPage.vue";
// import NetworkConfig from "../models/NetworkConfig";
// import OSProcess from "../module/OSProcess";
@Component({
  components: {
    CreateNetButton,
    NetOpsButton,
    ChannelPage,
    Terminal,
  },
})
export default class Demo extends Vue {
  list() {
    // this.$store.commit("docker/setContainer");
    this.$store.commit("docker/setContainer");

    console.log(this.$store.getters["docker/getContainerCount"]);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
