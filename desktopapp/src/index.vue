<template>
  <div>
    <div class="container-header">
      <div class="p-col">
        <div class="p-d-flex p-jc-end p-ai-center">
          <div class="p-col-6">
            <div class="container-title p-text-left">Network</div>
          </div>
          <div class="p-col-3 container-text">
            <div class="p-grid">
              <div class="p-col p-text-right">
                <a class="p-mx-1">
                  {{ Object.values(org).length }}
                </a>
                organization
              </div>
            </div>
          </div>
          <div class="p-col-3 container-text">
            <div class="p-grid">
              <div class="p-col p-text-center">
                <small>
                  <a>
                    {{ this.$store.getters["docker/getActiveContainerCount"] }}
                  </a>
                  /
                  {{ this.$store.getters["docker/getContainerCount"] }}
                  container
                </small>
              </div>
            </div>
            <div class="p-grid p-jc-center">
              <div class="p-md-8 p-lg-5">
                <ProgressBar
                  :value="
                    (this.$store.getters['docker/getActiveContainerCount'] /
                      this.$store.getters['docker/getContainerCount']) *
                      100
                  "
                >
                  Percent Complete:
                  {{ this.$store.getters["docker/getActiveContainerCount"] }}%
                </ProgressBar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-content">
      <ContainerTable v-bind:container="container" v-bind:org="org" :key="componentKey" />
    </div>

    <div class="container-footer">
      <div class="p-grid p-jc-end p-mr-5">
        <div class="p-md-4 p-lg-2">
          <div class="p-d-flex">
            Export
          </div>
          <div class="p-d-flex  p-mt-1 p-fluid">
            <Button
              icon="fas fa-id-card"
              label="connection profile"
              class="p-button-outlined p-button-primary p-button-sm"
              @click="exportAppDisplay = true"
            />
          </div>

          <div class="p-d-flex p-mt-1 p-fluid">
            <ExportConfig />
          </div>

          <div class="p-d-flex p-mt-1  p-fluid">
            <Button
              icon="fab fa-docker"
              label="docker container"
              class="p-button-outlined p-button-primary p-button-sm"
              disabled
            />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="p-grid p-mt-2 p-mr-1">
       <div class="p-col p-text-right">
      <Button
        label="ExportConnectionProfile"
        class="p-button-outlined p-button-primary p-button-sm"
        @click="exportAppDisplay = true"
      />
       </div>
    </div> -->

    <Dialog
      modal
      :dismissableMask="true"
      :closable="false"
      v-bind:visible="exportAppDisplay"
      :style="{ width: '300px', padding: '0px' }"
      :contentStyle="{ overflow: 'visible' }"
    >
      <template #header>
        <span>ExportConnectionProfile</span>
      </template>
      <ExportConnectionProfile @closeExportCon="closeExportCon" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerTable from "./components/container/ContainerTable.vue";
import LogView from "./components/container/LogView.vue";
import ExplorerButton from "./components/container/ExplorerButton.vue";
import NetworkConfig from "./models/NetworkConfig";
import ExportConnectionProfile from "@/components/export/ExportProfile.vue";
import ExportConfig from "./components/export/ExportConfig.vue";
/* eslint-disable no-unused-vars */
@Component({
  components: {
    ContainerTable,
    LogView,
    ExplorerButton,
    ExportConnectionProfile,
    ExportConfig,
  },
})
export default class Index extends Vue {
  envConfig: any;
  exportAppDisplay = false;
  container: Array<Object> = [];
  activeContainer: number = 0;
  statusClass: string = "";
  expandedRows: any = [];
  // @ts-ignore
  unwatch: Function;
  componentKey: number = 0;

  org: {
    [key: string]: {
      name: string;
      fullname: string;
      child: Set<string>;
      container: object[];
      ca: boolean;
      peer: number;
      orderer: boolean;
    };
  } = {};
  closeExportCon() {
    this.exportAppDisplay = false;
  }
  created() {
    this.container = this.$store.state.docker.activeContainer;
    this.org = NetworkConfig.getOrgData();
    this.filter();

    this.unwatch = this.$store.watch(
      (state) => {
        return this.$store.state.docker.activeContainer; // could also put a Getter here
      },
      (newValue, oldValue) => {
        //something changed do something
        // console.log("component update old " + oldValue);
        // console.log("component update new" + newValue);
        this.container = newValue;

        this.activeContainer = this.$store.getters["docker/getActiveContainerCount"];
        // console.log(this.container);
        if (this.activeContainer == 0) {
          this.statusClass = "offline";
        } else {
          this.statusClass = "online";
        }
        this.org = NetworkConfig.getOrgData();
        this.filter();
        this.componentKey += 1;
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
    console.log(this.container);
  }

  set() {
    console.log(this.$store.state.result);
  }

  beforeDestroy() {
    // this.unsubscribe();
    this.unwatch();
  }

  mounted() {
    this.$store.commit("docker/setOrgContainer");
    this.$store.commit("docker/setActiveContainer");
    this.container = this.$store.state.docker.activeContainer;
    this.org = NetworkConfig.getOrgData();
    this.filter();
  }

  filter() {
    this.container.forEach((element: any) => {
      element.Names[0] = element.Names[0].replace(/\//g, "");
      let name = element.Names[0].replace(/^[^.]*./gm, "");
      this.org[name].container.push(element);
    });
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.p-progressbar {
  background-color: rgba(255, 255, 255, 0.219);
  height: 10px;
}
.p-progressbar-value {
  background-color: $primaryColor !important ;
  color: white;
}
.container-header {
  padding: 10px 0px 0px 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: white;
  height: 110px;
  font-size: 15px;
}
.container-title {
  font-size: 25px;
  font-weight: bold;
}

.container-text {
  font-size: 18px;
  font-weight: bold;
}
.container-content {
}

.container-footer {
  padding: 15px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
}
.container {
  border-style: solid;
  background-color: rgb(219, 219, 219);
  border-radius: 5px;
  color: rgb(114, 114, 114);
  font-size: 30px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
