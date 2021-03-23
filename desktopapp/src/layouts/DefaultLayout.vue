<template>
  <div>
    <div class="p-d-flex">
      <transition name="layout-sidebar">
        <div class="layout-sidebar-dark  p-d-flex p-flex-column menu">
          <div class="p-d-row p-jc-center p-mt-3">
            <div class="p-col-12"></div>
          </div>

          <div class="p-d-flex p-jc-center p-mt-3  p-mb-5">
            <net-ops-button />
          </div>

          <AppMenu :model="menu" class="scroll-menu" />

          <div class="p-d-row p-mt-auto">
            <div v-if="!firstTime">
              <div class="p-d-flex status-text">
                active container
                <a
                  >{{
                    activeContainer +
                      "/" +
                      this.$store.getters["docker/getContainerCount"]
                  }}
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
            <div class="status-container p-text-center" :class="statusClass">
              {{ statusClass }}
            </div>
          </div>
        </div>
      </transition>

      <div class="scroll-main layout-main">
        <div class=" p-d-flex p-jc-center">
          <div class="layout-wrapper">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetOpsButton from "../components/NetOpsButton.vue";
import AppProfile from "../components/menu/AppProfile.vue";
import AppMenu from "../components/menu/AppMenu.vue";
const fs = require("fs");
// const dotenv = require("dotenv");
const path = require("path");

/* eslint-disable no-unused-vars */

@Component({
  components: { NetOpsButton, AppProfile, AppMenu },
})
export default class DefaultLayout extends Vue {
  firstTime: boolean = false;
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
  // @ts-ignore
  unwatch: Function;

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
    this.$store.commit("docker/setOrgContainer");
    this.$store.commit("docker/setActiveContainer");
    this.container = this.$store.state.docker.activeContainer;

    this.unwatch = this.$store.watch(
      (state) => {
        return this.$store.state.docker.activeContainer; // could also put a Getter here
      },
      (newValue, oldValue) => {
        //something changed do something
        this.container = newValue;

        this.activeContainer = this.$store.getters[
          "docker/getActiveContainerCount"
        ];
        this.checkStatus();
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
  }

  mounted() {
    try {
      this.envConfig = fs.readFileSync(
        path.join(this.$store.state.project.path + "/vars/envsettings"),
        "utf8"
      );
      this.split = this.envConfig.split("declare");
      this.getEnv();
    } catch (error) {
      this.firstTime = true;
    }

    this.checkStatus();
  }

  checkStatus() {
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

  beforeDestroy() {
    this.unwatch();
  }

  data() {
    return {
      menu: [
        { label: "Project", icon: "pi pi-list", to: "/" },
        { label: "Network", icon: "pi pi-fw pi-sitemap", to: "/home" },
        {
          label: "Channel",
          icon: "pi pi-fw pi-globe",
          to: "/channel",
        },
        {
          label: "ChainCode",
          icon: "pi pi-fw pi-clone",
          to: "/chaincode/console",
        }
        ,{
          label: "IdentityManger",
          icon: "pi pi-fw pi-clone",
          to: "/identityManger",
        },
      ],
    };
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.status-container {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.status-text {
  color: $textSecondaryColor;
  font-size: 15px;
  margin: 5px;
}
.status-text a {
  color: $textprimaryColor;
  font-weight: normal;
  margin-left: 5px;
}
.status-detail {
  width: 100%;
}
.online {
  background-color: $primaryColor;
}
.offline {
  background-color: $dangerBgColor;
}
.partial {
  background-color: $warningBgColor;
}
</style>
