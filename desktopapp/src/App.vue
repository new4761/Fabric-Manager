<template>
  <div>
    <Toast position="top-right" />

    <div class="title-bar">
      <div class="title-content">
        <div class="title">
          {{ this.$store.state.project.id }}
        </div>

        <div class="title-btn">
          <div class="minimize" @click="minimizeWindow()"></div>
          <div class="maximize" @click="maximizeWindow()"></div>
          <div class="close" @click="closeWindow()"></div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <div v-if="$root.loading">
          loading...
        </div>
        <router-view v-else />
      </component>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NetOpsButton from "./components/NetOpsButton.vue";
import AppProfile from "./components/menu/AppProfile.vue";
import AppMenu from "./components/menu/AppMenu.vue";
const remote = require("electron").remote;

/* eslint-disable no-unused-vars */
@Component({
  components: { NetOpsButton, AppProfile, AppMenu },
})
export default class App extends Vue {
  // @ts-ignore
  unwatch: Function;
  get layout() {
    return this.$route.meta.layout || "default-layout";
  }

  created() {
    this.unwatch = this.$store.watch(
      (state) => {
        return this.$store.state.result; // could also put a Getter here
      },
      (newValue, oldValue) => {
        //something changed do something
        this.showToast(newValue.status, newValue.message);
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
  }

  beforeDestroy() {
    this.unwatch();
  }

  maximizeWindow() {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  minimizeWindow() {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  closeWindow() {
    const window = remote.getCurrentWindow();
    window.close();
  }

  showToast(status: boolean, message: string) {
    message = message.split(".").join("");
    // console.log(message.replace(/./g, ""));
    var severity;
    var summary;
    if (status) {
      severity = "success";
      summary = "Operation Success";
    } else {
      severity = "error";
      summary = "Operation fail";
    }
    this.$toast.add({
      severity: severity,
      summary: summary,
      detail: message,
      life: 10000,
    });
  }

}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
