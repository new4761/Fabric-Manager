<template>
  <div class="p-m-5">
    <Terminal />

    <Card>
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
    </Card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CreateNetButton from "../components/CreateNetButton.vue";
import NetOpsButton from "../components/NetOpsButton.vue";
import Terminal from "../components/Terminal.vue";
import ChannelPage from "./ChannelPage.vue";
import DockerProcess from "../module/DockerProcess";
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
    DockerProcess.listContainer();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
