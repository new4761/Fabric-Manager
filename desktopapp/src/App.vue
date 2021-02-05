<template>
  <div>
    <div class="title-bar">
      <div class="title">Current Path : {{ $route.path }}</div>
      
      <div class="title-btn">
        <div class="minimize" @click="minimizeWindow()"></div>
        <div class="maximize" @click="maximizeWindow()"></div>
        <div class="close" @click="closeWindow()"></div>
      </div>
    </div>

    <div class="p-d-flex">
      <transition name="layout-sidebar">
        <div class="layout-sidebar-dark  p-d-flex p-flex-column menu">
          <Card class="p-mx-2 p-my-1">
            <template #title>
              network stuff
            </template>
          </Card>

          <AppProfile />

          <AppMenu :model="menu" class="scroll-menu" />
        </div>
      </transition>

      <div class="scroll-main layout-main p-col p-as-stretch">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
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
        //  items: [
            //{ label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
            //{
              //label: "Calendar",
              //icon: "pi pi-fw pi-calendar-plus",
              //to: "/calendar",
            //},
            //{
              //label: "Empty Page",
              //icon: "pi pi-fw pi-circle-off",
              //to: "/empty",
       //     },
          //]
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
.bg {
  height: 100vh;
}
.menu {
  height: 100vh;
}
.page {
  background-color: #f3f2f2;
  height: 100vh;
}

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
}

.title-bar {
  -webkit-app-region: drag;
  height: 5vh;
  padding: 0px;
  margin: 0px;
  background-color: rgb(0, 75, 173);
}

.title {
  color: rgb(255, 255, 255);
  position: fixed;
  top: 0px;
  left: 30px;
  line-height: 32px;
  font-size: 20px;
}

.title-btn {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 1px;
  right: 0px;
}

.title-btn div {
  position: relative;
  float: left;
  width: 30px;
  height: 30px;
  transition: all 0.3s;
}

.title-btn div:before,
.title-btn div:after {
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  content: " ";
  position: absolute;
  border-color: #ffffff;
  border-style: solid;
  border-width: 0 0 2px 0;
}

.title-btn .minimize:before {
  border-bottom-width: 2px;
}

.title-btn .maximize:before {
  border-width: 1px 1px 2px 1px;
}

.title-btn .close:before,
.title-btn .close:after {
  bottom: 50%;
  top: 50%;
}

.title-btn .close:before {
  transform: rotate(45deg);
}

.title-btn .close:after {
  transform: rotate(-45deg);
}

.title-btn div:hover {
  background-color: #ffffff;
}

.title-btn .close:hover {
  background-color: #e04343;
}

.title-btn div:hover:after,
.title-btn div:hover:before {
  border-color: #333333;
}

.title-btn .close:hover:after,
.title-btn .close:hover:before {
  border-color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
