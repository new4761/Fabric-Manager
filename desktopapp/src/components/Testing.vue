<template>
  <div>
    <Toast position="top-right" />

    <div class="p-d-flex p-p-3 card">
      <Button type="Button" icon="pi pi-check" class="p-mr-2" />
      <Button type="Button" icon="pi pi-check" class="p-button-danger" />
      <Button
        type="Button"
        icon="pi pi-check"
        class="p-ml-auto p-button-help"
      />
    </div>

    <div class="p-col-4">
      <Button
        label="Create Networkconfig"
        @click="createTable()"
        class="p-m-1 p-button-warning"
      />

      <Button
        label="Orderer gen"
        @click="testOrderer()"
        class="p-m-1 p-button-info"
      />

      <Button label="CA gen" @click="testCa()" class="p-m-1 p-button-success" />
    </div>

    <div class="p-col">
      <Card>
        <template v-slot:content>
          <ScrollPanel style="width: 100%; height: 200px">
            {{ output }}
          </ScrollPanel>
        </template>
      </Card>
    </div>

    <transition-group name="p-message" tag="div">
      <Message
        v-for="msg of messages"
        :severity="msg.severity"
        :key="msg.content"
        >{{ msg.content }}</Message
      >
    </transition-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "../components/HelloWorld.vue";
import OrdererConfig from "../models/OrdererConfig";
import CaServerConfig from "../models/CaServerConfig";
import CaClientConfig from "../models/CaClientConfig";
import ConfigtxConfig from "../models/ConfigtxConfig";

const EntityPersist = require("../models/database/EntityPersist");
const NetworkRepository = require("../models/database/NetworkRepository");
const CARepository = require("../models/database/CARepository");
const OrdererRepository = require("../models/database/OrdererRepository");

const entity = new EntityPersist();
const networkRepo = new NetworkRepository(entity);
const caRepo = new CARepository(entity);
const ordererRepo = new OrdererRepository(entity);

const projectmeta = {
  name: "test-project",
  dir: "desktop",
};


@Component({
  components: {
    HelloWorld,
  },
})
export default class Testing extends Vue {
  output: string = "";
  messages: object[] = [];
  count: number = 0;
  $toast: any;

  testOrderer() {
    console.log("test orderer");
    OrdererConfig.General.ListenPort = 66666;
    this.output = OrdererConfig.createFile();
    OrdererConfig.saveFile(OrdererConfig.defaultOutputPath, this.output,OrdererConfig.fileName);
    OrdererConfig.updateNetworkConfig();
    this.$toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Orderer.yaml created",
      life: 3000,
    });
  }

  testCa() {
    console.log("test ca");

    CaServerConfig.port = 66666;
    CaServerConfig.db.datasource = "dkaisjduhjasidjasdjij";
    CaServerConfig.getUserInput(CaServerConfig);
    ConfigtxConfig.createFile();
    CaServerConfig.createFile();
    CaClientConfig.createFile();
    this.$toast.add({severity:'success', summary: 'Success Message', detail:'fabric-ca-server-config.yaml created', life: 3000});

    CaServerConfig.updateNetworkConfig();
    this.$toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "fabric-ca-server-config.yaml created",
      life: 3000,
    });

  }

  createTable() {
    networkRepo.createTable();
    caRepo.createTable();
    ordererRepo.createTable();

    networkRepo.create(projectmeta.name, projectmeta.dir);

    this.$toast.add({
      severity: "info",
      summary: "Success Message",
      detail: "table created",
      life: 3000,
    });
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
      menuitems: [
        {
          label: "Options",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-plus",
              command: () => {
                this.$toast.add({
                  severity: "success",
                  summary: "Updated",
                  detail: "Data Updated",
                  life: 3000,
                });
              },
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-trash",
              command: () => {
                this.$toast.add({
                  severity: "success",
                  summary: "Updated",
                  detail: "Data Updated",
                  life: 3000,
                });
              },
            },
          ],
        },
        {
          label: "Account",
          items: [
            {
              label: "Options",
              icon: "pi pi-fw pi-cog",
              command: () => {
                this.$toast.add({
                  severity: "success",
                  summary: "Updated",
                  detail: "Data Updated",
                  life: 3000,
                });
              },
            },
            {
              label: "Sign Out",
              icon: "pi pi-fw pi-power-off",
              command: () => {
                this.$toast.add({
                  severity: "success",
                  summary: "Updated",
                  detail: "Data Updated",
                  life: 3000,
                });
              },
            },
          ],
        },
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
</style>
