<template>
  <div>
    <div id="title-bar">
      <div id="title">test title</div>

      <div id="title-bar-btns">
        <Button label="-" @click="minimizeWindow()" id="min-btn" />
        <Button label="+" @click="maximizeWindow()" id="max-btn" />
        <Button label="x" @click="closeWindow()" id="close-btn" />
      </div>
    </div>

    <div class="p-d-flex">
      <transition name="layout-sidebar" mode="out-in">
        <div class="layout-sidebar-dark  p-d-flex p-flex-column menu">
          <AppProfile />
          <Card class="p-mx-2 p-mb-5">
            <template #title>
              network stuff
            </template>
          </Card>
          <div class="scroll-menu">
            <AppMenu :model="menu" />
          </div>
        </div>
      </transition>

      <div class="scroll-main layout-main p-col p-as-stretch">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DemoNetupButton from "./components/DemoNetupButton.vue";
import AppProfile from "./components/menu/AppProfile.vue";
import AppMenu from "./components/menu/AppMenu.vue";
const remote = require("electron").remote;

@Component({
  components: { DemoNetupButton, AppProfile, AppMenu },
})
export default class App extends Vue {
  // path: any = this.$router.currentRoute.name;

  maximizeWindow() {
    console.log("max");
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  minimizeWindow() {
    console.log("hide");
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  closeWindow() {
    console.log("close");
    const window = remote.getCurrentWindow();
    window.close();
  }

  data() {
    return {
      menu: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        { label: "Demo", icon: "pi pi-fw pi-pencil", to: "/demo" },
        {
          label: "Organization",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Form Layout",
              icon: "pi pi-fw pi-id-card",
              to: "/formlayout",
            },
            { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
            {
              label: "Float Label",
              icon: "pi pi-fw pi-bookmark",
              to: "/floatlabel",
            },
            { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
            { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
            { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
            { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
            { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
            { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
            { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
            { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
            { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
            { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
            { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
          ],
        },
        {
          label: "Channel",
          icon: "pi pi-fw pi-globe",
          items: [
            { label: "Display", icon: "pi pi-fw pi-desktop", to: "/display" },
            {
              label: "Elevation",
              icon: "pi pi-fw pi-external-link",
              to: "/elevation",
            },
            {
              label: "Flexbox",
              icon: "pi pi-fw pi-directions",
              to: "/flexbox",
            },
            { label: "Icons", icon: "pi pi-fw pi-search", to: "/icons" },
            { label: "Grid System", icon: "pi pi-fw pi-th-large", to: "/grid" },
            {
              label: "Spacing",
              icon: "pi pi-fw pi-arrow-right",
              to: "/spacing",
            },
            {
              label: "Typography",
              icon: "pi pi-fw pi-align-center",
              to: "/typography",
            },
            { label: "Text", icon: "pi pi-fw pi-pencil", to: "/text" },
          ],
        },
        {
          label: "ChainCode",
          icon: "pi pi-fw pi-clone",
          items: [
            { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
            {
              label: "Calendar",
              icon: "pi pi-fw pi-calendar-plus",
              to: "/calendar",
            },
            {
              label: "Empty Page",
              icon: "pi pi-fw pi-circle-off",
              to: "/empty",
            },
          ],
        },
        {
          label: "Menu Hierarchy",
          icon: "pi pi-fw pi-search",
          items: [
            {
              label: "Submenu 1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Submenu 1.1",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
                {
                  label: "Submenu 1.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
              ],
            },
            {
              label: "Submenu 2",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Submenu 2.1",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
                {
                  label: "Submenu 2.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                    { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
</script>

<style>
.scroll-main {
  overflow: scroll;
  width: 100%;
  height: 95vh;
}

.scroll-main::-webkit-scrollbar {
  width: 20px;
}
.scroll-main::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}
.scroll-main::-webkit-scrollbar-thumb {
  background-color: rgb(0, 140, 255);
  border-radius: 10px;
  border: 4px solid rgba(250, 206, 206, 0);
  background-clip: content-box;
  min-width: 32px;
  min-height: 32px;
  transition: color 0.5s;
}

.scroll-main::-webkit-scrollbar-thumb:hover {
  background-color: rgb(0, 74, 134);
  transition: color 0.5s;
}
.scroll-main::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

.menu {
  height: 95vh;
}
.scroll-menu {
  overflow: scroll;
}

.scroll-menu::-webkit-scrollbar {
  width: 15px;
}
.scroll-menu::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}
.scroll-menu::-webkit-scrollbar-thumb {
  background-color: rgb(216, 216, 216);
  border-radius: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: content-box;
  min-width: 32px;
  min-height: 32px;
  transition: 0.3s;
}

.scroll-menu::-webkit-scrollbar-thumb:hover {
  background-color: rgb(94, 94, 94);
}

#title-bar {
  -webkit-app-region: drag;
  height: 5vh;
  padding: 0px;
  margin: 0px;
  background-color: rgb(0, 0, 0);
}

#title {
  color: rgb(255, 255, 255);
  position: fixed;
  top: 0px;
  left: 12px;
  line-height: 32px;
  font-size: 14px;
}

#title-bar-btns {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 1px;
  right: 0px;
}

#title-bar-btns button {
  height: 32px;
  width: 32px;
  background-color: transparent;
  border: none;
  color: #f1f1f1;
  font-size: 16px;
}

#title-bar-btns button:hover {
  background-color: #3f3f41;
}
</style>
