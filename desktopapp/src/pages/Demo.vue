<template>
  <div class="p-m-5">
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
import ChannelPage from "./ChannelPage.vue";
import DockerProcess from "../module/DockerProcess";
@Component({
  components: {
    DemoSpecButton,
    DemoNetupButton,
    ChannelPage,
  },
})
export default class Demo extends Vue {


  list(){
    DockerProcess.ListContainer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
