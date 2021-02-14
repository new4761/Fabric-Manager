<template>
  <div>
    <span @click="display = true">
      <Button label="Create Project" icon="fas fa-plus-square fa-lg" iconPos="left"/>
      <!-- <Card
        style="width: 9rem; height: 9rem; padding-top: 1em; background-color: rgb(0, 162, 273);"
      >
        <template v-slot:content>
          <div class="p-grid p-jc-center">
            <Button icon="pi pi-plus" class="p-button-rounded p-button-lg " />
          </div>
        </template>
      </Card> -->
    </span>

    <div>
      <Dialog
        header="Create new network"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '80vw' }"
        :contentStyle="{ overflow: 'visible' }"
      >
        <div class="p-col-12">
          <div class="p-inputgroup">
            <InputText placeholder="projectName" v-model="projectName" />
          </div>
        </div>
        <div class="p-col-12">
          <div class="p-inputgroup">
            <Button label="SetProjectDirectory" @click="getFilepath()" />
            <InputText
              placeholder="projectdirectory"
              v-model="projectDir"
              disabled
            />
          </div>
        </div>
        <ScrollPanel style="height: 200px" class="p-p-1">
          <OrgEditButton
            v-bind:object="object.orgList"
            @remove-org="removeOrgFromList"
          ></OrgEditButton>
        </ScrollPanel>
        <div class="p-grid p-fluid p-field">
          <OrgInputText @new-org="newOrgTolist"></OrgInputText>
        </div>

        <div class="p-grid p-mt-5">
          <Button
            class="p-button-success p-m-2"
            label="create"
            @click="createNetwork()"
          />

          <Button
            class="p-button-danger p-ml-auto p-my-2"
            label="close"
            @click="display = false"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
const { dialog } = require("electron").remote;
import Vue from "vue";
import Component from "vue-class-component";
import OrgInputText from "./OrgInputText.vue";
import OrgEditButton from "./OrgEditButton.vue";
import SpecConfig from "../models/SpecConfig";
import NetworkConfig from "../models/NetworkConfig";
import ProjectConfig from "../models/ProjectConfig";

// import OrgData from "@/models/OrgData";
@Component({
  components: {
    OrgInputText,
    OrgEditButton,
  },
})
export default class CreateNetButton extends Vue {
  display: boolean = false;
  object = SpecConfig;
  projectDir: string = "";
  projectName: string = "";

  newOrgTolist(name: string, isOrderer: boolean) {
    this.object.newOrg(name, isOrderer);
  }
  removeOrgFromList(target: any) {
    this.object.removeOrg(target);
  }
  createNetwork() {
    this.object.createFile();
    this.object.setUpFileStructure(this.projectDir);
    let project = {
      name: this.projectName,
      date_create: +new Date(),
      directory: this.projectDir,
    };
    ProjectConfig.addProject(project);
    NetworkConfig.createConfig(project);
    this.display = false
  }

  getFilepath() {
    dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((result) => {
        this.projectDir = result.filePaths[0];
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
