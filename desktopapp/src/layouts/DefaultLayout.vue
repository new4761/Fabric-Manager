<template>
  <div>
    <div class="p-d-flex">
      <transition name="layout-sidebar">
        <div class="layout-sidebar-dark  p-d-flex p-flex-column menu">
          <div class="p-d-row p-jc-center p-mt-3">
            <div class="p-col-12"></div>
          </div>

          <div class="p-d-flex p-jc-center p-mt-3">
            <net-ops-button />
          </div>
          <div class="p-d-row p-jc-center ">
            <AppProfile />
          </div>

          <AppMenu :model="menu" class="scroll-menu" />

          <!-- <div class="p-col-8 status">
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
          </div> -->

          <div class="p-d-row p-mt-auto">
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
            <div class="status-container p-text-center" :class="statusClass">
              {{ statusClass }}
            </div>
          </div>
        </div>
      </transition>

      <div class="scroll-main layout-main p-col p-as-stretch">
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
    this.envConfig = fs.readFileSync(
      path.join(this.$store.state.project.path + "/vars/envsettings"),
      "utf8"
    );
    this.split = this.envConfig.split("declare");
    this.getEnv();
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
        { label: "Home", icon: "pi pi-fw pi-home", to: "/home" },

        {
          label: "Organization",
          icon: "pi pi-fw pi-sitemap",
          to: "/org",
        },
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
        //   label: "ExportApplication",
        //   icon: "pi pi-fw pi-clone",
        //   to: "/exportapplication",
        // }
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
  font-weight: bold;
  font-size: 20px;
}

.status-text {
  margin: 5px;
  font-size: 15px;
  color: $textSecondaryColor;
}
.status-text a {
  margin-left: 5px;
  font-weight: normal;
  color: $textprimaryColor;
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
