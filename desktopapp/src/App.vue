<template>
  <div>
    <Button
      label="Submit"
      icon="pi pi-check"
      iconPos="right"
      @click="testFunnction()"
    />

    <Button
      label="create"
      icon="pi pi-check"
      iconPos="right"
      @click="pushObject()"
    />

    <Button
      label="save"
      icon="pi pi-check"
      iconPos="right"
      @click="insertObject()"
    />

    <Button
      label="check"
      icon="pi pi-check"
      iconPos="right"
      @click="checkObject()"
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

var Datastore = require("nedb");
var users = new Datastore();
var people: { name: string; age: number; twitter: string }[] = [];

var scott = {
  name: "Scott Robinson",
  age: 28,
  twitter: "@ScottWRobinson",
};

var elon = {
  name: "Elon Musk",
  age: 44,
  twitter: "@elonmusk",
};

var jack = {
  name: "Jack Dorsey",
  age: 39,
  twitter: "@jack",
};

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

  pushObject() {
    people.push(scott, elon, jack);
  }

  insertObject() {
    users.insert(people, function (err: any, docs: any[]) {
      docs.forEach(function (d) {
        console.log("Saved user:", d.name);
      });
    });
  }

  checkObject() {
    //OrdererConfig.updateNetworkConfig();
    users
      .find({})
      .sort({ name: 1 })
      .exec(function (err: any, docs: any[]) {
        docs.forEach(function (d) {
          console.log("Found user:", d.name);
        });
      });
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
