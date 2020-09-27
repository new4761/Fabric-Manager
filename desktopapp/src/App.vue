<template>
  <div>
    <Button
      label="Submit"
      icon="pi pi-check"
      iconPos="right"
      @click="testFunnction()"
    />

    <ScrollPanel style="width: 100%; height: 200px">
      {{ output }}
    </ScrollPanel>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import OrdererConfig from "./models/OrdererConfig";

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  output: string = "";
  testFunnction() {
    console.log("called");
    this.output = OrdererConfig.createFile();
    OrdererConfig.saveFile(undefined, this.output);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
