<template>
  <div>
    <Breadcrumb :home="home" :model="items" />
    <Toast position="top-right" />

    <Button
      label="Orderer"
      @click="testOrderer()"
      class="p-mx-5 p-button-info"
    />

    <Button label="CA" @click="testCa()" class="p-mx-5 p-button-success" />

    <Button
      label="database"
      @click="testDatabase()"
      class="p-mx-5 p-button-warning"
    />

    <transition-group name="p-message" tag="div">
      <Message
        v-for="msg of messages"
        :severity="msg.severity"
        :key="msg.content"
        >{{ msg.content }}</Message
      >
    </transition-group>

    {{ output }}
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import OrdererConfig from "./models/OrdererConfig";
import CaServerConfig from "./models/CaServerConfig";
import CaClientConfig from "./models/CaClientConfig";
@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  output: string = "";
  messages: object[] = [];
  count: number = 0;
  $toast: any;

  testOrderer() {
    console.log("test orderer");
    this.output = OrdererConfig.createFile();
    OrdererConfig.saveFile(undefined, this.output);
    this.$toast.add({severity:'success', summary: 'Success Message', detail:'Orderer.yaml created', life: 3000});
  }

  testCa() {
    console.log("test ca");
    CaServerConfig.createFile();
    CaClientConfig.createFile();
    this.$toast.add({severity:'success', summary: 'Success Message', detail:'fabric-ca-server-config.yaml created', life: 3000});
  }

  testDatabase() {
    console.log("test database");
    CaServerConfig.updateNetworkConfig();
    this.$toast.add({severity:'success', summary: 'Success Message', detail:'table created', life: 3000});
  }

  data() {
    return {
      home: { icon: "pi pi-home" },
      items: [
        { label: "Computer" },
        { label: "Notebook" },
        { label: "Accessories" },
        { label: "Backpacks" },
        { label: "Item" },
      ],
    };
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

.box {
  background-color: var(--surface-e);
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.box-stretched {
  height: 100%;
}

.vertical-container {
  margin: 0;
  height: 200px;
  background: var(--surface-d);
  border-radius: 4px;
}

.nested-grid .p-col-4 {
  padding-bottom: 1rem;
}

.dynamic-box-enter-active,
.dynamic-box-leave-active {
  transition: all 0.5s;
}

.dynamic-box-enter,
.dynamic-box-leave-to {
  opacity: 0;
}

.dynamic-box-enter,
.dynamic-box-leave-to {
  transform: translateX(30px);
}

p {
  margin: 0;
}
</style>
