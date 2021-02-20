<template>
  <div>
    <div class="title-bar">
      <div class="title">
        Current Path : {{ $route.name }} Project ID:
        {{ this.$store.state.project.id }}
      </div>

      <div class="title-btn">
        <div class="minimize" @click="minimizeWindow()"></div>
        <div class="maximize" @click="maximizeWindow()"></div>
        <div class="close" @click="closeWindow()"></div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="layout">
      
           <div v-if="$root.loading">
             loading bitch
           </div>
          <router-view v-else/>
       
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

@Component({
  components: { NetOpsButton, AppProfile, AppMenu },
})
export default class App extends Vue {
  mounted() {}

  get layout() {
    return this.$route.meta.layout || "default-layout";
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

 
}
</script>

<style></style>
