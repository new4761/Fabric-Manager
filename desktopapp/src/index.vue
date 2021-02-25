<template>
  <div>
    <div class="p-d-flex p-my-1">
      <div class="p-col-8 status">
        <div class="p-d-flex">
          <div class="p-col-5 status-container" :class="statusClass">
            <div class="p-d-flex  p-jc-center">
              <Knob
                v-model="activeContainer"
                :size="110"
                :min="0"
                :max="this.$store.getters['docker/getContainerCount']"
                :readonly="true"
                :valueColor="'#fff'"
                :strokeWidth="15"
                :textColor="'#fff'"
                :valueTemplate="
                  activeContainer +
                    '/' +
                    this.$store.getters['docker/getContainerCount']
                "
              />
            </div>
            <div class="p-d-flex  p-jc-center">Active containers</div>
          </div>
          <div class="p-col-auto status-detail">
            <div class="p-col  p-as-center">
              <div class="p-d-flex status-text">
                net stat
                <a>
                  {{
                    (activeContainer /
                      this.$store.getters["docker/getContainerCount"]) *
                      100
                  }}
                  %
                </a>
              </div>
              <div class="p-d-flex status-text">
                fabric version <a>{{ env.version }}</a>
              </div>
              <div class="p-d-flex status-text">
                expose port <a>{{ env.port }}</a>
              </div>
              <div
                class="p-d-flex status-text p-text-nowrap p-text-truncate"
                style="width: 12rem"
              >
                current org <a>{{ env.org }}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="p-col-4">
        <a class="btn teal p-ripple" v-ripple
          >Explorer
          <img src="./assets/explorer.svg" class="btn-icon btn-icon--vis" />
        </a>

        <a class="btn light-blue p-ripple" v-ripple
          >Portainer
          <img src="./assets/portainer.svg" class="btn-icon btn-icon--vis"
        /></a>
      </div>
    </div>
    <div v-if="statusClass == 'offline'" class="container">
      network is currently offline
    </div>
    <ContainerTable v-bind:container="container" v-else />

    <LogView />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerTable from "./components/ContainerTable.vue";
import LogView from "./components/LogView.vue";
import DockerProcess from "./module/DockerProcess";
const fs = require("fs");
// const dotenv = require("dotenv");
const path = require("path");

@Component({
  components: {
    ContainerTable,
    LogView,
  },
})
export default class Index extends Vue {
  envConfig: any;
  container: Array<Object> = [];
  activeContainer: number = 0;
  statusClass: string = "";
  split: any;
  env = {
    version: "",
    port: "",
    org: "",
  };

  // env index
  // 0: "#!/bin/bash↵"
  // 1: " XX_CHANNEL_NAME='undefined'↵"
  // 2: " XX_CC_LANGUAGE='go'↵"
  // 3: " XX_IMAGETAG='2.3.0'↵"
  // 4: " XX_BLOCK_NUMBER='newest'↵"
  // 5: " XX_CC_VERSION='1.0'↵"
  // 6: " XX_CC_NAME='simple'↵"
  // 7: " XX_DB_TYPE='golevel'↵"
  // 8: " XX_CC_PARAMETERS='ImluaXQiLCJhIiwiMjAwIiwiYiIsIjMwMCIK'↵"
  // 9: " XX_EXPOSE_ENDPOINTS='8000'↵"
  // 10: " XX_CURRENT_ORG='org1.example.com'↵"
  // 11: " XX_TRANSIENT_DATA='Cg=='↵"
  // 12: " XX_CC_PRIVATE='false'↵"
  // 13: " XX_CC_POLICY='Cg=='↵"
  // 14: " XX_CC_INIT_REQUIRED='true'↵"
  // 15: " XX_RUN_OUTPUT='minifab'↵"

  created() {
    this.$store.commit("docker/setContainer");
    this.$store.commit("docker/setOrgContainer");
    this.container = this.$store.state.docker.activeContainer;
    this.envConfig = fs.readFileSync(
      path.join(this.$store.state.project.path + "/vars/envsettings"),
      "utf8"
    );
    this.split = this.envConfig.split("declare");
    this.getEnv();
  }
  mounted() {
    this.$store.commit("docker/setActiveContainer");
    this.activeContainer = this.$store.getters[
      "docker/getActiveContainerCount"
    ];
    if (this.activeContainer == 0) {
      this.statusClass = "offline";
    } else if (
      this.activeContainer < this.$store.getters["docker/getContainerCount"]
    ) {
      this.statusClass = "partial";
    } else if (
      this.activeContainer == this.$store.getters["docker/getContainerCount"]
    ) {
      this.statusClass = "online";
    }
  }

  getEnv() {
    this.env.version = this.split[3].match(/'((?:\\.|[^'\\])*)'/)[1];
    this.env.port = this.split[9].match(/'((?:\\.|[^'\\])*)'/)[1];
    this.env.org = this.split[10].match(/'((?:\\.|[^'\\])*)'/)[1];
  }

  getContainer() {
    DockerProcess.listContainer()
      .then((result: any) => {
        this.container = result;
      })
      .catch(() => {
        // console.log(err);
        this.container = [];
      });
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
:root {
  --blue-color: #5296f9;
}

.divider-grad-mask {
  width: 100%;
  height: 1rem;
  background: linear-gradient(
      90deg,
      var(--blue-color) 0 50%,
      transparent 0 100%
    )
    0 0 / 2rem 1rem;
  mask: linear-gradient(-90deg, black, transparent);
}

.status-text {
  margin: 5px;
  font-weight: bold;
  font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
    Tahoma, sans-serif;
}
.status-text a {
  margin-left: 5px;
  font-weight: normal;
}

.online {
  background-color: rgb(49, 155, 255);
}
.offline {
  background-color: rgb(255, 94, 94);
}
.partial {
  background-color: rgb(255, 207, 75);
}

.status-container {
  color: #fff;
  border-radius: 10px 0px 0px 10px;
  font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
    Tahoma, sans-serif;
}

.status-detail {
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 1em;
  border-radius: 0px 10px 10px 0px;
}

/* button base */
.btn {
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 8px 30px;
  border-radius: 10px;
  line-height: normal;
  font-size: 18px;
  color: #fff;
  background: #0099ff;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn:hover {
  line-height: normal;
}
.btn-icon {
  will-change: width, transform;
  width: 0;
  height: 50px;
  padding: 2px;
  border-radius: 50%;
  fill: #fff;
  background: rgb(255, 255, 255);
  margin-left: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn-icon--vis {
  width: 50px;
  transform: scale(1);
  margin-left: 8.333333333333334px;
}
.btn:hover .btn-icon {
  width: 50px;
  transform: scale(1);
  margin-left: 8.333333333333334px;
}

.light-blue {
  background: rgb(87, 209, 250);
}
.light-blue:hover {
  background: darken(rgb(87, 209, 250), 10%);
}

.teal {
  background: teal;
}
.teal:hover {
  background: darken(teal, 10%);
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
