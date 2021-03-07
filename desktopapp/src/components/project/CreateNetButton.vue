<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div>
    <div>
      <Dialog
        header="confirm create"
        class="preview"
        v-bind:visible="displayConfirm"
        :closable="false"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        modal
      >
        <div class="p-d-flex">{{ object.orgList.length }} Organizations</div>
        <div class="preview-wrapper">
          <!-- <DataTable :value="test.orgList" :autoLayout="true">
            <Column>
              <template #body="slotProps">
                <div class="p-text-nowrap p-text-truncate">
                  {{ slotProps.data.name }}
                </div>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <div class="p-d-flex">
                  <span class="p-mx-1" v-if="slotProps.data.isOrderer">
                    <Tag
                      class="p-mr-2"
                      severity="warning"
                      value="orderer"
                    ></Tag>
                  </span>
                  <span class="p-mx-1" v-if="slotProps.data.useCA">
                    <Tag severity="danger" value="ca"></Tag>
                  </span>
                  <span
                    class="p-mx-1"
                    v-if="slotProps.data.peerList.length > 0"
                  >
                    <Tag
                      class="p-mr-2"
                      severity="info"
                      value="peer"
                      v-badge="slotProps.data.peerList.length"
                    ></Tag>
                  </span>
                </div>
              </template>
            </Column>
          </DataTable> -->

          <div v-for="item in object.orgList" :key="item.name">
            <div class="p-d-flex p-ai-center">
              <div class="preview-org">name: {{ item.name }}</div>
              <span class="p-mx-1" v-if="item.isOrderer">
                <Tag class="p-mr-2" severity="warning" value="orderer"></Tag>
              </span>
              <span class="p-mx-1" v-if="item.useCA">
                <Tag severity="danger" value="ca"></Tag>
              </span>
              <span class="p-mx-1" v-if="item.peerList.length > 0">
                <Tag
                  class="p-mr-2"
                  severity="info"
                  value="peer"
                  v-badge="item.peerList.length"
                ></Tag>
              </span>
            </div>
            container:
            <div v-if="item.isOrderer" class="preview-orderer">
              orderer.{{ item.name }}
            </div>

            <div v-if="item.useCA" class="preview-ca">ca1.{{ item.name }}</div>

            <div
              class="preview-peer"
              v-for="(peer, index) in item.peerList"
              :key="index"
            >
              {{ peer }}
            </div>

            <hr class="dotted" />
          </div>
        </div>

        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            @click="closeConfirm()"
            class="p-button-text"
          />
          <Button label="Yes" icon="pi pi-check" @click="createNetwork()" />
        </template>
      </Dialog>
    </div>

    <span @click="display = true">
      <Button
        label="Create Project"
        icon="fas fa-plus-square fa-lg"
        iconPos="left"
        class="p-button-primary"
      />
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
        <div class="p-grid p-mt-5 p-jc-between p-px-5">
          <div class="p-field-checkbox p-mx-5">
            <Checkbox id="quick" v-model="quick" :binary="true" />
            <label for="quick">quick startup</label>
          </div>

          <div class="p-field-checkbox p-mx-5">
            <Checkbox
              id="binary"
              v-model="channel"
              :binary="true"
              :disabled="!quick"
            />
            <label for="binary">create default channel</label>
          </div>
        </div>

        <div class="p-grid p-mt-5">
          <Button
            class="p-button-success p-m-2"
            label="create"
            @click="showConfirm()"
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
import OrgInputText from "../project/OrgInputText.vue";
import OrgEditButton from "../project/OrgEditButton.vue";
import SpecConfig from "../../models/SpecConfig";
import NetworkConfig from "../../models/NetworkConfig";
import ProjectConfig from "../../models/ProjectConfig";
import Terminal from "../Terminal.vue";

// import OrgData from "@/models/OrgData";
@Component({
  components: {
    OrgInputText,
    OrgEditButton,
    Terminal,
  },
})
export default class CreateNetButton extends Vue {
  quick: boolean = true;
  channel: boolean = true;
  display: boolean = false;
  displayConfirm: boolean = false;
  object = SpecConfig;
  preview: any = {};
  projectDir: string = "";
  projectName: string = "";
  defaultOrg: string = "";

  // test: object = {
  //   orgList: [
  //     {
  //       CAList: [],
  //       peerList: [],
  //       name: "test.test",
  //       isOrderer: true,
  //       useCA: false,
  //       isDefault: false,
  //     },
  //     {
  //       CAList: [],
  //       peerList: [
  //         "peer1.test2.test",
  //         "peer2.test2.test",
  //         "peer3.test2.test",
  //         "peer4.test2.test",
  //         "peer5.test2.test",
  //       ],
  //       name: "test2.test",
  //       isOrderer: false,
  //       useCA: true,
  //       isDefault: false,
  //     },
  //   ],
  //   CAList: [],
  //   peerList: [],
  //   orderers: [],
  //   setting: [],
  //   src: "",
  //   fileName: "spec.yaml",
  //   defaultOutputPath: "bin",
  // };

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
    let id = ProjectConfig.addProject(project);

    if (this.quick) {
      let defaultOrg = NetworkConfig.createConfig(project, this.channel);
      this.$router.push({
        name: "SplashConsole",
        params: {
          command:
            (this.channel ? "netup,create,join" : "netup") +
            " -o " +
            defaultOrg +
            " -e " +
            " true " +
            (this.channel ? " -c mychannel" : ""),
          directory: this.projectDir,
          id: id,
        },
      });
    } else {
      NetworkConfig.createConfig(project);
    }
    this.display = false;
  }

  showConfirm() {
    this.displayConfirm = true;
  }

  closeConfirm() {
    this.displayConfirm = false;
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
<style lang="scss">
@import "@/assets/style/_variables.scss";

// //
.preview {
  text-align: left;
  overflow: auto;
}
// .preview-content {
//   // overflow: auto;
// }
</style>
