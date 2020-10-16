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
        label="Create org"
        @click="testOrg()"
        class="p-m-1 p-button-warning"
      />

      <Button
        label="Create compose"
        @click="testCompose()"
        class="p-m-1 p-button-info"
      />

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
import OrgConfig from "../models/OrgConfig"
import ComposeConfig from "../models/ComposeConfig"

@Component({
  components: {

  },
})
export default class Testing extends Vue {
  output: string = "";
  messages: object[] = [];
  count: number = 0;
  $toast: any;

  testOrg() {
    console.log("test Org");

    this.output = OrgConfig.createFile();
    OrgConfig.saveFile(OrgConfig.defaultOutputPath, this.output,OrgConfig.fileName);
    OrgConfig.updateNetworkConfig();
    this.$toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Orderer.yaml created",
      life: 3000,
    });
  }

  testCompose() {
    console.log("test Compose");

    this.output = ComposeConfig.createFile();
    ComposeConfig.saveFile(OrgConfig.defaultOutputPath, this.output,ComposeConfig.fileName);
    ComposeConfig.updateNetworkConfig();
    this.$toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Orderer.yaml created",
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
