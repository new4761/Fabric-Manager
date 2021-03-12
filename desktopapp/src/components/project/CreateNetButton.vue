<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div>
    <div>
      <Dialog
        header="confirm create"
        class="preview"
        v-bind:visible="displayConfirm"
        :closable="false"
        :style="{ width: '400px' }"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        modal
      >
        <!-- <pre>
      {{ object }}
      </pre -->

        <div class="preview-wrapper  p-d-flex p-jc-center">
          <div class="p-col-12">
            <!-- <div class="p-d-flex">quick start {{ quick }}</div> -->
            <div class="p-d-flex p-mb-2">
              Default channel:
              <a class="text-primary p-mx-1">{{ channelName }}</a>
            </div>
            <div class="p-d-flex">
              {{ object.orgList.length }} Organizations
            </div>
          </div>
        </div>
        <div class="preview-wrapper  p-d-flex p-jc-center">
          <div class="p-col-12">
            <div v-for="item in object.orgList" :key="item.name">
              <Panel class="p-mb-2">
                <div class="p-d-flex p-ai-center">
                  <div class="preview-org">
                    {{ item.name }}
                  </div>

                  <span class="p-mx-1" v-if="item.isOrderer">
                    <Tag
                      class="p-mr-2"
                      severity="warning"
                      value="orderer"
                    ></Tag>
                  </span>
                  <span class="p-mx-1" v-if="item.CAList.length > 0">
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
                <ul>
                  <li v-if="item.isOrderer" class="preview-orderer">
                    orderer.{{ item.name }}
                  </li>

                  <li
                    class="preview-ca"
                    v-for="(ca, index) in item.CAList"
                    :key="index + 'ca'"
                  >
                    {{ ca }}
                  </li>

                  <li
                    class="preview-peer"
                    v-for="(peer, index) in item.peerList"
                    :key="index + 'peer'"
                  >
                    {{ peer }}
                  </li>
                </ul>
              </Panel>
            </div>
          </div>
        </div>
        <div class="preview-wrapper  p-d-flex p-jc-center">
          <small class="text-error">
            *you cannot modify Organizations once created</small
          >
        </div>
        <template #footer>
          <div class="p-d-flex p-jc-between">
            <Button
              label="No"
              icon="pi pi-times"
              @click="closeConfirm()"
              class="p-button-text text-error"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="createNetwork()"
              class="p-button-primary"
            />
          </div>
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
        header="Create new Network"
        v-bind:visible="display"
        :closable="false"
        modal
        :style="{ width: '60vw' }"
        :breakpoints="{ '960px': '80vw', '640px': '80vw' }"
        :contentStyle="{ overflow: 'auto' }"
        class="create-net"
      >
        <div class="create-net-wrapper">
          <div class="p-col-12">
            <div class="p-inputgroup">
              <InputText placeholder="projectName" v-model="projectName" />
            </div>
          </div>
          <div class="p-col-12">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-folder-open"></i>
              </span>
              <InputText placeholder="projectdirectory" v-model="projectDir" />
              <Button
                class="p-button-primary p-button-outlined"
                label="SetProjectDirectory"
                @click="getFilepath()"
              />
            </div>
          </div>
          <ScrollPanel style="height: 200px" class="p-p-1 p-my-3">
            <OrgEditButton
              v-bind:object="object.orgList"
              @remove-org="removeOrgFromList"
              @ca-warn="caWarn"
            ></OrgEditButton>
          </ScrollPanel>
          <div class="p-grid p-fluid p-field">
            <OrgInputText @new-org="newOrgTolist"></OrgInputText>
          </div>

          <div class="p-d-flex p-mt-1 p-jc-between p-ai-center">
            <div class="p-col">
              <!-- <div class="p-d-flex">
                <small class="p-mx-5">start the network</small>
              </div> -->
              <div class="p-d-flex">
                <div class="p-field-checkbox p-mx-5">
                  <Checkbox id="quick" v-model="quick" :binary="true" />
                  <label for="quick">start network</label>
                </div>
              </div>
            </div>
            <div class="p-col">
              <div class="p-d-flex">
                <small class="p-mx-5">create default channel</small>
              </div>
              <div class="p-d-flex">
                <div class="p-field-checkbox p-mx-5">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <Checkbox
                        id="binary"
                        v-model="channel"
                        :binary="true"
                        :disabled="!quick"
                      />
                    </span>

                    <InputText
                      v-model="channelName"
                      placeholder="channel name"
                      :disabled="!quick"
                      class="p-inputtext-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-grid p-mt-3">
            <Button
              class="p-button-danger p-button-outlined p-m-2 p-my-2"
              label="close"
              @click="closeDialogue()"
            />

            <Button
              class="p-button-primary  p-ml-auto p-my-2"
              label="create"
              @click="showConfirm()"
            />
          </div>
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
  warnCA: boolean = false;
  object = SpecConfig;
  preview: any = {};
  projectDir: string = "";
  projectName: string = "";
  defaultOrg: string = "";
  channelName: string = "mychannel";

  newOrgTolist(name: string, isOrderer: boolean) {
    this.object.newOrg(name, isOrderer);
  }
  removeOrgFromList(target: any) {
    this.object.removeOrg(target);
  }

  createNetwork() {
    this.object.setUpFileStructure(this.projectDir);
    let project = {
      name: this.projectName,
      date_create: +new Date(),
      directory: this.projectDir,
    };
    let id = ProjectConfig.addProject(project);

    if (this.quick) {
      let defaultOrg = NetworkConfig.createConfig(project, this.channel,this.channelName);
      let command:string[] = [];
      if (this.channel) {
        command.push("netup,create,join,channelquery", "-c", this.channelName);
      } else {
        command.push("netup");
      }
      command.push("-o", defaultOrg, "-c", "true");
      this.$router.push({
        name: "SplashConsole",
        params: {
          command: command.join('#'),
          directory: this.projectDir,
          id: id,
        },
      });
    } else {
      NetworkConfig.createConfig(project);
    }
    this.display = false;
  }
  closeDialogue() {
    this.object.resetData();
    this.display = false;
  }

  showConfirm() {
    this.object.createFile();
    this.displayConfirm = true;
  }

  closeConfirm() {
    this.displayConfirm = false;
  }

  caWarn() {
    if (!this.warnCA)
      this.$confirm.require({
        message:
          "If you disable CA you won't be able to create or export custom certificate for user ",
        header: "Disabling CA",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-primary",
        acceptLabel: "Ok",
        rejectLabel: "⠀",
      });
    this.warnCA = true;
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

.preview-org {
  font-weight: bold;
  color: $primaryColor;
}
// //
.preview {
  text-align: left;
  overflow: auto;
}
// .preview-content {
//   // overflow: auto;
// }
.create-net-wrapper {
  padding: 20px;
}

.preview-wrapper {
  width: auto;
}
</style>
